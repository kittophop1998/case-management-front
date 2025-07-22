'use client';
import { Typography } from "@/components/common/typography";
import { FormUserDetails } from "./form-user-details";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { UserType } from "@/types/user";
import { UserSchemas } from "@/schemas";
import z from "zod";

export type DialogDetailsRef = {
    handleOpenModal: (user: UserType | null) => void;
};
export const DialogDetails = forwardRef<DialogDetailsRef>((props, ref) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const handleCloseModalDelete = () => {
        setIsModalDeleteOpen(false);
    };
    useImperativeHandle(ref, () => ({
        handleOpenModal: (user) => {
            if (user) {
                setMode('edit');
                setUser(user);
            } else {
                setUser(null);
                setMode('create');
            }
            setIsModalDeleteOpen(true);
        },
    }));
    const getUserDetails = async (uID: number): Promise<z.infer<typeof UserSchemas>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    uID: uID,
                    agentID: 'agentID123',
                    name: `John Doe ${uID}`,
                    email: "john.doe@example.com",
                    role: "User",
                    team: "Team A",
                    center: "BKK",
                    status: "Active",
                });
            }, 3000);
        });
    };
    return (
        <Modal
            isOpen={isModalDeleteOpen}
            onClose={handleCloseModalDelete}
            title={mode === 'create' ? 'Add Individual User' : 'Select Update'}
        >
            <Typography variant="body2" className="mb-4">
                {mode === 'create' ? 'Agent Information' : user?.name}
            </Typography>
            <FormUserDetails
                mode={mode}
                uID={user?.id ?? null}
                getUserDetails={getUserDetails}
            />
        </Modal>
    );
});
