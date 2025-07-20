import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { JSX, ReactNode } from "react";

type TypographyProps = {
  variant?:
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "button";
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

const typographyVariants = cva(
  "",
  {
    variants: {
      variant: {
        h1: "text-4xl font-bold",
        h2: "text-3xl font-semibold",
        h3: "text-2xl font-semibold",
        h4: "text-xl font-medium",
        h5: "text-lg font-medium",
        h6: "text-base font-medium",
        body1: "text-base",
        body2: "text-sm",
        caption: "text-xs text-muted-foreground",
        overline: "text-xs uppercase tracking-widest text-muted-foreground",
        button: "text-sm font-medium uppercase tracking-wide",
      },
    },
  }
)
export const Typography = ({
  variant = "body1",
  children,
  className,
  as,
}: TypographyProps) => {
  const Component = as || "p";

  return (
    <Component className={cn(typographyVariants({ variant }), className)}>
      {children}
    </Component>
  );
};
