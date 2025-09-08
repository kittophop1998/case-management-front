'use client'
import * as ReactDOM from 'react-dom/client'
import { ButtonCancel } from '../button/btn-cancle'
import { Button } from '../ui/button'
import { Typography } from './typography'
export function myConfirm({ text, title }: { text: string, title: string }): Promise<string | null> {
    return new Promise((resolve) => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const root = ReactDOM.createRoot(container)
        const Modal = () => {
            let isLoading = false
            const cleanup = () => {
                setTimeout(() => {
                    root.unmount()
                    container.remove()
                }, 0)
            }
            const handleConfirm = async () => {
                if (isLoading) {
                    console.log('loading')
                    return
                }
                isLoading = true
                resolve(true)
                cleanup()
                isLoading = false
            }
            const handleCancel = async () => {
                if (isLoading) {
                    console.log('loading')
                    return
                }
                isLoading = true
                resolve(false)
                cleanup()
                isLoading = false
            }
            return (
                <div className="fixed inset-0 bg-[#A3A3A333]/20 backdrop-blur-xs flex items-center justify-center z-50"

                    style={{
                        boxShadow: `0px 4px 32px 0px #3D467014`
                    }}
                >
                    <div className="bg-white p-6 rounded-lg shadow w-[clamp(26.063rem,100%,300px)] space-y-3">
                        <Typography >{title}</Typography>
                        <Typography variant='caption'>{text}</Typography>
                        <div className='mt-3 flex gap-3'>
                            <Button
                                className='w-[7.5rem]'
                                onClick={handleConfirm}
                            >
                                Confirm
                            </Button>
                            <ButtonCancel
                                onClick={handleCancel}
                                className='w-[7.5rem]'
                            />

                        </div>
                    </div>
                </div>
            )
        }

        root.render(<Modal />)
    })
}




// import { useState } from 'react'
// import { Form, useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { ConfirmPasswordSchemas } from '@/schemas'
// import z from 'zod'
// import { PasswordField } from '@/components/form/password-field'
// import Lock from '@/public/icons/Lock.svg'
// import { FormError } from '@/components/form/form-error'
// import { FormProvider } from 'react-hook-form'
// import { dialogAlert } from './dialog-alert'