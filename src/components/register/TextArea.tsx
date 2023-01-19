import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea {...rest} />;
}
