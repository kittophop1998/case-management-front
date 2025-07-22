'use client';
import { X } from 'lucide-react';
import React from 'react';
import { Typography } from './typography';
import Card from './card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen,
  // onClose,
  title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
      <Card className="relative w-full max-w-lg p-6 rounded-lg shadow-xl">
        <div className="flex items-center justify-between">
          <Typography variant="h3" as="h3" className="text-xl font-semibold">
            {title}
          </Typography>
          {/* <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X className="w-6 h-6" />
          </button> */}
        </div>
        <div className="mt-4">{children}</div>
      </Card>
    </div>
  );
};