import { api } from "@/services/api";

interface InputHiddenProps {
    name: string;
    field: any;
    multiple?: boolean;
    index?: number | null;
    accept?: string;
}

const onTriggerClick = (name: string) => {
    const input = document.querySelector(`#${name}`) as HTMLInputElement;
    if (input) {
        input.click();
    }
};

const onChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: {
    onChange: (value: any) => void;
    value: any;
}, {
    multiple = false,
    index = null
}: {
    multiple?: boolean;
    index?: number | null;
}) => {
    try {
        const files = e.target.files;
        if (!files) {
            return;
        }
        const file = files[0];
        const formdata = new FormData();
        formdata.append("file", file);
        let apiResponse = await api<
            {
                filename: string;
                url: string;
            }
        >('/upload', {
            method: "POST",
            body: formdata
        });

        console.log("API Response:", apiResponse);

        const formatData = {
            filename: apiResponse?.filename || "",
            url: apiResponse?.url || ""
        }
        console.log("Formatted Data:", formatData);
        if (file) {
            if (multiple) {
                // const fileArray = Array.from(files);
                if (index !== null) {
                    // const newValue = field.value
                    // newValue[index] = fileArray[0];
                    // field.onChange(
                    //     newValue
                    // )
                    field.onChange(
                        formatData
                    )
                } else {
                    // field.onChange([...field.value, fileArray[0]]);
                    field.onChange([...field.value, formatData]);
                }
            } else {
                // field.onChange(files[0]);
                field.onChange(formatData);
            }
        }
        e.target.value = "";
    } catch (error) {
        console.log("Error uploading file:", error);

    }
};


const InputHidden = ({ name, field, multiple = false, index = null, accept }: InputHiddenProps) => {
    return <input
        hidden
        id={name}
        type="file"
        accept={accept}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => onChangeUpload(e, field, {
            multiple,
            index
        })}
    />;
}
export { InputHidden, onTriggerClick };