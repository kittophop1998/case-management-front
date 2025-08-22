import { cloneElement } from "react"
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

interface InputFieldWarperProps {
    children: React.ReactElement<{ field: any }>
    loading?: boolean
    form: any
    name: string
    label?: string
    required?: boolean
}
export interface InputFieldWarperChildProps {
    field?: any
}
export interface InputSelectProps {
    items?: any[]
    valueName?: string
    labelName?: string
}
export interface InputDefaultProps {
    placeholder?: string
    onChange?: (value: any) => void
    className?: string
    readonly?: boolean
    loading?: boolean
}
export interface InputFormDefaultProps {
    form: any
    name: string
    label?: string
    required?: boolean
}
export const InputFieldWarper = ({
    children,
    loading,
    form,
    name,
    label,
    required = false
}: InputFieldWarperProps) => {
    return (
        <FormField
            disabled={loading}
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}{required && (<span className='text-red-500'>*</span>)}
                    </FormLabel>
                    {cloneElement(children, { field })}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    // 
}