import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputBox } from "../components/InputBox";
import { Multistep } from "../components/Multistep";
import { api } from "../lib/axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Minimo de 3 caracteres." })
    .regex(/^([a-z\\-]+)$/i, { message: "Nao e permitido numeros." })
    .transform((value) => value.toLocaleLowerCase()),
  name: z.string().min(3, { message: "Nome com minimo de 3 caracteres." }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      });

      await router.push("/register/connect-calendar");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        alert(err.response.data.message);
        return;
      }

      console.log(err);
    }
  }

  return (
    <div className="max-w-[572px] mx-auto mt-4 py-10">
      <header>
        <div className="mb-12">
          <h1 className="font-bold text-white text-2xl">
            Bem-vindo ao Ignite Call!
          </h1>
          <span className="text-gray-200 text-base">
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </span>
        </div>
        <Multistep step={4} active={1} />
      </header>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-gray-800 border border-gray-600 rounded mt-6 p-4 flex flex-col gap-4"
      >
        <label className="flex flex-col gap-2">
          <span className="text-md text-gray-100">Nome de usuário</span>
          <InputBox
            isPrefix
            namePrefix="ignite.com"
            placeholder="seu-usuario"
            register={register("username")}
          />

          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
        </label>

        <label>
          <span className="text-md text-gray-100">Nome completo</span>
          <InputBox placeholder="Seu nome" register={register("name")} />

          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </label>

        <button
          type="submit"
          className="text-gray-100 bg-green-600 rounded-md p-3 flex items-center justify-center gap-2 hover:brightness-125 transition-all"
        >
          Próximo passo <ArrowRight />
        </button>
      </form>
    </div>
  );
}
