import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { HeaderRegister } from "../components/register/HeaderRegister";
import { Multistep } from "../components/register/Multistep";
import { api } from "../lib/axios";
import { Container } from "../components/register/Container";
import { ButtonNextStep } from "../components/ButtonNextStep";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

  async function handleRegister() {}

  async function handleConnectCalendar() {
    await signIn("google");
  }

  return (
    <Container>
      <HeaderRegister
        title="Connecte sua agenda!"
        subtitle="Conecte o seu calendário para verificar automaticamente as horas
        ocupadas e os novos eventos á medida que são agendados."
      >
        <Multistep step={4} active={2} />
      </HeaderRegister>

      <div className="bg-gray-800 mt-6 p-6 flex flex-col gap-4 rounded-md border border-gray-600">
        <div className="border border-gray-600 rounded-md px-6 py-4 flex items-center justify-between">
          <span className="text-gray-100 font-medium text-base">
            Google Calendar
          </span>
          {isSignedIn ? (
            <button
              type="button"
              className="bg-transparent border border-green-600 text-green-500 text-sm flex items-center gap-2 py-2 px-4 rounded-md"
              disabled
            >
              Conectado
              <Check weight="fill" />
            </button>
          ) : (
            <button
              type="button"
              className="bg-transparent border border-green-600 text-green-500 text-sm flex items-center gap-2 py-2 px-4 hover:bg-green-600 hover:text-gray-100 rounded-md"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </button>
          )}
        </div>

        {hasAuthError && (
          <span className="text-[#f75a68] mt-2 text-sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            premissões de acesso ao Google Calendar.
          </span>
        )}

        <ButtonNextStep
          title=" Próximo passo "
          type="submit"
          disabled={!isSignedIn}
        />
      </div>
    </Container>
  );
}
