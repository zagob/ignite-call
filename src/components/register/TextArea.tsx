import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea
      className="rounded-md bg-gray-900 text-white h-28 p-2 focus:outline focus:outline-1 focus:outline-zinc-700"
      {...rest}
    />
  );
}
