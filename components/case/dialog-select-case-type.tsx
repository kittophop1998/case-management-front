'use client'
import { useState } from "react"
import { StatusComplaintLv } from "../customer/status-complaint-lv"
import { StatusCustomerFeeling } from "../customer/status-customer-feeling"
import { SearchFieldInput } from "../form/search-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Separator } from "../ui/separator"
import { Modal } from "../common/Modal"
import { Typography } from "../common/typography"

const Items = ({ handleSelect }) => {
    return (
        <div className="flex flex-col gap-2 max-h-[40vh] overflow-auto">
            <div className="px-6">
                <Typography variant="caption" className="text-[1rem]">Inquiry and disposition</Typography>
                <Item handleSelect={handleSelect} />
            </div>
            <Separator />
            <div className="px-6">
                <Typography variant="caption" className="text-[1rem]">Change customer info</Typography>
                <Item handleSelect={handleSelect} />
                <Item handleSelect={handleSelect} />
                <Item handleSelect={handleSelect} />
            </div>
            <Separator />


        </div>
    )
}
const Item = ({ handleSelect }) => {
    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect('Item Name')}>
            <div className="text-sm">Inquiry and disposition</div>
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
        <Modal isOpen={open} title={'Surapong Lertprayapat'} onClose={() => setOpen(false)} className="w-[600px] px-0" classNameHeader='px-6'>
            <div className="bg-white">
                <div className="flex gap-3 px-6">
                    <StatusComplaintLv lv={1} />
                    <StatusCustomerFeeling status='Sweetheart' />
                </div>
                {/* <div
                    className='my-3'
                > */}
                <div className="py-3 ">
                    <Separator />
                    <div className="px-3">
                        <SearchFieldInput
                            field={{
                                value: searchValue,
                                onChange: (e) => setSearchValue(e.target.value),
                            }}
                            clearABle
                            className="border-0! ring-0! rounded-none outline-none"
                        />
                    </div>
                    <Separator />
                </div>
                {/* </div> */}
                <div>
                    <Tabs defaultValue="all">
                        <TabsList className="w-full bg-white px-6 rounded-0">
                            {
                                [
                                    {
                                        name: 'All',
                                        value: 'all'
                                    }, {
                                        name: 'Account',
                                        value: 'Account'
                                    }, {
                                        name: 'Card',
                                        value: 'Card'
                                    }, {
                                        name: 'Change Info',
                                        value: 'ChangeInfo'
                                    }, {
                                        name: 'Customer',
                                        value: 'Customer'
                                    },
                                ].map((el) => (
                                    <TabsTrigger className="h-[3.3rem] cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1]" value={el.value} key={el.value}>{el.name}</TabsTrigger>
                                ))
                            }
                        </TabsList>
                        {/* <div className="bg-red-500">1</div> */}
                        <Separator className=" mb-1" />
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