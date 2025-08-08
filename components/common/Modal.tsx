'use client'
import { X } from 'lucide-react'
import React from 'react'
import { Typography } from './typography'
import Card from './card'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void;
  title: string
  children: React.ReactNode
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  if (!isOpen) return null

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#A3A3A333]/20 backdrop-blur-xs'>
        {/* <div className='fixed inset-0 w-screen h-screen  bg-[#A3A3A333]'>1asdasd</div> */}
        <Card
          className={cn(
            'relative w-full max-w-lg p-6 rounded-lg shadow-xl',
            className
          )}
        >
          <div className='flex items-center justify-between'>
            <Typography variant='h4' as='h4' >
              {title}
            </Typography>
            {
              onClose && (
                <button onClick={onClose} className="p-1 hover:bg-[#fff1f0] rounded-md">
                  {/* @ts-expect-error className is valid for lucide icon */}
                  <X className="w-6 h-6" />
                </button>
              )
            }
          </div>
          <div className='mt-4'>{children}</div>
        </Card>
      </div>
    </>
  )
}
