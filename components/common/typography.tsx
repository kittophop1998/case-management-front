import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { JSX, ReactNode } from "react";
import { Poppins } from 'next/font/google'
import { Roboto } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // pick the weights you need
  subsets: ['latin']
});
const roboto = Roboto({
  weight: ['400', '500', '600', '700'], // pick the weights you need
  subsets: ['latin']
});

type TypographyProps = {
  variant?:
  | "h1"      // ใช้ไม่บ่อยมาก (ส่วนใหญ่ในหน้า landing หรือ section ใหญ่) ~5%
  | "h2"      // ใช้ปานกลาง (หัวข้อหลักในหน้า) ~10%
  | "h3"      // ใช้บ่อย (หัวข้อย่อยในเนื้อหา) ~15%
  | "h4"      // ใช้ปานกลาง (หัวข้อเล็ก, card title) ~10% ******
  | "h5"      // ใช้น้อย (subtitle/หัวข้อย่อยมาก) ~5%
  | "h6"      // ใช้น้อย (subtitle เล็กสุด) ~3% //? Header Page
  | "body1"   // ใช้บ่อยที่สุด (เนื้อหาหลัก paragraph) ~30% *****
  | "body2"   // ใช้บ่อย (เนื้อหาขนาดเล็กกว่า, secondary text) ~15%
  | "caption" // ใช้บ่อยปานกลาง (hint/คำอธิบายใต้ input หรือภาพ) ~10% ***
  | 'caption2'
  | "overline"// ใช้น้อยมาก (label ด้านบน, section indicator) ~2%
  | "button"  // ใช้ปานกลาง (label ปุ่มทั้งหมด) ~15%
  // * DELETE UNDER THIS
  | "subH3Medium" // ใช้บ่อย (subtitle ขนาดกลาง, ใช้ font Poppins) ~20%
  | 'body2grey'
  | 'buttonSmall'
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  textStyle?: 'poppins' | 'default' | 'roboto'
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
        caption2: "text-[14px] text-muted-foreground",
        overline: "text-xs uppercase tracking-widest text-muted-foreground",
        button: "text-sm font-medium uppercase tracking-wide",
        // Costom
        buttonSmall: "text-xs",
        body2grey: "text-sm text-muted-foreground",
        subH3Medium: cn(poppins.className, "font-medium text-[1.25rem]"),//use font Poppins
      },
      textStyle: {
        poppins: poppins.className,
        roboto: roboto.className,
        default: '',
      },
    },

  }
)
export const Typography = ({
  variant = "body1",
  children,
  className,
  textStyle = 'default',
  as,
}: TypographyProps) => {
  const Component = as || "p";

  return (
    <Component className={cn(typographyVariants({ variant, textStyle }), className)}>
      {children}
    </Component>
  );
};
