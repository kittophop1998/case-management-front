
"use client";
import React, { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { cn } from "@/lib/utils";

type ApiDetails = {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  method: string;
  // Add more fields as needed
};

type DialogApiDetailsProps = {
  open: boolean;
  onClose: () => void;
  apiDetails: ApiDetails | null;
};

export default function DialogApiDetails({ open, onClose, apiDetails }: DialogApiDetailsProps) {
  if (!apiDetails) return null;

  return (
    <Modal
      isOpen={open}
      title="View Log Details"
      className={cn('w-[clamp(300px,80%,608px)]')} //min-h-[400px]
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{apiDetails.name}</h2>
        <p className="mb-4">{apiDetails.description}</p>
        <div className="mb-2">
          <strong>Endpoint:</strong> {apiDetails.endpoint}
        </div>
        {/* Add more fields as needed */}
      </div>
    </Modal>
  );
}