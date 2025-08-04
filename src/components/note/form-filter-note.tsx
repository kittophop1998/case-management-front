import { FormProvider } from "react-hook-form";

export const FormFilterNote = ({ form }: {
    form: any;
}) => {
    return (
        <FormProvider {...form}>
        </FormProvider>
    );
}