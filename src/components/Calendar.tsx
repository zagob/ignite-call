import { CaretLeft, CaretRight } from "phosphor-react";
import { ButtonHTMLAttributes, useMemo, useState } from "react";
import { getWeekDays } from "../utils/get-week-days";
import dayjs from "dayjs";

interface DayCalendarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  day: string;
}

function DayCalendar({ day, ...rest }: DayCalendarProps) {
  return (
    <td className="box-border">
      <button
        className="w-full aspect-square enabled:bg-gray-600 text-center cursor-pointer rounded-md focus:border-2 focus:border-gray-1 disabled:bg-none disabled:cursor-default disabled:opacity-40 enabled:hover:bg-gray-500"
        {...rest}
      >
        {day}
      </button>
    </td>
  );
}

interface CalendarWeek {
  week: number;
  days: {
    date: dayjs.Dayjs;
    disabled: boolean;
  }[];
}

type CalendarWeeks = CalendarWeek[];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month");

    setCurrentDate(previousMonthDate);
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");

    setCurrentDate(nextMonthDate);
  }

  const shortWeekDays = getWeekDays({ short: true });

  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set("date", index + 1);
    });

    const firstWeekDay = currentDate.get("day");

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, "day");
      })
      .reverse();

    const lastDayInCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth()
    );

    const lastWeekDay = lastDayInCurrentMonth.get("day");

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, "day");
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({ date, disabled: true })),
      ...daysInMonthArray.map((date) => ({ date, disabled: false })),
      ...nextMonthFillArray.map((date) => ({ date, disabled: true })),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        return [];
      },
      []
    );

    return calendarDays;
  }, [currentDate]);

  console.log(calendarWeeks);
  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h4 className="font-medium capitalize">
          {currentMonth} <span className="text-gray-200">{currentYear}</span>
        </h4>

        <div className="flex items-center gap-2 text-gray-200">
          <button
            onClick={handlePreviousMonth}
            title="Previous month"
            className="cursor-pointer rounded-sm hover:text-gray-100 border border-transparent focus:border focus:border-gray-600"
          >
            <CaretLeft width={20} height={20} />
          </button>
          <button
            onClick={handleNextMonth}
            title="Next month"
            className="cursor-pointer rounded-sm hover:text-gray-100 border border-transparent focus:border focus:border-gray-600"
          >
            <CaretRight width={20} height={20} />
          </button>
        </div>
      </header>

      <table className="w-full border-spacing-1 table-fixed">
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay} className="text-gray-100 font-medium text-sm">
                {weekDay}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:content-['.'] before:leading-3 before:block before:text-gray-800">
          <tr>
            <DayCalendar day="1" disabled />
            <DayCalendar day="2" />
            <DayCalendar day="3" />
            <DayCalendar day="4" />
            <DayCalendar day="5" />
            <DayCalendar day="6" />
            <DayCalendar day="7" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
