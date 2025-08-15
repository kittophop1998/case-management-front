import { SearchFieldInput } from "@/components/form/search-field";
import { SelectFieldInput } from "@/components/form/select-field";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { current } from "@reduxjs/toolkit";

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
}
export const SearchSection = ({
    search,
    setSearch,
}: SearchSectionProps) => {
    const { data: dataDropdown, error, isFetching } = useGetDropdownQuery()
    if (error) {
        console.error("Error fetching dropdown data:", error);
        return <div>Error loading data</div>;
    }
    return (
        <div className="flex items-center gap-3">
            <div
                className="w-[clamp(100px,100%,172px)]"
            >
                <SelectFieldInput
                    field={{
                        value: search.department,
                        onChange: (value: any) => {
                            setSearch((current) => ({ ...current, department: value }))
                        }
                    }}
                    items={dataDropdown?.data?.departments || []}
                    valueName='id'
                    labelName='name'
                    placeholder="Select Department"
                    loading={isFetching}
                />
            </div>
            <div className="w-[clamp(100px,100%,172px)]">
                <SelectFieldInput
                    field={{
                        value: search.section,
                        onChange: (value: any) => {
                            setSearch((current) => ({ ...current, section: value }))
                        }
                    }}
                    items={dataDropdown?.data?.sections || []}
                    valueName='id'
                    labelName='name'
                    placeholder="Select Section"
                    loading={isFetching}
                />
            </div>
            <div className="w-[clamp(250px,100%,375px)]">
                <SearchFieldInput field={
                    {
                        value: search.text,
                        onChange: (v: any) => {
                            setSearch((e) => ({ ...current, text: e.target.value }))
                        }
                    }
                } />
            </div>
        </div >
    )
};