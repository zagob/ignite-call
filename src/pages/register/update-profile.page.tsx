import { Multistep } from "../../components/register/Multistep";
import { Container } from "../../components/register/Container";
import { HeaderRegister } from "../../components/register/HeaderRegister";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonNextStep } from "../../components/ButtonNextStep";
import { TextArea } from "../../components/register/TextArea";

const updateProfileSchema = z.object({});

type updateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  async function handleUpdateProfile(data: updateProfileData) {
    console.log(data);
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
        className="mt-6 p-6 flex flex-col bg-gray-800 rounded-md border border-gray-600"
      >
        <TextArea {...register("teste")} />
        <ButtonNextStep title="Finalizar" type="submit" />
      </form>
    </Container>
  );
}
