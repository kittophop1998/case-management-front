import React from "react";
import { Controller, Control, FieldErrors, UseFormRegister } from "react-hook-form";

type CheckboxProps = {
    name: string;
    label?: React.ReactNode;
    // Controlled mode
    checked?: boolean;
    onChange?: (checked: boolean) => void;

    // Uncontrolled simple mode
    defaultChecked?: boolean;
    disabled?: boolean;

    // React Hook Form integration (either register OR control)
    register?: UseFormRegister<any>;
    control?: Control<any>;
    errors?: FieldErrors; // pass formState.errors if you want inline error lookup

    // optional id/class
    id?: string;
    className?: string;
};

export function Checkbox({
    name,
    label,
    checked,
    onChange,
    defaultChecked,
    disabled = false,
    register,
    control,
    errors,
    id,
    className = "",
}: CheckboxProps) {
    // helper to get error message if errors prop supplied
    const errorMessage =
        errors && name.split(".").reduce((acc: any, key) => (acc ? acc[key] : undefined), errors);

    // If control is provided, use Controller to integrate with RHF
    if (control) {
        return (
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
                        <input
                            id={id ?? name}
                            type="checkbox"
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            disabled={disabled}
                            className="form-checkbox h-4 w-4 "
                        />
                        {label && <span>{label}</span>}
                        {errorMessage && typeof errorMessage === "object" && "message" in errorMessage && (
                            <span className="text-sm text-red-600 ml-2">{(errorMessage as any).message}</span>
                        )}
                    </label>
                )}
            />
        );
    }

    // If register is provided (RHF uncontrolled), use it
    if (register) {
        return (
            <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
                <input
                    id={id ?? name}
                    type="checkbox"
                    defaultChecked={defaultChecked}
                    {...register(name)}
                    disabled={disabled}
                    className="form-checkbox h-4 w-4"
                />
                {label && <span>{label}</span>}
                {errorMessage && typeof errorMessage === "object" && "message" in errorMessage && (
                    <span className="text-sm text-red-600 ml-2">{(errorMessage as any).message}</span>
                )}
            </label>
        );
    }

    // Controlled or simple uncontrolled fallback
    return (
        <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
            <input
                id={id ?? name}
                type="checkbox"
                checked={typeof checked === "boolean" ? checked : undefined}
                defaultChecked={defaultChecked}
                onChange={(e) => onChange?.(e.target.checked)}
                disabled={disabled}
                className="form-checkbox h-4 w-4"
            />
            {label && <span>{label}</span>}
        </label>
    );
}
