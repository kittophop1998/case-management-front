import { useEffect } from "react";

export function useDebugLogForm({ form }: { form: any }) {
  useEffect(() => {
    console.log("All errors:", form.formState.errors);
    console.log("All errors:", form.getValues());
  }, [form.formState.errors]);
}
