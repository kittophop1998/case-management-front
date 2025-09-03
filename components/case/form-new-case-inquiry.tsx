'use client';
import { CreateCase } from "@/schemas";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import { ButtonCancel } from "@/components/button/btn-cancle";
import { dialogAlert } from "../common/dialog-alert";
import { useGetDropdownQuery } from "@/features/systemApiSlice";
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
import { emptyCaseInquiry, emptyCaseNoneInquiry } from "@/const/case";
import { CaseType } from "@/types/case.type";
import { SectionEmail, SectionSendEmail } from "./section-email";
import { SectionDisposition } from "./section-disposition";



interface FormNewCaseProps {
    isSmallMod: boolean;
    setStatus?: (status: boolean) => void;
    caseTypeText?: 'None Inquiry' | 'Inquiry';
}

export interface FormNewCaseRef { onOpen: (caseTitle: string | null, customerId: string | null) => void }


const useCaseForm = ({ setStatus }: { setStatus?: (status: boolean) => void }) => {
    const form = useForm<CaseType>({
        resolver: zodResolver(CreateCase),
        defaultValues: emptyCaseNoneInquiry
    })
    const customerId = form.watch('customerId')
    const caseTypeText = form.watch('caseTypeText')
    const [createCase, { isLoading: isLoadingCreateCase }] = useCreateCaseInquiryMutation();
    const loadEmptyForm = (type: 'None Inquiry' | 'Inquiry' = 'Inquiry', defaultForm: { caseTypeId: string, customerId: string }) => {
        switch (type) {
            case 'None Inquiry':
                form.reset({ ...emptyCaseNoneInquiry, ...defaultForm })
                break;
            case 'Inquiry':
                form.reset({ ...emptyCaseInquiry, ...defaultForm })
                break;
            default:
                break;
        }
    }
    const onClose = (): void => {
        setStatus?.(false);
    };
    const onSubmit = async (data: CaseType) => {
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
    useDebugLogForm({ form })
    return { form, formState: { customerId, caseTypeText }, onSubmit, onClose, state: { isLoadingCreateCase }, func: { loadEmptyForm } }
}
const useCustomer = (customerId: string | null) => {
    const { customer, fetch } = useCustomerInfo(customerId)
    useEffect(() => {
        if (customerId) {
            fetch(['info'])
        }
    }, [customerId])
    return { customer }
}
export const FormNewCase = forwardRef<FormNewCaseRef, FormNewCaseProps>
    (
        ({ isSmallMod, setStatus }, ref) => {
            const {
                form
                , formState: { customerId, caseTypeText }
                , state: { isLoadingCreateCase }
                , func: { loadEmptyForm }
                , onClose
                , onSubmit
            } = useCaseForm({ setStatus });
            const { data: ddData } = useGetDropdownQuery();
            const { customer } = useCustomer(customerId || null)

            useImperativeHandle(
                ref, () => (
                    {
                        onOpen: (caseTypeId: string | null, customerId: string | null, caseTypeText: 'None Inquiry' | 'Inquiry' | undefined = 'Inquiry') => {
                            loadEmptyForm(caseTypeText, {
                                caseTypeId: caseTypeId || '',
                                customerId: customerId || '',
                            })
                        }
                    }
                )
            )

            // const seeForm = form.watch()
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
                                    caseTypeText={caseTypeText}
                                />
                                <SectionCaseNoteInfo
                                    isSmallMod={isSmallMod}
                                    form={form}
                                />
                                {
                                    caseTypeText === 'None Inquiry' &&
                                    <SectionEmail
                                        isSmallMod={isSmallMod}
                                        form={form}
                                    />
                                }
                            </div>
                            <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>

                                {/* <SectionDisposition
                                    isSmallMod={isSmallMod}
                                    form={form}
                                    products={ddData?.data?.products || []}
                                /> */}
                                {/* <SectionSendEmail
                                    isSmallMod={isSmallMod}
                                    form={form}
                                /> */}

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