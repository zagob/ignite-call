import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

export function Text({ children }: TextProps) {
  return <span className="text-sm text-gray-100">{children}</span>;
}
