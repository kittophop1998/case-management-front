import { File } from "lucide-react";
import {
    FormField,
    FormItem,
    FormLabel, FormDescription, FormMessage,
    FormControl
} from "@/components/ui/form";
import { InputHidden, onTriggerClick } from "./hidden-input";
import { DefaultDeleteButton } from "./default-remove-item";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";

type FileType = {
    name: string;
    value: string;
}

interface FileFieldProps {
    name: string;
    label: string;
    form: any;
    readonly?: boolean;
    placeholder?: string;
}


async function downloadURI(path = 'http://localhost:5003/files/dummy.pdf', isPreview = false) {
    if (!path) return;
    const response = await api(path, { responseType: 'arraybuffer' })
    var file = new Blob([response.data], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);

    if (isPreview) {
        window.open(fileURL);
    } else {
        window.open(fileURL, '_blank');
    }
}
const FileField = ({ readonly, label, name, form,placeholder
}: FileFieldProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-2 " >
                            <InputHidden
                                accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .ppt, .pptx"
                                name={name}
                                field={field}
                            />
                            <div className="flex gap-2 cursor-pointer" onClick={() => onTriggerClick(name)}>
                                <File />
                                <p>
                                    {field?.value?.filename || 'No file selected'}
                                </p>
                            </div>

                            {(!!field?.value?.filename) && (
                                <DefaultDeleteButton onClick={() => field.onChange({
                                    filename: "",
                                    url: ""
                                })} />
                            )}
                            {/* {(!!field?.value?.filename) && ( */}
                            <Button
                                variant="outline"
                                size="sm"
                                // onClick={() => downloadURI(field.value.url, field.value.filename)}
                                onClick={() => downloadURI(undefined, field.value.filename)}
                            >
                                Download
                            </Button>
                            {/* )} */}
                        </div>
                    </FormControl>
                    <FormDescription>
                        Upload supporting documents (PDF, DOC, DOCX, TXT - Max 3 files, 5MB each)
                    </FormDescription>
                    <FormMessage />
                </FormItem>)
            }
        />
    );
}
export { FileField }