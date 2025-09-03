import { FormError } from "@/components/form/form-error";
import { SearchFieldInput } from "@/components/form/search-field";
import { SelectFieldInput } from "@/components/form/select-field";
import { GetDropdownResponse, useGetDropdownQuery } from "@/features/systemApiSlice";
import { getErrorText } from "@/services/api";
import { current } from "@reduxjs/toolkit";
import { promises } from "dns";
import { Dispatch, SetStateAction } from "react";

interface SearchSectionProps {
    search: {
        department: string;
        section: string;
        text: string;
    };
    // setSearch: (value: {
    //     department?: string;
    //     section?: string;
    //     text?: string;
    // }) => void;
    setSearch: Dispatch<SetStateAction<{
        department: string;
        section: string;
        text: string;
    }>>
    confirmChangeGroup: () => Promise<Boolean>
    error: any,
    isError: boolean,
    dataDropdown: GetDropdownResponse | undefined,
    isFetching: boolean
}
export const SearchSection = ({
    search,
    setSearch,
    confirmChangeGroup,
    error,
    isError,
    dataDropdown,
    isFetching
}: SearchSectionProps) => {
    return (
        <div>
            <div className="flex items-center gap-3">
                <div
                    className="w-[clamp(100px,100%,182px)]"
                >
                    <SelectFieldInput
                        field={{
                            value: search.department,
                            onChange: async (value: any) => {
                                if (await confirmChangeGroup()) {
                                    setSearch((current) => ({ ...current, department: value }))
                                }
                            }
                        }}
                        items={dataDropdown?.data?.departments ? dataDropdown?.data?.departments.filter(v => v.name !== "System") : []}
                        valueName='id'
                        labelName='name'
                        placeholder="Select Department"
                        loading={isFetching}
                        readonly={isError}
                        className="small-input "
                    />
                </div>
                <div className="w-[clamp(100px,100%,182px)]">
                    <SelectFieldInput
                        field={{
                            value: search.section,
                            onChange: async (value: any) => {
                                if (await confirmChangeGroup()) {
                                    setSearch((current) => ({ ...current, section: value }))
                                }
                            }
                        }}
                        items={dataDropdown?.data?.sections ? dataDropdown?.data?.sections.filter(v => v.name !== "System") : []}
                        valueName='id'
                        labelName='name'
                        placeholder="Select Section"
                        loading={isFetching}
                        readonly={isError}
                        className="small-input "

                    />
                </div>
                <div className="w-[clamp(250px,100%,375px)]">
                    <SearchFieldInput field={
                        {
                            value: search.text,
                            onChange: (e: any) => {
                                setSearch((current) => ({ ...current, text: e?.target?.value || '' }))
                            }
                        }
                    }
                        placeholder="Search Function"
                        readonly={isError}
                        className='small-input'
                    />
                </div>
            </div >
            {!!isError && <FormError className='mt-3' message={getErrorText(error)} />}
        </div>
    )
};