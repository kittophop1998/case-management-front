import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

interface FormErrorProps {
  message?: string;
  className?: string;
}
export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) return null;
  return <div className={cn("bg-destructive/15 p-3 round-md flex gap-1 items-center", className)}><CircleX color='red' size={15} />{message}</div>;
};
