import Image from "next/image";
import previewPNG from "../assets/preview.png";
import { ClaimUserForm } from "../components/ClaimUserForm";

export default function Home() {
  return (
    <div className="flex items-center gap-24 ml-auto h-screen CalcWidth overflow-x-hidden">
      <div className="max-w-[480px] px-10">
        <h2 className="text-gray-100 text-6xl font-extrabold">
          Agendamento descomplicado
        </h2>
        <p className="text-gray-200 text-xl mt-2">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUserForm />
      </div>
      <Image
        src={previewPNG}
        priority
        quality={100}
        alt="Preview do app"
        className="object-cover pr-8"
      />
    </div>
  );
}
