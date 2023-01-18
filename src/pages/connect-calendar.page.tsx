import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { Multistep } from "../components/Multistep";
import { api } from "../lib/axios";

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
    <div className="max-w-[572px] mx-auto mt-4 py-10">
      <header>
        <div className="mb-12">
          <h1 className="font-bold text-white text-2xl">
            Connecte sua agenda!
          </h1>
          <span className="text-gray-200 text-base">
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos á medida que são agendados.
          </span>
        </div>
        <Multistep step={4} active={2} />
      </header>

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

        <button
          type="submit"
          className="text-gray-100 bg-green-600 rounded-md p-3 flex items-center justify-center gap-2 hover:brightness-125 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:brightness-100"
          disabled={!isSignedIn}
        >
          Próximo passo <ArrowRight />
        </button>
      </div>
    </div>
  );
}
