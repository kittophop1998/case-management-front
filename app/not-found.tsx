'use client'
import { redirect } from 'next/navigation'
export default function NotFound() {
  console.log('NotFound.tsx redirect to /login')
  redirect(`/th/login`)
}
