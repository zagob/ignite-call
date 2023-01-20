import { Multistep } from "../../components/register/Multistep";
import { Container } from "../../components/register/Container";
import { HeaderRegister } from "../../components/register/HeaderRegister";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonNextStep } from "../../components/ButtonNextStep";
import { TextArea } from "../../components/register/TextArea";
import { Text } from "../../DesignSystem/Text";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../api/auth/[...nextauth].api";
import { api } from "../../lib/axios";
import { useRouter } from "next/router";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type updateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<updateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();

  async function handleUpdateProfile(data: updateProfileData) {
    await api.put("/users/profile", {
      bio: data.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <Container>
      <HeaderRegister
        title="Defina sua disponibilidade"
        subtitle="Por último, uma breve descrição e uma foto de perfil."
      >
        <Multistep step={4} active={4} />
      </HeaderRegister>

      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="mt-6 p-6 flex flex-col gap-2 bg-gray-800 rounded-md border border-gray-600"
      >
        <Text>Foto de perfil</Text>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
            className="w-16 h-16 rounded-full"
          />

          <label className="border-2 cursor-pointer hover:brightness-125 transition-all font-medium text-sm border-green-500 text-green-500 px-4 py-2 rounded-md">
            <span>Selecionar foto</span>
            <input type="file" className="hidden" />
          </label>
        </div>

        <Text>Sobre você</Text>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => {
            return (
              <TextArea
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
              />
            );
          }}
        />

        <span className="text-gray-200 text-sm">
          Fale um pouco sobre você. Isto será exibido em sua página pessoal.
        </span>
        <ButtonNextStep
          disabled={isSubmitting}
          title="Finalizar"
          type="submit"
        />
      </form>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: { session },
  };
};
