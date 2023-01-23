import { Calendar } from "../../../components/Calendar";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import dayjs from "dayjs";
import { api } from "../../../lib/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

interface TimePickerItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function TimePickerItem({ children, ...rest }: TimePickerItemProps) {
  return (
    <button
      className="bg-gray-600 py-2 cursor-pointer border border-transparent text-gray-100 rounded-sm text-sm last:mb-6 disabled:bg-none disabled:cursor-default disabled:opacity-40 enabled:hover:bg-gray-500 enabled:focus:border focus:border-gray-100"
      {...rest}
    >
      {children}
    </button>
  );
}

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  const isDateSelected = !!selectedDate;
  const username = String(router.query.username);

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describedDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;

  const { data: availability } = useQuery<Availability>(
    ["availability", selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      });

      return response.data;
    },
    {
      enabled: !!selectedDate,
    }
  );

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set("hour", hour)
      .startOf("hour")
      .toDate();

    onSelectDateTime(dateWithTime);
  }

  return (
    <div
      className={clsx(
        "my-6 mx-auto grid max-w-full relative bg-gray-800 text-gray-100",
        {
          ["grid-cols-[1fr,_280px]"]: isDateSelected,
          ["w-[580px] grid-cols-1"]: !isDateSelected,
        }
      )}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <div className="border-l border-l-gray-600 pt-6 px-6 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]">
          <header className="flex items-center gap-2 font-medium">
            <h4>{weekDay}</h4>
            <span className="text-gray-200">{describedDate}</span>
          </header>

          <div className="mt-3 grid grid-cols-1 gap-2">
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability?.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, "0")}:00h
                </TimePickerItem>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
