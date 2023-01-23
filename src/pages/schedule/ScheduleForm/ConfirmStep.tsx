import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CalendarBlank, Clock } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonNextStep } from "../../../components/ButtonNextStep";
import { Form } from "../../../components/Form";
import { InputBox } from "../../../components/InputBox";
import { Container } from "../../../components/register/Container";
import { TextArea } from "../../../components/register/TextArea";
import { api } from "../../../lib/axios";

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: "É necessário ao minimo 3 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  const router = useRouter();
  const username = String(router.query.username);

  async function handleConfirmScheduling(data: ConfirmFormData) {
    try {
      const { email, name, observations } = data;

      await api.post(`/users/${username}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate,
      });

      onCancelConfirmation();
    } catch (err) {
      console.log(err);
    }
  }

  const describeDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY");
  const describedTime = dayjs(schedulingDate).format("HH:mm[h]");

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleConfirmScheduling)}>
        <div className="flex items-center gap-4">
          <data className="flex items-center gap-2">
            <CalendarBlank size={20} className="text-gray-200" />
            {describeDate}
          </data>
          <time className="flex items-center gap-2">
            <Clock size={20} className="text-gray-200" />
            {describedTime}
          </time>
        </div>

        <div className="my-6 h-px w-full bg-gray-600" />

        <div className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span>Nome Completo</span>
            <InputBox placeholder="username" register={register("name")} />
            {errors.name && (
              <span className="text-sm text-red-400">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span>Endereço de e-mail</span>
            <InputBox
              type="email"
              placeholder="zago@gmail.com"
              register={register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-400">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span>Observações</span>
            <Controller
              name="observations"
              control={control}
              render={({ field }) => (
                <TextArea
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-4 mt-6">
          <ButtonNextStep
            type="button"
            title="Cancelar"
            isArrowActive={false}
            style={{ background: "none", padding: "12px 25px" }}
            onClick={onCancelConfirmation}
          />
          <ButtonNextStep
            type="submit"
            title="Confirmar"
            isArrowActive={false}
            style={{ padding: "12px 25px" }}
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </Container>
  );
}
