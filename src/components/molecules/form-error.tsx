interface FormErrorProps {
  message?: string;
}
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <div className="bg-destructive/15 p-3 round-md">{message}</div>;
};
