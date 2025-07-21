'use client'
import { RadioField } from "@/components/molecules/form/Radio";
import { SelectField } from "@/components/molecules/form/select-field";
import { TextField } from "@/components/molecules/form/text-field";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { UserSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const FormUserDetails = () => {
    const [error, setError] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof UserSchemas>>({
        resolver: zodResolver(UserSchemas),
        defaultValues: {
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
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            form={form}
                            name="agentID"
                            label='Agent ID'
                            placeholder="Agent ID"
                        />
                        <TextField
                            form={form}
                            name="name"
                            label='Agent Name'
                            placeholder="Name"
                        />
                        <TextField
                            form={form}
                            name="domainName"
                            label='Domain Name'
                            placeholder="Domain Name"
                        />
                        <TextField
                            form={form}
                            name="operatorID"
                            label='Operator ID'
                            placeholder="Operator ID"
                        />
                        <SelectField
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
                        <RadioField
                            form={form}
                            items={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                            ]}
                            name="status"
                            label='Status'
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button>Cancel</Button>
                        <Button >Add</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}