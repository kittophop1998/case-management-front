'use client';
import { NewCaseSchema } from "@/schemas";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { TextAreaField } from "@/components/form/textarea-field";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import { ButtonCancel } from "@/components/button/btn-cancle";
import { dialogAlert } from "../common/dialog-alert";
import { useGetDropdownQuery, useGetInquiryQuery } from "@/features/systemApiSlice";
import { useCreateCaseInquiryMutation } from "@/features/caseApiSlice";
import { getErrorText } from "@/services/api";
import { useCustomerInfo } from "@/hooks/use-customer-info";
import { SectionCard } from "./section-card";
import { SelectField } from "../form/select-field";
import { InputInquiry } from "./input-inquiry";
import { useDebugLogForm } from "@/hooks/use-debug-log-form";
import { CustomerInfo } from "./section-customer-info";
import { SectionCaseInfo } from "./section-case-inquiry-info";
import { SectionCaseNoteInfo } from "./section-case-note-info";
interface FormNewCaseProps {
    isSmallMod: boolean;
    setStatus?: (status: boolean) => void;
}

const emptyNewCase: z.infer<typeof NewCaseSchema> = {
    customerId: '',
    dispositionMains: [],
    dispositionSubs: [],
    dispositionMainId: '',
    dispositionSubId: '',
    caseNote: [''],
    caseDescription: '',
    caseTypeId: '',
    productId: '',
}
export interface FormNewCaseRef { onOpen: (caseTitle: string | null, customerId: string | null) => void }
export const FormNewCase = forwardRef<FormNewCaseRef, FormNewCaseProps>
    (
        ({ isSmallMod, setStatus }, ref) => {
            // 
            const form = useForm<z.infer<typeof NewCaseSchema>>({
                resolver: zodResolver(NewCaseSchema),
                defaultValues: emptyNewCase
            })
            const customerId = form.watch('customerId')
            // 
            const { data: ddData } = useGetDropdownQuery();
            const [createCase, { isLoading: isLoadingCreateCase }] = useCreateCaseInquiryMutation();
            const { customer, fetch } = useCustomerInfo(customerId)
            const onSubmit = async (data: z.infer<typeof NewCaseSchema>) => {
                try {
                    await createCase({ body: data }).unwrap();
                    dialogAlert(true)
                    onClose()
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        dialogAlert(false, {
                            title: 'Error',
                            message: error.message || getErrorText(error),
                            confirmText: 'Try again',
                            cancelText: 'Close',
                            onConfirm: () => { },
                            onCancel: () => { }
                        })
                    }
                }
            };
            const onClose = (): void => {
                setStatus?.(false);
            };
            // 
            useEffect(() => {
                if (customerId) {
                    fetch(['info'])
                }
            }, [customerId])
            useImperativeHandle(
                ref, () => (
                    {
                        onOpen: (caseTypeId: string | null, customerId: string | null) => {
                            // fetch(['info'])
                            form.reset({
                                ...emptyNewCase,
                                caseTypeId: caseTypeId || '',
                                customerId: customerId || '',
                            })
                        }
                    }
                )
            )
            useDebugLogForm({ form })
            return (
                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={cn('px-3')}>
                        <div className={cn("py-3", isSmallMod ? "max-h-[50vh] overflow-y-auto" : "w-[70vw] grid grid-cols-2 gap-3")}>
                            <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>
                                {
                                    customer.info?.customerNameEng && customerId &&
                                    <CustomerInfo
                                        customerInfo={customer.info}
                                        customerId={customerId}
                                        isSmallMod={isSmallMod}
                                    />
                                }
                                <SectionCaseInfo
                                    isSmallMod={isSmallMod}
                                    form={form}
                                />
                                <SectionCaseNoteInfo
                                    isSmallMod={isSmallMod}
                                    form={form}
                                />
                            </div>
                            <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>
                                <SectionCard title="Disposition" isAccordion={!!isSmallMod}>
                                    <div className="space-y-3 mt-3">
                                        <InputInquiry
                                            form={form}
                                            mainIdName='dispositionMainId'
                                            subIdName='dispositionSubId'
                                            mainListName='dispositionMains'
                                            subListName='dispositionSubs'
                                        />
                                        <SelectField
                                            form={form}
                                            name='productId'
                                            label='Product'
                                            placeholder='All'
                                            valueName='id'
                                            labelName='name'
                                            items={ddData?.data?.products || []}
                                        />
                                    </div>
                                </SectionCard>

                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pb-3">
                            <ButtonCancel onClick={onClose} />
                            <Button loading={isLoadingCreateCase}>Save</Button>
                        </div>
                    </form>
                </FormProvider>
            );
        }
    )