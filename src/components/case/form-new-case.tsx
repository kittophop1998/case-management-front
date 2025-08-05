'use client';
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form } from "@/components/ui/form";
import { NewCaseSchema } from "@/schemas";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { TextAreaField } from "@/components/form/textarea-field";
import { Typography } from "@/components/common/typography";
import { Check, Maximize2, Minimize2, Minus, Square, X } from "lucide-react";
import { CheckboxField } from "@/components/form/checkbox";
import { SelectField } from "@/components/form/select-field";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ButtonCancel } from "@/components/button/btn-cancle";
import { RadioField } from "@/components/form/radio";

const SectionCard = ({ title, children, isAccordion }: { title: string, children: React.ReactNode, isAccordion: boolean }) => {
    const [isOpen, setIsOpen] = useState(true);
    if (isAccordion) {
        return (
            <Card className="rounded-none shadow-none p-3">
                <Accordion type="single" collapsible className="" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='p-0 m-0'>{title}</AccordionTrigger>
                        <AccordionContent className="mt-2 text-gray-600">
                            {children}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        );
    } else {
        return (
            <>
                <div className="p-3">
                    <div >
                        {title}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                <Separator />
            </>)

    }

}

interface FormNewCaseProps {
    isSmallMod?: boolean;
    setStatus?: (status: boolean) => void;
}
export const FormNewCase = ({ isSmallMod, setStatus }: FormNewCaseProps) => {
    const onSubmit = (data: z.infer<typeof NewCaseSchema>) => {
        console.log('Form submitted with data:', data);
        onClose()
    };
    const onClose = () => {
        setStatus(false);
    };
    const form = useForm<z.infer<typeof NewCaseSchema>>({
        resolver: zodResolver(NewCaseSchema),
        defaultValues: {
            mainInquiry: '',
            mainInquiryStamp: '',
            supInquiry: '',
            isDraft: false
        }
    })
    return (
        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn('px-3')}>
                <div className={cn("py-3", isSmallMod ? "max-h-[50vh] overflow-y-auto" : "grid grid-cols-2 gap-3")}>
                    <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>
                        <SectionCard title="Customer Info" isAccordion={!!isSmallMod}>
                            <>
                                <h3>Customer Information</h3>
                                <p>Name: John Doe</p>
                                <p>Email: john.doe@example.com</p>
                                <p>Phone: (123) 456-7890</p>
                            </>
                        </SectionCard>
                        <SectionCard title="Case Info" isAccordion={!!isSmallMod}>
                            <>
                                <h3>Case Information</h3>
                                <p>Case ID: 123456</p>
                                <p>Status: Open</p>
                                <p>Description: This is a sample case description.</p>
                                <TextAreaField
                                    name="mainInquiry"
                                    label="Add Note"
                                    placeholder="Enter Note"
                                    form={form}
                                />
                            </>
                        </SectionCard>
                    </div>
                    <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>
                        <SectionCard title="Disposition" isAccordion={!!isSmallMod}>
                            <>
                                <SelectField
                                    form={form}
                                    name="supInquiry"
                                    label="Select Sup Inquiry"
                                    items={[
                                        { value: 'sup1', label: 'SUP001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'sup2', label: 'SUP002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'sup3', label: 'SUP003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                    ]}
                                    valueName="value"
                                    labelName="label"

                                />
                                <CheckboxField
                                    label="Select Main inquiry Stamp to Genesys:"
                                    form={form}
                                    items={[
                                        { value: 'inquiry1', label: 'MIA001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'inquiry2', label: 'MIA002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'inquiry3', label: 'MIA003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                    ]}
                                    name="mainInquiryStamp"
                                    valueName="value"
                                    labelName="label"

                                >
                                </CheckboxField>
                                <Typography className="mt-3">Sup inquiry</Typography>
                                <SelectField
                                    form={form}
                                    name="supInquiry"
                                    label="Select Sup Inquiry"
                                    items={[
                                        { value: 'sup1', label: 'SUP001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'sup2', label: 'SUP002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'sup3', label: 'SUP003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                    ]}
                                    valueName="value"
                                    labelName="label"
                                />
                                <CheckboxField
                                    label="Select Main inquiry Stamp to Genesys:"
                                    form={form}
                                    items={[
                                        { value: 'inquiry1', label: 'MIA001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'inquiry2', label: 'MIA002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'inquiry3', label: 'MIA003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                    ]}
                                    name="mainInquiryStamp"
                                    valueName="value"
                                    labelName="label"

                                >
                                </CheckboxField>
                            </>
                        </SectionCard>
                        <Typography>Require Create Case</Typography>
                        <RadioField
                            form={form}
                            items={
                                [
                                    {
                                        label: 'Yes',
                                        value: true
                                    },
                                    {
                                        label: 'No',
                                        value: false
                                    }
                                ]
                            }
                            valueName='value'
                            labelName='label'
                            name='isDraft'
                            label='Create Draft case ?'
                            className='flex'
                        >

                        </RadioField>
                        <Typography>Select Case for Draft</Typography>

                    </div>
                </div>
                <div className="flex justify-end gap-3 pb-3">
                    <ButtonCancel onClick={onClose} />
                    <Button>Save</Button>
                </div>
            </form>
        </FormProvider>
    );
};
