import { Multistep } from "../../components/Multistep";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { ButtonNextStep } from "../../components/ButtonNextStep";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "../../utils/get-week-days";

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  async function handleSetTimeIntervals() {}

  return (
    <div className="max-w-[572px] mx-auto mt-4 py-10">
      <header>
        <div className="mb-12">
          <h1 className="font-bold text-white text-2xl">Quase lá!</h1>
          <span className="text-gray-200 text-base">
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </span>
        </div>

        <Multistep step={4} active={3} />
      </header>

      <form
        onSubmit={handleSubmit(handleSetTimeIntervals)}
        className="mt-6 p-6 flex flex-col bg-gray-800 rounded-md border border-gray-600"
      >
        <div className="border border-gray-600 rounded-md mb-4 ">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between py-3 px-4 border-top border-gray-600"
            >
              <div className="flex items-center gap-3">
                <Checkbox.Root
                  id={field.id}
                  className="flex items-center justify-center w-6 h-6 rounded bg-gray-900 aria-checked:bg-green-600"
                >
                  <Checkbox.Indicator>
                    <Check className="text-white" weight="fill" size={20} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor={field.id} className="text-gray-100">
                  {weekDays[field.weekDay]}
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="bg-gray-900 py-2 px-3 text-white"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />
                <input
                  className="bg-gray-900 py-2 px-3 text-white"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </div>
            </div>
          ))}
        </div>

        <ButtonNextStep />
      </form>
    </div>
  );
}
