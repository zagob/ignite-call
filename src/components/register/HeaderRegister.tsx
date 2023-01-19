import { ReactNode } from "react";

interface HeaderRegisterProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function HeaderRegister({
  children,
  subtitle,
  title,
}: HeaderRegisterProps) {
  return (
    <header>
      <div className="mb-12">
        <h1 className="font-bold text-white text-2xl">{title}</h1>
        <span className="text-gray-200 text-base">{subtitle}</span>
      </div>

      {children}
    </header>
  );
}
