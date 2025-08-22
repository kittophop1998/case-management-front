import { cloneElement } from "react"
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

interface InputFieldWarperProps {
    children: React.ReactElement<{ field: any }>
    loading?: boolean
    form: any
    name: string
    label: string
    reqired?: boolean
}
export const InputFieldWarper = ({
    children,
    loading,
    form,
    name,
    label,
    reqired = false
}: InputFieldWarperProps) => {
    return (
        <FormField
            disabled={loading}
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}{reqired && (<span className='text-red-500'>*</span>)}</FormLabel>
                    {cloneElement(children, { field })}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    // 
}