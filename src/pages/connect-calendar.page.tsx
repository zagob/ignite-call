import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { Multistep } from "../components/Multistep";
import { api } from "../lib/axios";

export default function ConnectCalendar() {
  const router = useRouter();

  async function handleRegister() {}

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
          <button
            type="button"
            className="bg-transparent border border-green-600 text-green-500 text-sm flex items-center gap-2 py-2 px-4 hover:bg-green-600 hover:text-gray-100 rounded-md"
          >
            Conectar
            <ArrowRight />
          </button>
        </div>
        <button
          type="submit"
          className="text-gray-100 bg-green-600 rounded-md p-3 flex items-center justify-center gap-2 hover:brightness-125 transition-all"
        >
          Próximo passo <ArrowRight />
        </button>
      </div>
    </div>
  );
}
