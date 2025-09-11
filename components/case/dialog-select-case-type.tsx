"use client";
import { useState } from "react";
import { StatusComplaintLv } from "../customer/status-complaint-lv";
import { StatusCustomerFeeling } from "../customer/status-customer-feeling";
import { SearchFieldInput } from "../form/search-field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Modal } from "../common/Modal";
import { Typography } from "../common/typography";
import useCaseType from "@/hooks/use-case-type";
import { Badge } from "../ui/badge";
import { CaseTypeText } from "@/types/case.type";


const getTypeByName = (name: string): CaseTypeText => {
    return name === 'Inquiry and disposition' ? 'Inquiry' : 'None Inquiry'
}
interface ItemProps {
    id: string;
    name: string;
    handleSelect: (id: string, caseTypeText: CaseTypeText) => void;
}
const Item = ({ handleSelect, id, name }: ItemProps) => {
    return (
        <div
            className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer px-6"
            onClick={() => handleSelect(id, getTypeByName(name))}
        >
            <Typography>{name}</Typography>

            <div className="text-xs text-gray-500 font-medium">Create</div>
        </div>
    );
};

const GroupName = ({ name }: { name: string }) => {
    return (
        <div className="flex items-center justify-between p-2 px-6">
            <Typography variant="caption" className="text-[1rem]">
                {name}
            </Typography>
        </div>
    );
};

const Group = ({
    handleSelect,
    items,
    name,
    separator = true
}: {
    items: any[];
    handleSelect: (value: string, caseTypeText: CaseTypeText) => void;
    name: string;
    separator?: boolean;
}) => {
    return (
        <div>
            <GroupName name={name}></GroupName>
            {items.map((item) => (
                <Item key={item.id} handleSelect={handleSelect} {...item} />
            ))}
            {separator && <Separator />}
        </div>
    );
};

interface DialogSelectCaseTypeProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSelect: (value: string, caseTypeText: CaseTypeText) => void;
}

export const DialogSelectCaseType = ({
    open,
    setOpen,
    onSelect,
}: DialogSelectCaseTypeProps) => {
    const {
        state: { searchText, setSearchText, selectGroup, setSelectGroup },
        data: { group },
        dataFiltered: { group: groupFiltered, childByGroup: childByGroupFiltered, countFiltered },
    } = useCaseType();
    const handleSelect = (value: string, caseTypeText: CaseTypeText = 'Inquiry') => {
        onSelect(value, caseTypeText);
        setOpen(false);
    };

    return (
        <Modal
            isOpen={open}
            title={"Surapong Lertprayapat"}
            onClose={() => setOpen(false)}
            className="w-[25rem] px-0"
            classNameHeader="px-6"
        >
            <div >
                <div className="flex gap-3 px-6">
                    <StatusComplaintLv lv={'1'} />
                    <StatusCustomerFeeling status="Sweetheart" />
                </div>
                <div className="py-3 ">
                    <Separator />
                    <div className="px-3">
                        <SearchFieldInput
                            placeholder="Search New Case"
                            field={{
                                value: searchText,
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value),
                            }}
                            clearABle
                            className="border-0! ring-0! rounded-none outline-none"
                        />
                    </div>
                    <Separator />
                </div>
                <div>
                    <Tabs
                        value={selectGroup}
                        onValueChange={(value) => setSelectGroup(value)}
                    >
                        <TabsList className="w-full bg-white px-6 rounded-0">
                            {['null', ...group].map((g) => (
                                <TabsTrigger
                                    className="h-[3.3rem] cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1]"
                                    value={g}
                                    key={g}
                                >
                                    <Typography variant="body2" className="text-[#667085] font-medium">
                                        {g === 'null' ? 'All' : g}
                                    </Typography>
                                    <Badge className="bg-[#f4f8fb]">
                                        <Typography variant="caption" className="text-[#667085] font-medium">
                                            {(childByGroupFiltered?.[g] || []).length}
                                        </Typography>
                                    </Badge>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Separator />
                        {/* ALL */}
                        <TabsContent value="null">
                            {groupFiltered.map((g, index) => (
                                <Group
                                    key={g}
                                    handleSelect={handleSelect}
                                    items={childByGroupFiltered?.[g] || []}
                                    name={g}
                                    separator={index + 1 !== (groupFiltered).length}

                                />
                            ))}
                        </TabsContent>
                        {/* SELECT */}
                        {groupFiltered.map((g, index) => (
                            <TabsContent key={g} value={g}>
                                <Group
                                    handleSelect={handleSelect}
                                    items={childByGroupFiltered?.[g] || []}
                                    name={g}
                                    key={g}
                                    // separator={index + 1 !== (childByGroupFiltered?.[g] || []).length}
                                    separator={false}
                                />
                                {/* <div>
                                    {(childByGroupFiltered?.[g] || []).length}
                                </div> */}
                            </TabsContent>
                        ))}
                    </Tabs>
                    {/* {JSON.stringify(childByGroupFiltered)} */}
                </div>
            </div>
        </Modal>
    );
};
