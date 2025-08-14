import { X } from 'lucide-react'
interface BtnCloseProps {
    onClick: () => void;
}
export const BtnClose = ({ onClick }: BtnCloseProps) => {
    return (
        <button onClick={onClick} className="p-1 hover:bg-[#fff1f0] bg-[#fff1f0] cursor-pointer rounded-md">
            {/* @ts-expect-error className is valid for lucide icon */}
            <X className="w-6 h-6" />
        </button>
    );
}