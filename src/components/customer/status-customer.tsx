import { Typography } from "../common/typography"

export const StatusCustomer = ({ status }: {
    status: string
}) => {
    // TODO color
    return <Typography variant="body2" className="text-[#258a00]">{status}</Typography>
}