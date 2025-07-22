import { Search } from "lucide-react";
import { Input } from "../common/text-input";

const InputFilter = (
    {
        field,
        placeholder = "Search...",
        readonly = false,
    }: {
        field: any;
        placeholder?: string;
        readonly?: boolean;
    }
) => {
    return (
        <div className='relative flex'>
            <div className='absolute flex items-center justify-center h-full w-[2rem]'>
                <Search
                    size={15}
                    className='cursor-pointer'
                />
            </div>
            <Input
                prependInnerIcon
                placeholder={placeholder}
                {...field}
                readOnly={readonly}
            />
        </div>
    );
};

export default InputFilter;