import Card from "@/components/common/card";
import { Typography } from "@/components/common/typography";
import { ButtonCancel } from "@/components/common/btn-cancle";
import { Button } from "@/components/ui/button";

export const DialogImportUser = () => {
    return (
        <div className="max-w-[700px] mt-3">
            <Card className="p-6">
                <Typography variant="h5" >
                    Import Users
                </Typography>
                <div className="flex gap-4 items-center">
                    <Typography variant="body1" >
                        Upload File
                    </Typography>
                    <Button variant='link'  >
                        Download Template
                    </Button>
                </div>
                <div className="bg-primary/30 aspect-video my-3">
                    <div>drop</div>
                </div>
                <div className="flex justify-end gap-2">
                    <ButtonCancel />
                    <Button className="btn-primary">Import</Button>
                </div>
            </Card>
        </div>
    );
}