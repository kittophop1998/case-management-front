'use client'
import { FormError } from "@/components/common/form-error";
import { RadioField } from "@/components/common/form/Radio";
import { SelectField } from "@/components/common/form/select-field";
import { TextField } from "@/components/common/form/text-field";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { UserSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { is } from "date-fns/locale";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
interface FormUserDetailsProps {
    mode: 'create' | 'edit';
    uID?: number | null;
    getUserDetails: (uID: number) => Promise<z.infer<typeof UserSchemas>>;
}
export const FormUserDetails = ({ mode, uID, getUserDetails }: FormUserDetailsProps) => {
    const [error, setError] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof UserSchemas>>({
        resolver: zodResolver(UserSchemas),
        defaultValues: {
            uID: null,
            agentID: '',
            name: '',
            email: '',
            role: 'User',
            team: '',
            center: '',
            status: 'Active',
        }
    })
    const onSubmit = async (value: z.infer<typeof UserSchemas>) => {
        console.log("Form submitted with values:", value);
        setError('')
        startTransition(async () => {
            try {
                console.log("Form submitted with values:", value);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            }
        })
    }
    useEffect(() => {
        if (mode === 'edit' && uID) {
            setError('')
            startTransition(async () => {
                try {
                    console.log("1 Fetching user details for uID:", uID);
                    const userDetails = await getUserDetails(uID)
                    console.log("2 Fetched user details:", userDetails);
                    if (!userDetails) {
                        throw new Error("User details not found");
                    }
                    form.reset(userDetails);
                } catch (error) {

                }
            })

        }
    }, [mode, uID, getUserDetails]);

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className={cn("grid  gap-4 ", mode === 'create' ? 'grid-cols-2' : 'grid-cols-1')}>
                        {
                            mode === 'create' && (
                                <>
                                    <TextField
                                        loading={isPending}
                                        form={form}
                                        name="agentID"
                                        label='Agent ID'
                                        placeholder="Agent ID"
                                    />
                                    <TextField
                                        loading={isPending}
                                        form={form}
                                        name="name"
                                        label='Agent Name'
                                        placeholder="Name"
                                    />
                                    <TextField
                                        loading={isPending}
                                        form={form}
                                        name="domainName"
                                        label='Domain Name'
                                        placeholder="Domain Name"
                                    />
                                    <TextField
                                        loading={isPending}
                                        form={form}
                                        name="operatorID"
                                        label='Operator ID'
                                        placeholder="Operator ID"
                                    />
                                </>
                            )
                        }
                        <SelectField
                            loading={isPending}
                            form={form}
                            items={[
                                { value: 'Admin', label: 'Admin' },
                                { value: 'User', label: 'User' },
                                { value: 'Guest', label: 'Guest' },
                            ]}
                            name="role"
                            label='Role'
                            placeholder="Select"
                        />
                        <SelectField
                            loading={isPending}
                            form={form}
                            items={[
                                { value: 'Team A', label: 'Team A' },
                                { value: 'Team B', label: 'Team B' },
                                { value: 'Team C', label: 'Team C' },
                            ]}
                            name="team"
                            label='Team'
                            placeholder="Select"
                        />
                        <SelectField
                            loading={isPending}
                            form={form}
                            items={[
                                { value: 'BKK', label: 'BKK' },
                                { value: 'CNX', label: 'CNX' },
                                { value: 'HKT', label: 'HKT' },
                            ]}
                            name="center"
                            label='Center'
                            placeholder="Select"
                        />
                        <div />
                        <div className={cn(mode === 'create' ? '' : 'order-first')}>
                            <RadioField
                                loading={isPending}
                                form={form}
                                items={[
                                    { value: 'Active', label: 'Active' },
                                    { value: 'Inactive', label: 'Inactive' },
                                ]}
                                name="status"
                                label='Status'
                                className="flex "
                            />
                        </div>
                    </div>

                    <FormError message={error} />
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" >Cancel</Button>
                        <Button type='submit' disabled={isPending}>{mode === 'create' ? 'Add' : 'Save'}</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}