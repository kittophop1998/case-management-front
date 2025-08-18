import { FormError } from "@/components/form/form-error";
import { SearchFieldInput } from "@/components/form/search-field";
import { SelectFieldInput } from "@/components/form/select-field";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { getErrorText } from "@/services/api";
import { current } from "@reduxjs/toolkit";
import { promises } from "dns";

interface SearchSectionProps {
    search: {
        department: string;
        section: string;
        text: string;
    };
    setSearch: (value: {
        department?: string;
        section?: string;
        text?: string;
    }) => void;
    confirmChangeGroup: () => Promise<Boolean>
}
export const SearchSection = ({
    search,
    setSearch,
    confirmChangeGroup
}: SearchSectionProps) => {
    const { data: dataDropdown, error, isFetching, isError } = useGetDropdownQuery()

    return (
        <div>
            <div className="flex items-center gap-3">
                <div
                    className="w-[clamp(100px,100%,172px)]"
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
                        items={dataDropdown?.data?.departments || []}
                        valueName='id'
                        labelName='name'
                        placeholder="Select Department"
                        loading={isFetching}
                        readonly={isError}
                    />
                </div>
                <div className="w-[clamp(100px,100%,172px)]">
                    <SelectFieldInput
                        field={{
                            value: search.section,
                            onChange: async (value: any) => {
                                if (await confirmChangeGroup()) {
                                    setSearch((current) => ({ ...current, section: value }))
                                }
                            }
                        }}
                        items={dataDropdown?.data?.sections || []}
                        valueName='id'
                        labelName='name'
                        placeholder="Select Section"
                        loading={isFetching}
                        readonly={isError}
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
                        readonly={isError}
                    />
                </div>
            </div >
            {!!isError && <FormError className='mt-3' message={getErrorText(error)} />}
        </div>
    )
};