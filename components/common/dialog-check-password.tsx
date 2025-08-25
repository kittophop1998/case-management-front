'use client'
import { useState } from 'react'
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
import { dialogAlert } from './dialog-alert'
import { Typography } from './typography'

export function checkPassword(): Promise<string | null> {
    return new Promise((resolve) => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const root = ReactDOM.createRoot(container)
        const Modal = () => {
            // const [password, setPassword] = useState('')
            const [error, setError] = useState('')
            const form = useForm<z.infer<typeof ConfirmPasswordSchemas>>({
                resolver: zodResolver(ConfirmPasswordSchemas),
                defaultValues: {
                    password: ''
                }
            })
            const cleanup = () => {
                resolve(null)
                setTimeout(() => {
                    root.unmount()
                    container.remove()
                }, 0)
            }
            let isLoading = false
            const handleConfirm = async (value: z.infer<typeof ConfirmPasswordSchemas>) => {
                if (isLoading) {
                    console.log('loading')
                    return
                }
                // const res = await fetch('/api/check-password', {
                //     method: 'POST',
                //     body: JSON.stringify({ password }),
                //     headers: { 'Content-Type': 'application/json' },
                // })

                // const data = await res.json()

                // if (!res.ok) return    setError(data.message || 'Wrong password')
                isLoading = true
                console.log('!!!!!!1')
                if (value.password === 'admin') {
                    // 
                    resolve(value.password)
                    setTimeout(() => {
                        root.unmount()
                        container.remove()
                    }, 0)
                    // 
                } else {
                    await dialogAlert(false,
                        {
                            title: 'Invalid Password',
                            message: 'The password you entered is incorrect.',
                            confirmText: 'Try again',
                            cancelText: 'Try again',
                            onConfirm: () => { },
                            onCancel: () => { }
                        }
                    )
                }
                console.log('!!!!!!2')
                isLoading = false



            }

            return (
                <div className="fixed inset-0 bg-[#A3A3A333]/20 backdrop-blur-xs flex items-center justify-center z-50"

                    style={{
                        boxShadow: `0px 4px 32px 0px #3D467014`

                    }}
                >
                    <div className="bg-white p-6 rounded-lg shadow w-[clamp(26.063rem,100%,300px)]">
                        {/* <h2 className="font-bold text-lg mb-2">Confirm Password</h2> */}
                        <Typography variant='h6'>Confirm Password</Typography>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(handleConfirm)} className='space-y-4 mt-4'>
                                <PasswordField
                                    prependInnerIcon={<Lock />}
                                    // loading={isPending}
                                    form={form}
                                    name='password'
                                    label='Enter Password'
                                    placeholder='Password'
                                />
                                {/* <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="border w-full p-2 mb-2"
                                /> */}
                                <FormError message={error} />
                                <div className="flex justify-end gap-4">
                                    {/* <button onClick={cleanup}>Cancel</button> */}
                                    <ButtonCancel
                                        onClick={cleanup}
                                    />
                                    <Button>
                                        Confirm
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>

                    </div>
                </div>
            )
        }

        root.render(<Modal />)
    })
}
