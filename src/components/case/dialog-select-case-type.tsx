'use client'
import { useState } from "react"
import { StatusComplaintLv } from "../customer/status-complaint-lv"
import { StatusCustomerFeeling } from "../customer/status-customer-feeling"
import { SearchFieldInput } from "../form/search-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Separator } from "../ui/separator"
import { Modal } from "../common/Modal"

const Items = ({ handleSelect }) => {
    return (
        <div className="flex flex-col gap-2 max-h-[40vh] overflow-auto">
            {
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                    <>
                        <div>Head 1</div>
                        <Item handleSelect={handleSelect} />
                        <Item handleSelect={handleSelect} />
                        <Item handleSelect={handleSelect} />
                        <Separator />
                    </>
                ))
            }

        </div>
    )
}
const Item = ({ handleSelect }) => {
    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect('Item Name')}>
            <div className="text-sm">Item Name</div>
            <div className="text-xs text-gray-500">Create</div>
        </div>
    )
}
interface DialogSelectCaseTypeProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSelect: (value: string) => void
}
export const DialogSelectCaseType = ({ open, setOpen, onSelect }: DialogSelectCaseTypeProps) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const handleSelect = (value: string) => {
        onSelect(value)
        setOpen(false)
    }
    return (
        <Modal isOpen={open} title={'Surapong Lertprayapat'} onClose={() => setOpen(false)} className=" w-[600px] ">
            <div className="bg-white">
                <div className="flex gap-3">
                    <StatusComplaintLv lv={1} />
                    <StatusCustomerFeeling status='Sweetheart' />
                </div>
                <div>
                    <SearchFieldInput
                        field={{
                            value: searchValue,
                            onChange: (e) => setSearchValue(e.target.value),
                        }}
                        clearABle
                    />
                </div>
                <div>
                    <Tabs defaultValue="all">
                        <TabsList className="w-full bg-white">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="Account">Account</TabsTrigger>
                            <TabsTrigger value="Card">Card</TabsTrigger>
                            <TabsTrigger value="ChangeInfo">Change Info</TabsTrigger>
                            <TabsTrigger value="Customer">Customer</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <Items handleSelect={handleSelect} />
                        </TabsContent>
                        <TabsContent value="Account">
                            <Items handleSelect={handleSelect} />

                        </TabsContent>
                        <TabsContent value="Card">
                            <Items handleSelect={handleSelect} />

                        </TabsContent>
                        <TabsContent value="ChangeInfo">
                            <Items handleSelect={handleSelect} />

                        </TabsContent>
                        <TabsContent value="Customer">
                            <Items handleSelect={handleSelect} />

                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </Modal>
    )
}