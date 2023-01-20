import { Calendar } from "../../../components/Calendar";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

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

export function CalendarStep() {
  const isDateSelected = false;

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
      <Calendar />

      {isDateSelected && (
        <div className="border-l border-l-gray-600 pt-6 px-6 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]">
          <header className="flex items-center gap-2 font-medium">
            <h4>Segunda-feira</h4>
            <span className="text-gray-200">20 de asd</span>
          </header>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <TimePickerItem disabled>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
          </div>
        </div>
      )}
    </div>
  );
}
