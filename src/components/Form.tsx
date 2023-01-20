import { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return (
    <form
      className="bg-gray-800 border border-gray-600 rounded-md p-6 text-gray-100"
      {...rest}
    >
      {children}
    </form>
  );
}
