import Card from "@/components/common/card";
import { Typography } from "@/components/common/typography";
import { ButtonCancel } from "@/components/common/btn-cancle";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/common/Modal";

export const DialogImportUser = ({
    open,
    onClose
}) => {
    // const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(true);

    // const handleCloseModalDelete = () => {
    //     setIsModalDeleteOpen(false);
    // };
    return (
        <Modal
            isOpen={open}
            title={'Import User'}
        >
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
                <ButtonCancel onClick={onClose} />
                <Button className="btn-primary">Import</Button>
            </div>
        </Modal>
    );
}