'use client';

import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
// import ModalError from '@/components/common/ModalError';

interface ErrorModalContextType {
  showError: (message: string) => void;
}

const ErrorModalContext = createContext<{ showError: (err: unknown) => void }>({
  showError: () => { },
});

export const ErrorModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const showError = useCallback((err: unknown) => {
    let msg = 'ไม่สามารถดำเนินการได้ในขณะนี้';

    if (
      err &&
      typeof err === 'object' &&
      'data' in err &&
      err.data &&
      typeof err.data === 'object'
    ) {
      msg = (err as any).data?.error?.[0]?.message ?? msg;
    }

    setMessage(msg);
    setIsOpen(true);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      {/* <ModalError isOpen={isOpen} message={message} onClose={handleClose} /> */}
    </ErrorModalContext.Provider>
  );
};

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error('useErrorModal must be used within an ErrorModalProvider');
  }
  return context;
};
