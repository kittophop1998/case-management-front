import { SearchFieldInput } from "@/components/form/search-field";

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
    departments: any[];
    sections: any[];
}
export const SearchSection = ({
    search,
    setSearch,
    departments,
    sections,
}: SearchSectionProps) => (
    <div className="flex items-center gap-3">
        <SearchFieldInput field={
            { value: '', onChange: () => { }, onBlur: () => { }, onFocus: () => { }, name: 'search', disabled: false }
        } />
        <SearchFieldInput field={
            { value: '', onChange: () => { }, onBlur: () => { }, onFocus: () => { }, name: 'search', disabled: false }
        } />
        <SearchFieldInput field={
            { value: '', onChange: () => { }, onBlur: () => { }, onFocus: () => { }, name: 'search', disabled: false }
        } />
    </div>
);