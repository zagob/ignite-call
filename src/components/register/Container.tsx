import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="max-w-[572px] mx-auto mt-4 py-10">{children}</div>;
}
