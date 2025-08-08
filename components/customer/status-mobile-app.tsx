import { Typography } from "../common/typography"

export const StatusMobileApp = ({ status }: { status: string }) => {
    return <Typography variant="body2" className="text-[#258a00]">{status}</Typography>
}