import { Typography } from "../common/typography"

export const StatusPayment = ({ status }: { status: 'On-Time' }) => {
    return <Typography variant="body2" className="text-[#258a00]">{status}</Typography>

}

