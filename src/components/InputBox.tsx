import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
}

export function InputBox({ register, ...rest }: InputBoxProps) {
  return (
    <div className="border border-transparent text-gray-200 py-1 flex gap-1 focus-within:border-green-500 rounded bg-gray-900">
      <span className="text-gray-500 pl-2">cal.com/</span>
      <input
        type="text"
        placeholder="seu-usuario"
        className="bg-transparent w-full rounded outline-none border-transparent h-full"
        {...register}
        {...rest}
      />
    </div>
  );
}
