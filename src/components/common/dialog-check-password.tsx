'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import * as ReactDOM from 'react-dom/client'

export function checkPassword(): Promise<string | null> {
    return new Promise((resolve) => {
        const container = document.createElement('div')
        document.body.appendChild(container)

        const root = ReactDOM.createRoot(container)

        const Modal = () => {
            const [password, setPassword] = useState('')
            const [error, setError] = useState('')

            const cleanup = () => {
                resolve(null)
                setTimeout(() => {
                    root.unmount()
                    container.remove()
                }, 0)
            }

            const handleConfirm = async () => {
                // const res = await fetch('/api/check-password', {
                //     method: 'POST',
                //     body: JSON.stringify({ password }),
                //     headers: { 'Content-Type': 'application/json' },
                // })

                // const data = await res.json()

                // if (!res.ok) return setError(data.message || 'Wrong password')
                resolve(password)
                setTimeout(() => {
                    root.unmount()
                    container.remove()
                }, 0)


            }

            return (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow w-80">
                        <h2 className="font-bold text-lg mb-2">Confirm Password</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="border w-full p-2 mb-2"
                        />
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        <div className="flex justify-end space-x-2">
                            <button onClick={cleanup}>Cancel</button>
                            <button
                                onClick={handleConfirm}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        root.render(<Modal />)
    })
}
