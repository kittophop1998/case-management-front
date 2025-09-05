'use client'
import { X } from 'lucide-react'
import React from 'react'
import { Typography } from './typography'
import Card from './card'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void;
  title: string
  children: React.ReactNode
  className?: string
  classNameHeader?: string
  separator?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  classNameHeader,
  separator = false
}) => {
  if (!isOpen) return null

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#A3A3A3]/20 backdrop-blur-xs'>
        <Card
          className={cn(
            'relative w-full p-6 rounded-lg shadow-xl',
            className
          )}
        >
          <div className={cn('flex items-center justify-between', classNameHeader)}>
            <Typography variant='h4' as='h4' >
              {title}
            </Typography>
            {
              onClose && (
                <button onClick={onClose} className="p-1 hover:bg-[#fff1f0] bg-[#fff1f0] cursor-pointer rounded-md">
                  {/* @ts-expect-error className is valid for lucide icon */}
                  <X className="w-6 h-6" />
                </button>
              )
            }
          </div>
          {separator && <Separator className="my-4" />}
          <div className='mt-2'>{children}</div>
        </Card>
      </div>
    </>
  )
}
