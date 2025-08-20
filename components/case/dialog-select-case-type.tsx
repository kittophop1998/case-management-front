'use client'
import { useState } from "react"
import { StatusComplaintLv } from "../customer/status-complaint-lv"
import { StatusCustomerFeeling } from "../customer/status-customer-feeling"
import { SearchFieldInput } from "../form/search-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Separator } from "../ui/separator"
import { Modal } from "../common/Modal"
import { Typography } from "../common/typography"
import useCaseType from "@/hooks/use-case-type"


const Item = ({ handleSelect, id, name }) => {
    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer px-6" onClick={() => handleSelect(id)}>
            <Typography>{name}</Typography>
            <div className="text-xs text-gray-500 font-medium">Create</div>
        </div>
    )
}

const GroupName = ({ name }) => {
    return (
        <div className="flex items-center justify-between p-2 px-6">
            <Typography variant="caption" className="text-[1rem]">{name}</Typography>
        </div>
    )
}

const Group = ({ handleSelect,
    items
    , name
}: { items: any[], handleSelect: () => void, name: string }) => {
    return (
        <div>
            <GroupName name={name}></GroupName>
            {
                items.map((item) => (
                    <Item handleSelect={handleSelect} {...item} />
                ))
            }
            <Separator />
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
    const { group, childByGroup } = useCaseType()
    return (
        <Modal isOpen={open} title={'Surapong Lertprayapat'} onClose={() => setOpen(false)} className="w-[600px] px-0 min-h-[50vh]" classNameHeader='px-6'>
            <div className="bg-white">
                <div className="flex gap-3 px-6">
                    <StatusComplaintLv lv={1} />
                    <StatusCustomerFeeling status='Sweetheart' />
                </div>
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
                <div>
                    <Tabs defaultValue="null">
                        <TabsList className="w-full bg-white px-6 rounded-0">
                            <TabsTrigger className="h-[3.3rem] cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1]" value={'null'} >All</TabsTrigger>
                            {
                                group.map((g) => (
                                    <TabsTrigger className="h-[3.3rem] cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1]" value={g} key={g}>{g}</TabsTrigger>
                                ))
                            }
                        </TabsList>
                        <Separator />
                        <TabsContent value="null">
                            {group.map((g) => (
                                <Group handleSelect={handleSelect} items={childByGroup?.[g] || []} name={g} />
                            ))}
                        </TabsContent>
                        {group.map((g) => (
                            <TabsContent value={g}>
                                <Group handleSelect={handleSelect} items={childByGroup?.[g] || []} name={g} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </Modal>
    )
}