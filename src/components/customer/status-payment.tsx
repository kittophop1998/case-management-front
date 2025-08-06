import { Typography } from "../common/typography"

export const StatusPayment = ({ status }: { status: string }) => {
    return <Typography variant="body2" className="text-[#258a00]">{status}</Typography>

}

