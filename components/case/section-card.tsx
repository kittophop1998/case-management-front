import Card from "@/components/common/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ReactNode, useState } from "react";

interface SectionCardProps { title: string, children: ReactNode, isAccordion: boolean }

export const SectionCard = ({ title, children, isAccordion }: SectionCardProps) => {
    const [isOpen, setIsOpen] = useState(true);
    if (isAccordion) {
        return (
            <Card className="rounded-none shadow-none p-3">
                <Accordion type="single" collapsible className="" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='p-0 m-0'>{title}</AccordionTrigger>
                        <AccordionContent className="mt-2 text-gray-600">
                            {children}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        );
    } else {
        return (
            <>
                <div className="p-3">
                    <div >
                        {title}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                <Separator />
            </>)

    }

}