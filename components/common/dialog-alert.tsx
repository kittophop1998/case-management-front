'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import * as ReactDOM from 'react-dom/client'
import { ButtonCancel } from '../button/btn-cancle'
import { Button } from '../ui/button'
import { Form, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConfirmPasswordSchemas } from '@/schemas'
import z from 'zod'
import { PasswordField } from '@/components/form/password-field'
import Lock from '@/public/icons/Lock.svg'
import { FormError } from '@/components/form/form-error'
import { FormProvider } from 'react-hook-form'
import { Typography } from './typography'
import { CircleCheck, CircleX } from 'lucide-react'

const ConfigDialog = {}

interface DialogAlertProps {
    isSuccess: boolean;
    config: {
        title: string;
        message: string;
        confirmText: string; //for next action
        cancelText: string; //for close dialog
        onConfirm: () => void; //for next action
        onCancel: () => void; //for close dialog
    }
}
export function dialogAlert(isSuccess = true, config: DialogAlertProps['config'] | null = null): Promise<string | DialogAlertProps> {
    if (!config) {
        console.log('No config provided')
        if (isSuccess) {
            config = {
                title: 'Success',
                message: 'Some task has completed!',
                confirmText: 'Done',
                cancelText: 'Close',
                onConfirm: () => { },
                onCancel: () => { }
            }
        } else {
            config = {
                title: 'Error',
                message: 'Some error occurred!',
                confirmText: 'Try again',
                cancelText: 'Close',
                onConfirm: () => { },
                onCancel: () => { }
            }
        }

    }
    return new Promise((resolve) => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const root = ReactDOM.createRoot(container)
        const Modal = () => {
            // const [password, setPassword] = useState('')
            // const [error, setError] = useState('')
            const form = useForm<z.infer<typeof ConfirmPasswordSchemas>>({
                resolver: zodResolver(ConfirmPasswordSchemas),
                defaultValues: {
                    password: ''
                }
            })
            const cleanup = () => {
                resolve('')
                setTimeout(() => {
                    root.unmount()
                    container.remove()
                }, 0)
            }
            const handleConfirm = async (value: z.infer<typeof ConfirmPasswordSchemas>) => {
                // const res = await fetch('/api/check-password', {
                //     method: 'POST',
                //     body: JSON.stringify({ password }),
                //     headers: { 'Content-Type': 'application/json' },
                // })

                // const data = await res.json()

                // if (!res.ok) return setError(data.message || 'Wrong password')
                resolve(value.password)
                setTimeout(() => {
                    root.unmount()
                    container.remove()
                }, 0)
            }

            return (
                <div className="fixed inset-0 bg-[#A3A3A333]/20 backdrop-blur-xs flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow w-80">
                        <div className='flex gap-3'>
                            <div>
                                {/* TODO:SET COLOR */}
                                {isSuccess ? <CircleCheck color='#22c55e' /> : <CircleX color='red' />}
                            </div>
                            <div>
                                <Typography className='mb-2'>{config.title}</Typography>
                                <Typography variant='caption' className='mb-4'>{config.message}</Typography>
                            </div>
                        </div>
                        {/* TODO:SET COLOR */}
                        <div className='flex justify-end'>
                            {isSuccess ?
                                <Button className='bg-[#22c55e] text-white' onClick={cleanup}>{config.cancelText}</Button>
                                :
                                <Button onClick={cleanup} className='bg-red-500'>{config.cancelText}</Button>}
                        </div>
                    </div>
                </div>
            )
        }

        root.render(<Modal />)
    })
}
