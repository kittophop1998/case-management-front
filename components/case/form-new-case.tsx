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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ButtonCancel } from "@/components/button/btn-cancle";
import { RadioField } from "@/components/form/radio";
import { dialogAlert } from "../common/dialog-alert";
import { InputInquirySelectMain } from "./input-inquiry-select-main";

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
        dialogAlert(true)
        onClose()
    };
    const onClose = () => {
        setStatus(false);
    };
    const form = useForm<z.infer<typeof NewCaseSchema>>({
        resolver: zodResolver(NewCaseSchema),
        defaultValues: {
            mainInquiry: [],
            mainInquiryStamp: '',
            supInquiry: [],
            supInquiryStamp: '',
            isDraft: false,
            note: '',
            caseDescription: ''
        }
    })
    const customer = {
        name: 'John Doe',
        email: '',
        phone: '(123) 456-7890',
        caseType: '123456',
        caseId: '123456',
    }
    useEffect(() => {
        console.log('All errors:', form.formState.errors)
        console.log('All errors:', form.getValues())
    }, [form.formState.errors])
    return (
        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn('px-3')}>
                <div className={cn("py-3", isSmallMod ? "max-h-[50vh] overflow-y-auto" : "w-[70vw] grid grid-cols-2 gap-3")}>
                    <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>
                        <SectionCard title="Customer Information" isAccordion={!!isSmallMod}>
                            <div className="space-y-3 pt-2">
                                <Typography variant="caption">Customer ID/Passport :  9712333456234</Typography>
                                <Typography variant="caption">Name: John Doe</Typography>
                                <Typography variant="caption">Email: john.doe@example.com</Typography>
                                <Typography variant="caption">Phone: (123) 456-7890</Typography>
                            </div>
                        </SectionCard>
                        <SectionCard title="Case Information" isAccordion={!!isSmallMod}>
                            <div className="space-y-3 pt-2">
                                <Typography variant="caption">Case Type:  Inquiry</Typography>
                                <Typography variant="caption">Case ID:  AC1029384B</Typography>
                                <TextAreaField
                                    name="caseDescription"
                                    label="Case Description"
                                    placeholder="Enter Case Description"
                                    form={form}
                                />
                            </div>
                        </SectionCard>
                        <SectionCard title="Case Note" isAccordion={!!isSmallMod}>
                            <div className="space-y-3 pt-2">
                                <TextAreaField
                                    name="note"
                                    label="Add Note"
                                    placeholder="Enter Note"
                                    form={form}
                                />
                            </div>
                        </SectionCard>
                    </div>
                    <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>
                        <SectionCard title="Disposition" isAccordion={!!isSmallMod}>
                            <div className="space-y-3 mt-3">
                                <InputInquirySelectMain
                                    onChangeChild={() => {
                                        form.setValue('mainInquiryStamp', ''); // Reset mainInquiryStamp when mainInquiry changes
                                        form.setValue('supInquiry', []); // Reset supInquiryStamp when supInquiry changes
                                        form.setValue('supInquiryStamp', ''); // Reset supInquiryStamp when supInquiry changes
                                    }}
                                    onChangeMain={() => { }}
                                    form={form}
                                    nameMainLabel='Main inquiry'
                                    nameChildLabel='Select Main inquiry Stamp to Genesys:'
                                    nameChild='mainInquiry'
                                    nameMain='mainInquiryStamp'
                                    items={[
                                        { value: 'Main001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'Main001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'Main002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'Main002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'Main003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'Main003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                    ]}
                                />
                                {/* <InputInquirySelectMain
                                    onChangeMain={() => { }}
                                    onChangeChild={() => {
                                        form.setValue('supInquiryStamp', ''); // Reset supInquiryStamp when supInquiry changes
                                    }}
                                    nameMainLabel='Sup inquiry'
                                    nameChildLabel='Select Sup inquiry in select:'
                                    form={form}
                                    nameChild='supInquiry'
                                    nameMain='supInquiryStamp'
                                    items={[
                                        { value: 'SUP001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'SUP001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'SUP002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'SUP002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                        { value: 'SUP003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'SUP003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                    ]}
                                /> */}
                            </div>
                        </SectionCard>

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


// <SectionCard title="Require Create Case" isAccordion={!!isSmallMod}>
//     <div className="space-y-3 pt-2">
//         <RadioField
//             form={form}
//             items={
//                 [
//                     {
//                         label: 'Yes',
//                         value: true
//                     },
//                     {
//                         label: 'No',
//                         value: false
//                     }
//                 ]
//             }
//             valueName='value'
//             labelName='label'
//             name='isDraft'
//             label='Create Draft case ?'
//             className='flex'
//         />
//         <RadioField
//             form={form}
//             items={
//                 [
//                     {
//                         label: 'Change Name',
//                         value: 1
//                     },
//                     {
//                         label: 'Change Passport',
//                         value: 2
//                     },
//                     {
//                         label: 'Change Birth date',
//                         value: 3
//                     },
//                     {
//                         label: 'Change mobile number ',
//                         value: 4
//                     },
//                     {
//                         label: 'Change Birth date',
//                         value: 5
//                     }
//                 ]
//             }
//             valueName='value'
//             labelName='label'
//             name='isDraft'
//             label='Select Case for Draft'
//         />
//     </div>
// </SectionCard>