'use client';
import { NewCaseSchema } from "@/schemas";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { TextAreaField } from "@/components/form/textarea-field";
import { Typography } from "@/components/common/typography";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import { ButtonCancel } from "@/components/button/btn-cancle";
import { dialogAlert } from "../common/dialog-alert";
import { InputInquirySelectMain } from "./input-inquiry-select-main";
import { useGetDropdownQuery, useGetInquiryQuery } from "@/features/systemApiSlice";
import { useCreateCaseMutation } from "@/features/caseApiSlice";
import { getErrorText } from "@/services/api";
import useCaseType from "@/hooks/use-case-type";
import { useCustomerInfo } from "@/hooks/use-customer-info";
import { SectionCard } from "./section-card";
import { SelectField } from "../form/select-field";
import { InputInquiry } from "./input-inquiry";
// import { SelectField } from "../form/select-field";
interface FormNewCaseProps {
    isSmallMod?: boolean;
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
            const { data: ddData } = useGetDropdownQuery();

            const form = useForm<z.infer<typeof NewCaseSchema>>({
                resolver: zodResolver(NewCaseSchema),
                defaultValues: emptyNewCase
            })
            const { control } = form;
            const [createCase, { error: errorCreateCase, isLoading: isLoadingCreateCase }] = useCreateCaseMutation();
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

            const caseTypeId = form.watch('caseTypeId')
            const customerId = form.watch('customerId')
            const { customer, fetch, loading } = useCustomerInfo(customerId)
            // const { data: customerInfo } = useCustomerInfo(customerId)
            useEffect(() => {
                if (customerId) {
                    fetch(['info'])
                }
            }, [customerId])

            const { data: inquirys } = useGetInquiryQuery();
            const seeData = form.watch()
            const { fields, append, remove } = useFieldArray({
                control,
                name: "caseNote",
            });
            const {
                data: { childValue2text },
            } = useCaseType()

            return (
                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={cn('px-3')}>
                        <div className={cn("py-3", isSmallMod ? "max-h-[50vh] overflow-y-auto" : "w-[70vw] grid grid-cols-2 gap-3")}>
                            <div className={cn(isSmallMod ? '' : 'bg-white outline-1')}>
                                {
                                    customer.info?.customerNameEng && (
                                        <SectionCard title="Customer Info" isAccordion={!!isSmallMod}>
                                            <div className="space-y-3 pt-2">
                                                <Typography variant="caption">Customer ID/Passport :  {customer.info?.nationalId}</Typography>
                                                <Typography variant="caption">Customer Name: {customer.info?.customerNameEng}</Typography>
                                                <Typography variant="caption">Aeon ID: {customerId}</Typography>
                                                <Typography variant="caption">Mobile No.: {customer.info?.mobileNO}</Typography>
                                            </div>
                                        </SectionCard>
                                    )
                                }
                                <SectionCard title="Case Info" isAccordion={!!isSmallMod}>
                                    <div className="space-y-3 pt-2">
                                        <Typography variant="caption">Case Type:  {childValue2text?.[caseTypeId] || caseTypeId}</Typography>
                                        {/* <Typography variant="caption">Case ID:  {caseInfo.id}</Typography> */}
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
                                        {/* {JSON.stringify(seeData.caseNote)} */}
                                        {/* {JSON.stringify(fields)} */}
                                        {seeData.caseNote.map((field, index) => (
                                            <TextAreaField
                                                key={`TextAreaField-${index}`}
                                                name={`caseNote.${index}`}
                                                label={`Add Note`}
                                                placeholder="Enter Note"
                                                form={form}
                                            />
                                        ))}
                                    </div>
                                </SectionCard>
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
                                            items={inquirys || []}
                                        />
                                        {/* <div>mainList:{JSON.stringify(mainList)}</div> */}
                                        {/* <div>subList:{JSON.stringify(subList)}</div> */}
                                        {/* <InputInquirySelectMain
                                            onChangeChild={() => {
                                                form.setValue('dispositionMainId', ''); // Reset dispositionMainId when dispositionMains changes
                                                // form.setValue('supInquiry', []); // Reset supInquiryStamp when supInquiry changes
                                                // form.setValue('supInquiryStamp', ''); // Reset supInquiryStamp when supInquiry changes
                                            }}
                                            onChangeMain={() => { }}
                                            form={form}
                                            nameMainLabel='Main inquiry'
                                            nameChildLabel='Select Main inquiry Stamp to Genesys:'
                                            nameChild='dispositionMains'
                                            nameMain='dispositionMainId'
                                            items={
                                                // [
                                                // { value: 'Main001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'Main001-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                                // { value: 'Main002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'Main002-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                                // { value: 'Main003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx', label: 'Main003-Xxxxxxxxxxxx Xxxxxxxxxxxxxxx' },
                                                // ]
                                                inquirys || []
                                            }
                                        /> */}
                                        <SelectField
                                            form={form}
                                            name='product'
                                            label='Product'
                                            placeholder='All'
                                            valueName='id'
                                            labelName='name'
                                            items={ddData?.data?.products || []}
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
                            <Button loading={isLoadingCreateCase}>Save</Button>
                        </div>
                    </form>
                </FormProvider>
            );
        }
    )
// TODO: move under this line to other component
// ? components

// ? Hooks
const emptyCustomer = {
    name: '',
    aeonId: '',
    phone: '',
    caseType: '',
    caseId: '',
    passport: ''
}
const emptyCase = {
    id: '',
    name: '',
}
// function useCustomerInfo(customerId: string | null | undefined) {
//     const [customerInfo, setCustomerInfo] = useState(emptyCustomer)
//     useEffect(() => {
//         if (!!customerId) {
//             setCustomerInfo({
//                 name: 'John Doe',
//                 aeonId: 'AEON123456',
//                 phone: '097766xxxx',
//                 caseType: '123456',
//                 caseId: '123456',
//                 passport: '9712333456234'
//             })
//         } else {
//             setCustomerInfo(emptyCustomer)
//         }

//     }, [customerId])
//     return { data: customerInfo }
// }


