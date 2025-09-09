'use client';
import { CreateCaseSchema } from "@/schemas";
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
import { useDebugLogForm } from "@/hooks/use-debug-log-form";
import { CustomerInfo } from "./section-customer-info";
import { SectionCaseInfo } from "./section-case-inquiry-info";
import { SectionCaseNoteInfo } from "./section-case-note-info";
import { emptyCaseInquiry, emptyCaseNoneInquiry } from "@/const/case";
import { CaseType, CaseTypeText } from "@/types/case.type";
import { SectionEmail, SectionSendEmail } from "./section-email";
import { SectionDisposition } from "./section-disposition";

interface FormNewCaseProps {
    isSmallMod: boolean;
    setStatus?: (status: boolean) => void;
    caseTypeText?: CaseTypeText;
}

export interface FormNewCaseRef { onOpen: (caseTitle: string | null, customerId: string | null, cancelText: CaseTypeText) => void }

const useCaseForm = ({ setStatus }: { setStatus?: (status: boolean) => void }) => {
    const form = useForm<CaseType>({
        resolver: zodResolver(CreateCaseSchema),
        defaultValues: emptyCaseNoneInquiry
    })
    const customerId = form.watch('customerId')
    const caseTypeText = form.watch('caseTypeText')
    const [createCase, { isLoading: isLoadingCreateCase }] = useCreateCaseInquiryMutation();
    const loadEmptyForm = (type: CaseTypeText = 'Inquiry', defaultForm: { caseTypeId: string, customerId: string }) => {
        const customerName = form.getValues('customerName')
        switch (type) {
            case 'None Inquiry':
                form.reset({ ...emptyCaseNoneInquiry, ...defaultForm, customerName })
                break;
            case 'Inquiry':
                form.reset({ ...emptyCaseInquiry, ...defaultForm, customerName })
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

            useEffect(() => {
                if (customer.info) {
                    form.setValue('customerName', customer.info.customerNameTh || customer.info.customerNameEng || '')
                }
            }, [customer.info])
            useImperativeHandle(
                ref, () => (
                    {
                        onOpen: (caseTypeId: string | null, customerId: string | null, caseTypeText: CaseTypeText | undefined = 'Inquiry') => {
                            loadEmptyForm(caseTypeText, {
                                caseTypeId: caseTypeId || '',
                                customerId: customerId || '',
                            })
                        }
                    }
                )
            )
            // const seeForm = form.watch();
            return (
                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={cn('px-3')}>
                        {/* {seeForm} */}
                        <div className={cn("py-3 overflow-y-auto", isSmallMod ? "max-h-[50vh]" : "max-h-[75vh] w-[clamp(300px,90vw,75rem)] grid grid-cols-2 gap-3")}>
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
                                    ddData={ddData}

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
                                {
                                    caseTypeText === 'None Inquiry' ?
                                        <SectionSendEmail
                                            isSmallMod={isSmallMod}
                                            form={form}
                                        /> :
                                        <SectionDisposition
                                            isSmallMod={isSmallMod}
                                            form={form}
                                            products={ddData?.products || []}
                                        />
                                }
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