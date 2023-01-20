import { Multistep } from "../../components/register/Multistep";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { ButtonNextStep } from "../../components/ButtonNextStep";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "../../utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertTimeStringToMinutes } from "../../utils/convertTimeStringToMinutes";
import { api } from "../../lib/axios";
import { HeaderRegister } from "../../components/register/HeaderRegister";
import { Container } from "../../components/register/Container";
import { useRouter } from "next/router";

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Você precisa selecionar pelo menos um dia da semana!",
    })
    .transform((intervals) => {
      return intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
      }));
    })
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
        ),
      {
        message:
          "O horário de término deve ser pelo menos 1h distante do inicio.",
      }
    ),
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
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

  const router = useRouter();

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const intervals = watch("intervals");

  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput;

    await api.post("/users/time-intervals", {
      intervals,
    });

    await router.push("/register/update-profile");
  }

  return (
    <Container>
      <HeaderRegister
        title="Quase lá!"
        subtitle=" Defina o intervalo de horários que você está disponível em cada dia
            da semana."
      >
        <Multistep step={4} active={3} />
      </HeaderRegister>

      <form
        onSubmit={handleSubmit(handleSetTimeIntervals)}
        className="mt-6 p-6 flex flex-col bg-gray-800 rounded-md border border-gray-600"
      >
        <div className="border border-gray-600 rounded-md mb-4 ">
          {fields.map((fieldState, index) => (
            <div
              key={fieldState.id}
              className="flex items-center justify-between py-3 px-4 border-top border-gray-600"
            >
              <div className="flex items-center gap-3">
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <Checkbox.Root
                          id={`checkbox-${fieldState.weekDay}`}
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true);
                          }}
                          checked={field.value}
                          className="flex items-center justify-center w-6 h-6 rounded bg-gray-900 aria-checked:bg-green-600"
                        >
                          <Checkbox.Indicator>
                            <Check
                              className="text-white"
                              weight="fill"
                              size={20}
                            />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          htmlFor={`checkbox-${fieldState.weekDay}`}
                          className="text-gray-100 cursor-pointer"
                        >
                          {weekDays[fieldState.weekDay]}
                        </label>
                      </>
                    );
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="bg-gray-900 py-2 px-3 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />
                <input
                  className="bg-gray-900 py-2 px-3 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </div>
            </div>
          ))}
        </div>

        {errors.intervals && (
          <span className="text-[#f75a68] mb-4 text-sm">
            {errors.intervals.message}
          </span>
        )}

        <ButtonNextStep title="Próximo Passo" disabled={isSubmitting} />
      </form>
    </Container>
  );
}
