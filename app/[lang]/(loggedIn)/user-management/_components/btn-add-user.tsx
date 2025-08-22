import { Typography } from "@/components/common/typography";
import { Button } from "@/components/common/Button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import AddUserSvg from '@/public/icons/Add User.svg'

interface BtnAddUserProps {
    onOpenDialogCreateUser: () => void;
    onOpenDialogImportUser: () => void;
}
export const BtnAddUser = ({
    onOpenDialogCreateUser,
    onOpenDialogImportUser,
}: BtnAddUserProps) => {
    const [open, setOpen] = useState(false);
    const closePopover = () => {
        setOpen(false);

    };
    return (
        <div className="flex justify-end">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant='black' className="rounded-xl">
                        {/* <UserPlus /> */}
                        <AddUserSvg size={20} className='size-[1.25rem]' />
                        Add user
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <Typography variant="h5" className="mb-2">
                        Add New User
                    </Typography>
                    <Button className="w-full mb-4" onClick={() => {
                        onOpenDialogImportUser();
                        closePopover();
                    }}>
                        Import User
                    </Button>
                    <Button className="w-full mb-4" onClick={() => {
                        onOpenDialogCreateUser();
                        closePopover();
                    }}>
                        Add Individual
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}