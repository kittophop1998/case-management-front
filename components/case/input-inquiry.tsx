import { Disposition, DispositionInfo } from "@/features/systemApiSlice";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { PopoverContent } from "../ui/popover";
import { Typography } from "../common/typography";
import { SearchFieldInput } from "../form/search-field";
import { Checkbox } from "../ui/checkbox";
interface InputInquiryProps {
    form: any;
    mainIdName: string;
    subIdName: string;
    mainListName: string;
    subListName: string;
    items: Disposition[];
}

const ConfirmSection = ({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) => {
    return <>
        <div className="p-3 flex items-center justify-end gap-2"
            style={{
                boxShadow: "1px -1px 4px 0px #00000026"
            }}
        >
            <Button onClick={onCancel}
                variant='ghost'
                className="h-[33px] w-[76px]"
            >
                <Typography variant="body2">Cancel</Typography>
            </Button>
            <Button onClick={onConfirm}
                className="h-[33px] w-[76px]">
                <Typography variant="body2">Apply</Typography>
            </Button>
        </div>
    </>
}

const Item = memo(({ className = '', onClick, item, isActive = false }: { className?: string, onClick: (v: string) => void, item: DispositionInfo, isActive: boolean }) => {
    return <div
        onClick={
            onClick
        } className={cn('flex gap-3 p-1 items-center hover:bg-gray-200/30 cursor-pointer'
            // , { 'bg-blue-500': isActive }
            , className)}>
        <Checkbox checked={isActive} />
        <span className="select-none">{item.th}</span>
    </div>
})

type OnClickMain = (item: Disposition) => void;
type OnClickSub = (id: string, item: Disposition) => void;

interface SelectMultipleChildProps {
    items: Disposition[];
    onClickMain: OnClickMain
    onClickSub: OnClickSub
    main: string[] | string | null;
    sub: string[] | string | null;
    sortable?: boolean,
    filterMainId?: string[]
    filterSubId?: string[]
}
const isActive = (value: null | string[] | string, id: string) => {
    if (Array.isArray(value)) {
        return value.includes(id);
    }
    return value === id;
};

export const SelectMultipleChild = memo(({
    items
    , onClickMain
    , onClickSub
    , main
    , sub
    , sortable = false
    , filterMainId
    , filterSubId
}: SelectMultipleChildProps) => {
    const [search, setSearch] = useState("")
    const itemsFiltered = useMemo(() => {
        const value: Disposition[] = []
        for (const item of items) {
            const searchLower = search.toLowerCase()
            const isMatchMain = item.dispositionMain.th.toLowerCase().includes(searchLower) || item.dispositionMain.en.toLowerCase().includes(searchLower)
            if (isMatchMain) {
                value.push(item)
                continue
            }
            const childs: DispositionInfo[] = []
            for (const child of (item?.dispositionSubs || [])) {
                const isMatchChild = child.th.toLowerCase().includes(searchLower) || child.en.toLowerCase().includes(searchLower)
                if (isMatchChild) {
                    childs.push(child)
                }
            }
            if (childs.length) {
                value.push({
                    ...item,
                    dispositionSubs: childs
                })
            }
        }
        return value
    }, [search, items])
    return <>
        <div className="p-3">
            {sortable && (<div className="mb-3">
                <SearchFieldInput
                    placeholder="Search..."
                    field={{
                        value: search,
                        onChange: (e: any) => {
                            setSearch(e?.target?.value || '')
                        }
                    }}
                />
            </div>)}
            <div className=" overflow-y-auto max-h-[30vh]">
                {itemsFiltered.map(item => (
                    <div key={item.dispositionMain.id}>
                        <Item
                            item={item.dispositionMain}
                            onClick={() => onClickMain(item)}
                            isActive={isActive(main, item.dispositionMain.id)} />
                        {
                            (item.dispositionSubs || []).map(subItem => (
                                <Item
                                    className='pl-6'
                                    item={subItem}
                                    onClick={() => onClickSub(subItem.id, item)}
                                    key={subItem.id}
                                    isActive={isActive(sub, subItem.id)}
                                />
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
        {/* {JSON.stringify(items)} */}
    </>
})
export const InputInquiry = ({
    form,
    mainIdName,
    subIdName,
    mainListName,
    subListName,
    items,
}: InputInquiryProps) => {
    const mainListValue = form.watch(mainListName) as string[]
    const subListValue = form.watch(subListName) as string[]
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [draftMainValue, setDraftMainValue] = useState<string[]>(mainListValue)
    const [draftSubValue, setDraftSubValue] = useState<string[]>(subListValue)
    const validateObj = useRef<Record<string, string[]>>({})

    const validateSave = async (): Promise<boolean> => {
        for (const key in validateObj.current) {
            if (!validateObj.current[key].length) {
                alert(`Please select at least one sub-item for every main item.`);
                return false
            }
        }
        console.log(`pass validate`, validateObj.current)
        return true
    }
    const onCancel = () => {
        setPopoverOpen(false);
        setDraftValue(mainListValue);
    }
    const onConfirm = async () => {
        if (await validateSave()) {
            console.log('draftMainValue :', draftMainValue)
            console.log('draftSubValue  :', draftSubValue)
            form.setValue(mainListName, draftMainValue);
            form.setValue(subListName, draftSubValue);
            setPopoverOpen(false)
        }
    }
    const itemsBySelected = useMemo(() => {
        // return items.filter(item => draftMainValue.includes(item.dispositionMain.id))
        let value: Disposition[] = []
        for (const main of items) {

            if (draftMainValue.includes(main.dispositionMain.id)) {
                let mainObj: Disposition = {
                    dispositionMain: {
                        id: main.dispositionMain.id,
                        th: main.dispositionMain.th,
                        en: main.dispositionMain.en,
                    },
                    dispositionSubs: main.dispositionSubs?.filter(sub => draftSubValue.includes(sub.id)) || [],
                }
                value.push(mainObj)
            }
        }
        return value
    }, [items, draftMainValue, draftSubValue])
    // const onClickMain = useCallback((item: Disposition) => {
    //     try {
    //         console.log(`onClickMain.call()`)
    //         const id = item.dispositionMain.id;
    //         if (!draftMainValue.includes(id)) {
    //             setDraftMainValue((v) => [...v, id])
    //             validateObj.current[id] = []
    //         }
    //         else {
    //             console.log(`else`)
    //             setDraftMainValue((v) => v.filter(i => i !== id))
    //             let childIds: string[] = item.dispositionSubs?.map(sub => sub.id) || []
    //             setDraftSubValue((current) => current.filter(childId => !childIds.includes(childId)));
    //             delete validateObj.current[id]
    //         }
    //     } catch (error) {
    //         console.log(`onClickMain error:`, error)
    //     }
    // }, [draftMainValue])
    const onClickMain = useCallback((item: Disposition) => {
        console.log(`onClickMain.call()`)
        try {
            const id = item.dispositionMain.id;
            setDraftMainValue((v) => {
                if (!v.includes(id)) {
                    validateObj.current[id] = []
                    return [...v, id]
                } else {
                    delete validateObj.current[id]

                    let childIds: string[] = item.dispositionSubs?.map(sub => sub.id) || []
                    setDraftSubValue((current) => current.filter(childId => !childIds.includes(childId)))
                    return v.filter(i => i !== id)
                }
            })
        } catch (error) {
            console.log(`onClickMain error:`, error)
        }
    }, [])
    const onClickSub = (childId: string, item: Disposition) => {
        try {
            const mainId = item.dispositionMain.id;
            if (!draftSubValue.includes(childId)) {
                setDraftSubValue((v) => [...v, childId])
                if (!draftMainValue.includes(mainId)) {
                    setDraftMainValue((v) => [...v, mainId])
                    validateObj.current[mainId] = [childId]
                } else {
                    validateObj.current[mainId].push(childId)
                }
            } else {
                setDraftSubValue((v) => v.filter(i => i !== childId))
                validateObj.current[mainId] = validateObj.current[mainId].filter(id => id !== childId)

            }
        } catch (error) {
            console.log(`onClickSub error:`, error)
        }
    }
    const mainList = form.watch(mainListName)
    const subList = form.watch(subListName)
    return (
        <>
            {/* <div>draftMainValue:{JSON.stringify(draftMainValue)}</div> */}
            {/* <div>draftSubValue:{JSON.stringify(draftSubValue)}</div> */}
            <div>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen} >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "justify-between w-full",
                                mainListValue.length === 0 && "text-muted-foreground"
                            )}
                        >
                            Multiple select

                            <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4 shrink-0" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                        <SelectMultipleChild
                            sortable
                            items={items}
                            onClickMain={onClickMain}
                            onClickSub={onClickSub}
                            main={draftMainValue}
                            sub={draftSubValue}
                        />
                        <ConfirmSection
                            onCancel={onCancel}
                            onConfirm={onConfirm}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div>
                <SelectMultipleChild
                    filterMainId={mainList}
                    filterSubId={subList}
                    items={itemsBySelected}
                    onClickMain={() => { }}
                    onClickSub={() => { }}
                    main={[]}
                    sub={[]}
                />
            </div>
        </>)
}