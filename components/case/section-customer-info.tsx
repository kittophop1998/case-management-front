import { CustomerResApiInfo } from "@/types/customer.type"
import { Typography } from "../common/typography"
import { SectionCard } from "./section-card"

export const CustomerInfo = ({ customerInfo, customerId, isSmallMod }: { customerInfo: CustomerResApiInfo, customerId: string, isSmallMod: boolean }) => {
    return <SectionCard title="Customer Info" isAccordion={!!isSmallMod}>
        <div className="space-y-3 pt-2">
            <Typography variant="caption">Customer ID/Passport :  {customerInfo?.nationalId}</Typography>
            <Typography variant="caption">Customer Name: {customerInfo?.customerNameEng}</Typography>
            <Typography variant="caption">Aeon ID: {customerId}</Typography>
            <Typography variant="caption">Mobile No.: {customerInfo?.mobileNO}</Typography>
        </div>
    </SectionCard>
}