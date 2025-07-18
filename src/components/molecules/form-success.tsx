interface FormSuccessProps {
  message?: string;
}
export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return <div className="bg-primary/15 p-3 rounded-md">{message}</div>;
};
