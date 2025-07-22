import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export const BtnAddUser = ({
    onOpenDialogCreateUser,
    onOpenDialogImportUser,
}) => {
    const [open, setOpen] = useState(false);
    const closePopover = () => {
        setOpen(false);

    };
    return (
        <div className="flex justify-end mb-3 mt-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="bg-black text-white">
                        <UserPlus />
                        Add User
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