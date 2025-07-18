interface HeaderProps {
  label: string;
}
export const Header = ({ label }: HeaderProps) => {
  return <h1 className="text-lg">{label}</h1>;
};
