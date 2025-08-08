
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cva } from "class-variance-authority";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Image from "next/image"
import { InputHidden, onTriggerClick } from "./hidden-input";
import { DefaultDeleteButton } from "./default-remove-item";
import { getFilePath } from "@/lib/utils/get-file-path";

interface ImageFieldDefaultProps {
    className?: string;
    name: string;
    form: any;
    label: string;
    readonly?: boolean;
    previewComponent?: React.ReactNode;
}
interface ImageFieldProps extends ImageFieldDefaultProps {
    trickerComponent?: React.ReactNode;
    trickerPreview?: boolean;
}
interface ImageFieldMultipleProps extends ImageFieldDefaultProps {
}
interface DefaultDisplayImageProps {
    className?: string;
    src: File | string;
    alt: string;
}

const imageFieldVariants = cva(
    '',
    {
        variants: {
            readonly: {
                true: "bg-gray-100 cursor-not-allowed",
                false: "bg-white cursor-text",
            }
        }
    }
)

const DefaultDisplayImage = ({ className, src, alt }: DefaultDisplayImageProps) => {
    return (
        <div className={cn("bg-red-300 relative", className)}>
            <Image
                fill
                src={getFilePath(src)}
                alt={alt}
                className={cn("rounded-xl object-cover !relative", className)}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder_user.jpg";
                }}
                placeholder='blur'
                blurDataURL="/placeholder_user.jpg"

            />
        </div>
    );
}

const ImageField = ({ className, readonly = false, form, name, label, previewComponent, trickerComponent, trickerPreview = false }: ImageFieldProps) => {
    return <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}
                </FormLabel>
                <InputHidden
                    name={name}
                    field={field}
                    accept="image/*"
                />
                <span className="w-fit relative">
                    <span
                        onClick={trickerPreview ? () => onTriggerClick(name) : undefined}
                        className={
                            cn('', trickerPreview ? "cursor-pointer" : "")}
                    >
                        {previewComponent ? (
                            previewComponent
                        ) :
                            <DefaultDisplayImage
                                className={className}
                                src={field.value.url}
                                alt={name}
                            />}
                    </span>
                    {field.value.url && (
                        <DefaultDeleteButton
                            className="absolute -top-1 -right-1"
                            onClick={() => field.onChange(undefined)} />
                    )}
                </span>
                {
                    !trickerPreview && (

                        <Button asChild
                            type="button"
                            onClick={() => onTriggerClick(name)}
                        >
                            {trickerComponent}
                        </Button>
                    )
                }
                <FormControl>
                    {/* <Input
                        {...field}
                        readOnly
                    /> */}
                </FormControl>
                <FormMessage />
            </FormItem >
        )}
    />
};

const ImageFieldMultiple = ({ className, readonly = false, form, name, label, previewComponent }: ImageFieldMultipleProps) => {
    const indexUpload = useRef<number | null>(null);
    return <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <InputHidden
                    name={name}
                    field={field}
                    multiple
                    index={indexUpload.current}
                    accept="image/*"
                />
                <div className="flex flex-wrap gap-2">
                    {field.value.map((file: File, index: number) => (
                        <span className="w-fit relative">
                            <span
                                onClick={() => {
                                    indexUpload.current = index;
                                    onTriggerClick(name);
                                }}
                                className={
                                    cn(readonly ? "cursor-not-allowed" : "cursor-pointer", "w-24 h-24 relative rounded-xl overflow-hidden")}
                            >
                                {previewComponent ? (
                                    previewComponent
                                ) :
                                    <DefaultDisplayImage
                                        className={className}
                                        key={index}
                                        src={field.value[index].url}
                                        alt={`${name}-${index}`}
                                    />
                                }
                            </span>
                            <DefaultDeleteButton
                                key={`delete-${index}`}
                                className="absolute -top-1 -right-1"
                                onClick={() => {
                                    const newValue = field.value.filter((_: any, i: number) => i !== index);
                                    field.onChange(newValue);
                                }}
                            />
                        </span>
                    ))}
                    {
                        readonly ? null : (
                            <Button
                                type="button"
                                variant="outline"
                                className={cn("rounded-xl", className)}
                                onClick={() => {
                                    indexUpload.current = null;
                                    onTriggerClick(name);
                                }}
                            >
                                Upload
                            </Button>
                        )
                    }
                </div>
                <FormMessage />
            </FormItem >
        )}
    />
};

export { ImageField, ImageFieldMultiple };