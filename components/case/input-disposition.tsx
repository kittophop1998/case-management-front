// @ts-nocheck
"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { Typography } from "../common/typography"

const data = [
    {
        name: "m1",
        sub: [
            { name: "1.s1" },
            { name: "1.s2" },
        ],
    },
    {
        name: "m2",
        sub: [
            { name: "2.s1" },
            { name: "2.s2" },
            { name: "2.s3" },
        ],
    },
]

type SelectedValue = {
    main: string[]
    sub: string[]
    mainSelect: string | null,
    subSelect: string | null,
}

interface ControlItemsProps {
    toggleMain: () => void
    toggleSub: () => void
    sub: string[] | string | null
    main: string[] | string | null
    mode: 'one' | 'many'
    filterListMain?: string[]
    filterListSub?: string[]
}
export function ControlItems({
    toggleMain,
    toggleSub,
    sub,
    main,
    mode,
    filterListMain,
    filterListSub
}: ControlItemsProps) {
    const [search, setSearch] = React.useState("")
    const filteredData = data
        .map((group) => {
            if (!!filterListMain && !filterListMain.includes(group.name)) {
                return
            }
            const matchParent = group.name
                .toLowerCase()
                .includes(search.toLowerCase())

            const matchedSubs = group.sub.filter((s) => {
                if (!!filterListSub && !filterListSub.includes(s.name)) {
                    return false
                }
                if (!search) {
                    return true
                }
                return s.name.toLowerCase().includes(search.toLowerCase())
            }
            )
            if (matchParent || matchedSubs.length > 0 || search === "") {
                return {
                    ...group,
                    // sub: search ? matchedSubs : group.sub,
                    sub: matchedSubs
                }
            }
            return null
        })
        .filter(Boolean)
    return (
        <>
            <div>
                <div>
                    {JSON.stringify(filterListMain)}
                </div>
                <div>
                    {JSON.stringify(filterListSub)}
                </div>
            </div>
            <Command shouldFilter={false}>
                <CommandInput
                    placeholder="Search..."
                    value={search}
                    onValueChange={setSearch}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    {filteredData.map((group) => (
                        <CommandGroup key={group!.name} >
                            <CommandItem
                                key={group!.name}
                                value={group!.name}
                                onSelect={() => toggleMain(group!.name)}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        (mode === 'many' ? main.includes(group!.name) : main === group!.name)
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {group!.name}
                            </CommandItem>
                            {group!.sub.map((item) => (
                                <CommandItem
                                    key={item.name}
                                    value={item.name}
                                    onSelect={() => toggleSub(item.name)}
                                    className="pl-6"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            (mode === 'many' ? sub.includes(item.name) : sub === item.name)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
                </CommandList>
            </Command>
        </>)
}

export function SelectMulti({
    value,
    setValue,
}) {
    const [open, setOpen] = React.useState(false)


    const toggleMain = (main: string) => {
        setValue((prev) => ({
            ...prev,
            main: prev.main.includes(main)
                ? prev.main.filter((m) => m !== main)
                : [...prev.main, main],
        }))
    }
    const toggleSub = (sub: string) => {
        setValue((prev) => ({
            ...prev,
            sub: prev.sub.includes(sub)
                ? prev.sub.filter((s) => s !== sub)
                : [...prev.sub, sub],
        }))
    }

    const displayText =
        value.main.length === 0 && value.sub.length === 0
            ? "Multiple select" : 'Multiple select'
    // : [...value.main, ...value.sub].join(", ")
    // 🔎 Filter logic: keep group if parent or any child matches

    const save = () => {
        setOpen(false)
    }
    const close = () => {
        setOpen(false)
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                >
                    {displayText}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <div className="p-2">
                    <Typography variant='body2'>Search Disposition code</Typography>
                    <ControlItems
                        mode='many'
                        toggleMain={toggleMain}
                        toggleSub={toggleSub}
                        sub={value.sub}
                        main={value.main}
                    />
                </div>
                <div>
                    <div className="flex justify-end gap-3 border-t p-1">
                        <Button variant='ghost' type="button" onClick={close}>Cancel</Button>
                        <Button type="button" onClick={save}>Apply</Button>
                    </div>
                </div>

            </PopoverContent>
        </Popover>
    )
}

export function FormTest() {
    const [value, setValue] = React.useState<SelectedValue>({
        main: [],
        sub: [],
        mainSelect: null,
        subSelect: null,
    })
    const toggleMain = () => { }
    const toggleSub = () => { }
    return (
        <div className="space-y-3 w-[300px] mx-auto">
            <SelectMulti value={value} setValue={setValue} />
            <ControlItems
                mode='one'
                sub={value.subSelect}
                main={value.mainSelect}
                toggleMain={toggleMain}
                toggleSub={toggleSub}
                filterListMain={value.main}
                filterListSub={value.sub}
            />
            {JSON.stringify(value)}
        </div>
    )
}