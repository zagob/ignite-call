import { Multistep } from "../components/Multistep";

export default function Register() {
  return (
    <div className="max-w-[572px] mx-auto mt-4 py-4">
      <header className="mb-12">
        <h1 className="font-bold text-white text-2xl">
          Bem-vindo ao Ignite Call!
        </h1>
        <span className="text-gray-200 text-base">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </span>
      </header>

      <Multistep step={4} active={1} />
    </div>
  );
}
