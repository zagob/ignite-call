import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "./InputBox";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Minimo de 3 caracteres." })
    .regex(/^([a-z\\-]+)$/i, { message: "Nao e permitido numeros." })
    .transform((value) => value.toLocaleLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  function handleClaimUserFormData(data: ClaimUsernameFormData) {
    console.log(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClaimUserFormData)}
        className="bg-gray-800 border border-gray-600 rounded mt-6 p-4 grid grid-cols-[1fr_160px] gap-2"
      >
        <InputBox register={register("username")} />
        <button
          type="submit"
          className="bg-green-600 text-gray-100 flex items-center gap-2 rounded px-2 py-1 hover:brightness-105 transition-all"
        >
          Reservar usuario <ArrowRight />
        </button>
      </form>
      <span className="text-red-500 text-sm font-medium absolute mt-2">
        {errors.username?.message}
      </span>
    </>
  );
}
