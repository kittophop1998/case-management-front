import { CircleX } from "lucide-react";

interface FormErrorProps {
  message?: string;
}
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <div className="bg-destructive/15 p-3 round-md flex gap-1 items-center"><CircleX color='red' size={15} />{message}</div>;
};
