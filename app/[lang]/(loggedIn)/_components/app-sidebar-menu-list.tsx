'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Collapsible } from '@/components/ui/collapsible'
import { Typography } from '@/components/common/typography'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

import {
  navMain,
  path2sidebar
} from '@/const/title-path'

import { useGetMeQuery } from '@/features/authApiSlice'

// import CaseManagementIcon from '@/public/icons/Case Management.svg'
// import SearchCustomerIcon from '@/public/icons/SearchCustomer.svg'
// import ReportIcon from '@/public/icons/Report.svg'
// import SettingIcon from '@/public/icons/Setting.svg'
// import UserManagementIcon from '@/public/icons/UserManagement2.svg'
// import AccessControlIcon from '@/public/icons/AccessControl.svg'
// import QueueIcon from '@/public/icons/Queue2.svg'
// import InquiryLogIcon from '@/public/icons/Inquiry Log.svg'
// import CustomerDashboardIcon from '@/public/icons/Customer Dashboard.svg'

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------

const sidebarMenuButtonVariants = cva('', {
  variants: {
    active: {
      false: 'hover:bg-primary/15 active:bg-primary/25',
      true: 'bg-[#7461cf] active:bg-[#7461cf]/95 active:text-white text-white hover:bg-[#7461cf]/90 hover:text-white',
    },
  },
})

const sidebarMenuIconVariants = cva('', {
  variants: {
    active: {
      false: 'stroke-[#555e67] hover:stroke-[#555e67]/90',
      true: 'stroke-white hover:stroke-white/90',
    },
  },
})

const UserManagementIcon = ({ isActive = false }) => {
  if (isActive) {
    return <>
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.34933 11.8574C3.38553 11.8574 0 12.4697 0 14.9171C0 17.3663 3.364 17.9997 7.34933 17.9997C11.3131 17.9997 14.6987 17.3874 14.6987 14.9401C14.6987 12.4908 11.3347 11.8574 7.34933 11.8574Z" fill="white" />
        <path opacity="0.4" d="M7.34935 9.52482C10.049 9.52482 12.2124 7.40617 12.2124 4.76241C12.2124 2.11865 10.049 0 7.34935 0C4.65072 0 2.48633 2.11865 2.48633 4.76241C2.48633 7.40617 4.65072 9.52482 7.34935 9.52482Z" fill="white" />
        <path opacity="0.4" d="M14.1735 4.84922C14.1735 6.19553 13.7606 7.45178 13.0365 8.49529C12.9612 8.60261 13.0277 8.74731 13.1588 8.7703C13.3408 8.80001 13.5277 8.81821 13.7185 8.82205C15.6168 8.87092 17.3203 7.67409 17.791 5.87165C18.4886 3.19723 16.4416 0.795898 13.834 0.795898C13.5512 0.795898 13.2802 0.824645 13.016 0.877348C12.9798 0.885014 12.9406 0.902262 12.9211 0.932926C12.8956 0.972213 12.9142 1.023 12.9397 1.05654C13.7234 2.13263 14.1735 3.44253 14.1735 4.84922Z" fill="white" />
        <path d="M19.7792 12.1697C19.4318 11.4444 18.5933 10.947 17.3174 10.7027C16.7156 10.559 15.0854 10.3548 13.5698 10.3836C13.5473 10.3865 13.5346 10.4018 13.5326 10.4114C13.5297 10.4267 13.5365 10.4497 13.5659 10.466C14.2665 10.8052 16.9739 12.2809 16.6334 15.3932C16.6187 15.5293 16.7293 15.6443 16.8673 15.6251C17.5336 15.5322 19.2479 15.1709 19.7792 14.0479C20.0737 13.4538 20.0737 12.7638 19.7792 12.1697Z" fill="white" />
      </svg>

    </>
  }
  return <>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.17676 11.9375C10.0628 11.9375 11.9207 12.417 13.3115 13.3457H13.3125C14.5892 14.1968 15.2393 15.3165 15.2393 16.4805C15.2391 17.6466 14.5964 18.7744 13.3125 19.6338C11.9109 20.5682 10.0525 21.0498 8.16992 21.0498C6.28628 21.0498 4.41877 20.5679 3.02832 19.6348L3.02539 19.6328C1.74174 18.7831 1.09961 17.6654 1.09961 16.5C1.09961 15.3338 1.74261 14.2061 3.02637 13.3467C4.42784 12.4171 6.29097 11.9376 8.17676 11.9375ZM8.16992 12.4453C6.42446 12.4453 4.64891 12.877 3.30273 13.7744C2.25469 14.4731 1.5997 15.4295 1.59961 16.5098C1.59961 17.5822 2.26656 18.5379 3.30078 19.2246V19.2256C4.64713 20.1286 6.42386 20.5625 8.16992 20.5625C9.91581 20.5624 11.6918 20.1284 13.0381 19.2256L13.0371 19.2246C14.0847 18.526 14.7392 17.5702 14.7393 16.4902C14.7393 15.4169 14.0718 14.4603 13.0361 13.7734H13.0352C11.6892 12.8767 9.91469 12.4454 8.16992 12.4453ZM17.4414 12.7471V12.748C18.2387 12.9242 18.9199 13.2364 19.4648 13.6562L19.4688 13.6592C20.2907 14.2778 20.7295 15.1279 20.7295 15.9902C20.7294 16.8493 20.2834 17.7014 19.4561 18.333L19.4531 18.335C18.8994 18.7636 18.1922 19.0831 17.4023 19.2393L17.3711 19.2461L17.3594 19.25H17.3398C17.2505 19.25 17.1734 19.2059 17.1309 19.1348L17.1006 19.0547L17.0957 19.002C17.0957 18.8807 17.178 18.7744 17.2988 18.7471C17.9868 18.604 18.6377 18.3281 19.1562 17.9248L19.1553 17.9238C19.8112 17.427 20.2294 16.7552 20.2295 15.9902C20.2295 15.2245 19.8109 14.5483 19.1592 14.0596H19.1582C18.6495 13.6684 18.0313 13.4045 17.332 13.2432L17.3291 13.2422C17.197 13.2123 17.1084 13.0785 17.1377 12.9395C17.1677 12.807 17.3021 12.7172 17.4414 12.7471ZM15.4092 2.75C17.473 2.75 19.1592 4.43614 19.1592 6.5C19.1592 8.52771 17.5769 10.1657 15.5576 10.249L15.5068 10.2324L15.4014 10.2422C15.3263 10.2495 15.2397 10.2257 15.1719 10.1758C15.1061 10.1272 15.0812 10.0729 15.0771 10.0312C15.0683 9.94025 15.0933 9.86833 15.126 9.82324C15.1546 9.78386 15.1942 9.75603 15.252 9.74707C15.345 9.73994 15.45 9.74023 15.5596 9.74023H15.5732L15.5869 9.73926C17.3119 9.64474 18.6591 8.2257 18.6592 6.49023C18.6592 4.69409 17.2053 3.24023 15.4092 3.24023H15.3975C15.2755 3.24321 15.1592 3.13635 15.1592 3C15.1592 2.86629 15.2755 2.75025 15.4092 2.75ZM8 0.75C10.5029 0.750206 12.5576 2.72669 12.6836 5.19922L12.6895 5.44043C12.6793 7.98327 10.6908 10.0387 8.17383 10.1201H8.1123C8.04293 10.1118 7.97199 10.1138 7.90527 10.1191C5.27727 10.0326 3.30979 7.9739 3.30957 5.44043C3.30957 2.85657 5.41614 0.75 8 0.75ZM8 1.25C5.69386 1.25 3.80957 3.13429 3.80957 5.44043C3.80979 7.70971 5.58316 9.54055 7.8418 9.62012L7.89258 9.62109L7.94141 9.61328C7.93151 9.61491 7.93107 9.61401 7.94434 9.61328C7.95576 9.61265 7.97216 9.61231 7.99316 9.6123C8.0357 9.6123 8.08842 9.61407 8.1416 9.61816L8.17188 9.62109L8.20215 9.61914C10.4307 9.51681 12.1781 7.68606 12.1895 5.44238V5.44043C12.1895 3.13442 10.306 1.25021 8 1.25Z" fill="#292D32" stroke="#555E67" />
    </svg>
  </>
}
const SearchCustomerIcon = ({ isActive = false }) => {
  if (isActive) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="8.59922" cy="8.65324" rx="8.59922" ry="8.65324" fill="white" />
        <path opacity="0.4" d="M18.6745 19.9555C18.3405 19.9447 18.0228 19.8073 17.7853 19.5707L15.7488 17.1904C15.3122 16.7912 15.2765 16.1126 15.6688 15.6692C15.8524 15.4834 16.102 15.3789 16.3624 15.3789C16.6228 15.3789 16.8725 15.4834 17.0561 15.6692L19.6172 17.7184C19.9861 18.096 20.0999 18.6565 19.9078 19.1495C19.7157 19.6424 19.2535 19.9757 18.7279 20.0003L18.6745 19.9555Z" fill="white" />
      </svg>

    )
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#555E67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.9999 21.0004L16.6499 16.6504" stroke="#555E67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}
const AccessControlIcon = ({ isActive = false }) => {
  if (isActive) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.3345 0H5.66549C2.27649 0 0.000488281 2.378 0.000488281 5.917V14.084C0.000488281 17.622 2.27649 20 5.66549 20H14.3335C17.7225 20 20.0005 17.622 20.0005 14.084V5.917C20.0005 2.378 17.7235 0 14.3345 0Z" fill="white" />
        <path d="M6.84473 7.39893C8.01445 7.39908 8.99438 8.17882 9.31445 9.24854H15.0146C15.4244 9.24869 15.7644 9.5888 15.7646 9.99854V11.8491C15.7645 12.2689 15.4245 12.599 15.0146 12.5991C14.5947 12.5991 14.2648 12.269 14.2646 11.8491V10.7485H12.9346V11.8491C12.9345 12.269 12.5944 12.599 12.1846 12.5991C11.7646 12.5991 11.4347 12.269 11.4346 11.8491V10.7485H9.31445C8.99449 11.8184 8.01457 12.599 6.84473 12.5991C5.40473 12.5991 4.23438 11.4385 4.23438 9.99854C4.23459 8.56871 5.40486 7.39893 6.84473 7.39893ZM6.84473 8.89893C6.23486 8.89893 5.73459 9.38872 5.73438 9.99854C5.73438 10.6085 6.23473 11.0991 6.84473 11.0991C7.44457 11.0989 7.94434 10.6084 7.94434 9.99854C7.94412 9.38884 7.44444 8.89912 6.84473 8.89893Z" fill="#ACA0E2" />
      </svg>

    )
  }
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.334 0.75H5.665C2.644 0.75 0.75 2.889 0.75 5.916V14.084C0.75 17.111 2.635 19.25 5.665 19.25H14.333C17.364 19.25 19.25 17.111 19.25 14.084V5.916C19.25 2.889 17.364 0.75 14.334 0.75Z" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8.68886 9.99995C8.68886 11.0229 7.85986 11.8519 6.83686 11.8519C5.81386 11.8519 4.98486 11.0229 4.98486 9.99995C4.98486 8.97695 5.81386 8.14795 6.83686 8.14795H6.83986C7.86086 8.14895 8.68886 8.97795 8.68886 9.99995Z" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.69189 10H15.0099V11.852" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.1816 11.852V10" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  )
}
const CaseManagementIcon = ({ isActive = false }) => {
  if (isActive) {
    return (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.0869 5C15.3507 5.00011 16.6762 5.90982 17.1445 8.12012L17.9131 14.3145C18.4787 18.3531 16.208 19.9998 13.1592 20H4.86914C1.81123 20 -0.53086 18.8627 0.105469 14.3145L0.882812 8.12012C1.28049 5.84619 2.65023 5.00014 3.93164 5H14.0869ZM6.09766 8.3291C5.60955 8.3291 5.21387 8.73688 5.21387 9.23926C5.21404 9.74149 5.60966 10.1484 6.09766 10.1484C6.58546 10.1482 6.98127 9.74134 6.98145 9.23926C6.98145 8.73702 6.58557 8.32934 6.09766 8.3291ZM11.8857 8.3291C11.3978 8.32928 11.002 8.73698 11.002 9.23926C11.0021 9.74138 11.3979 10.1483 11.8857 10.1484C12.3737 10.1484 12.7694 9.74149 12.7695 9.23926C12.7695 8.73688 12.3738 8.3291 11.8857 8.3291Z" fill="white" />
        <path opacity="0.4" d="M13.9739 4.77432C13.977 4.85189 13.9621 4.92913 13.9303 5H12.4932C12.4654 4.92794 12.4506 4.85153 12.4497 4.77432C12.4497 2.85682 10.8899 1.30238 8.96575 1.30238C7.04164 1.30238 5.48184 2.85682 5.48184 4.77432C5.49502 4.84898 5.49502 4.92535 5.48184 5H4.00989C3.9967 4.92535 3.9967 4.84898 4.00989 4.77432C4.12172 2.10591 6.32499 0 9.00494 0C11.6849 0 13.8882 2.10591 14 4.77432H13.9739Z" fill="white" />
      </svg>

    )
  }
  return (
    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5139 20.5003H6.16604C3.09968 20.5003 0.747274 19.3927 1.41547 14.9351L2.1935 8.89387C2.6054 6.66962 4.02416 5.81836 5.26901 5.81836H15.4475C16.7107 5.81836 18.047 6.73369 18.523 8.89387L19.3011 14.9351C19.8686 18.8893 17.5802 20.5003 14.5139 20.5003Z" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.6512 5.59873C14.6512 3.21265 12.7169 1.27836 10.3309 1.27836V1.27836C9.18186 1.27349 8.07825 1.72652 7.26406 2.53727C6.44987 3.34803 5.99218 4.44971 5.99219 5.59873H5.99219" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.2965 10.1022H13.2507" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.4659 10.1022H7.42013" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

const QueueIcon = ({ isActive = false }) => {
  if (isActive) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.4" d="M14.8843 3.11485H11.9413C11.2081 3.11969 10.512 2.79355 10.0474 2.22751L9.0782 0.887624C8.62137 0.316613 7.9253 -0.0110553 7.19321 0.000284957H5.11261C1.37819 0.000284957 1.05022e-05 2.19201 1.05022e-05 5.91884V9.94736C-0.00463617 10.3904 19.9956 10.3898 19.9969 9.94736V8.77607C20.0147 5.04924 18.6721 3.11485 14.8843 3.11485Z" fill="white" />
        <path d="M14.875 3.11475C16.1798 3.01383 17.4751 3.40692 18.5029 4.21533C18.6213 4.3157 18.7315 4.42534 18.832 4.54346C19.1519 4.91751 19.3996 5.34755 19.5615 5.81201C19.8801 6.76669 20.0275 7.77011 19.9971 8.77588V14.0288C19.9958 14.4713 19.9632 14.9132 19.8994 15.3511C19.7778 16.1238 19.5054 16.8651 19.0986 17.5337C18.9117 17.8566 18.6846 18.1551 18.4229 18.4214C17.2381 19.5086 15.665 20.0745 14.0576 19.9917H5.93066C4.32055 20.0739 2.74427 19.5084 1.55566 18.4214C1.29711 18.1546 1.07286 17.8561 0.888672 17.5337C0.484406 16.8657 0.218414 16.1234 0.106445 15.3511C0.0352403 14.914 -0.000194582 14.4717 0 14.0288V8.77588C-0.00017363 8.33717 0.0237293 7.89854 0.0712891 7.4624C0.0979816 7.25841 0.160156 7.06281 0.160156 6.86768C0.250424 6.34155 0.41539 5.83105 0.649414 5.35107C1.34294 3.86924 2.76521 3.11476 5.09473 3.11475H14.875ZM4.9707 11.8901C4.51413 11.8901 4.14374 12.2597 4.14355 12.7153C4.14355 13.1711 4.51402 13.5405 4.9707 13.5405H15.1357C15.327 13.5298 15.5096 13.4529 15.6514 13.3218C15.8133 13.1718 15.909 12.963 15.916 12.7427C15.9285 12.5489 15.8648 12.357 15.7383 12.2095C15.5928 12.0112 15.3615 11.8929 15.1152 11.8901H4.9707Z" fill="white" />
      </svg>

    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.419 14.732C20.419 18.31 18.31 20.419 14.732 20.419H6.95C3.363 20.419 1.25 18.31 1.25 14.732V6.932C1.25 3.359 2.564 1.25 6.143 1.25H8.143C8.861 1.251 9.537 1.588 9.967 2.163L10.88 3.377C11.312 3.951 11.988 4.289 12.706 4.29H15.536C19.123 4.29 20.447 6.116 20.447 9.767L20.419 14.732Z" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.48096 13.4629H15.216" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

const ReportIcon = ({ isActive = false }) => {
  if (isActive) {
    return (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8088 7.021C15.3573 7.021 14.7592 7.011 14.0146 7.011C12.1987 7.011 10.7055 5.508 10.7055 3.675V0.459C10.7055 0.206 10.5036 0 10.253 0H4.96363C2.49517 0 0.5 2.026 0.5 4.509V15.284C0.5 17.889 2.59022 20 5.16958 20H13.0463C15.5058 20 17.5 17.987 17.5 15.502V7.471C17.5 7.217 17.299 7.012 17.0475 7.013C16.6247 7.016 16.1177 7.021 15.8088 7.021Z" fill="white" />
        <path opacity="0.4" d="M13.0842 0.56737C12.7852 0.25637 12.2632 0.47037 12.2632 0.90137V3.53837C12.2632 4.64437 13.1742 5.55437 14.2802 5.55437C14.9772 5.56237 15.9452 5.56437 16.7672 5.56237C17.1882 5.56137 17.4022 5.05837 17.1102 4.75437C16.0552 3.65737 14.1662 1.69137 13.0842 0.56737Z" fill="white" />
        <path d="M11.4185 12.8926C11.8293 12.8928 12.1626 13.2268 12.1626 13.6377C12.1626 14.0485 11.8293 14.3816 11.4185 14.3818H5.97412C5.56314 14.3818 5.23001 14.0487 5.22998 13.6377C5.22998 13.2267 5.56312 12.8926 5.97412 12.8926H11.4185ZM9.35889 7.89844C9.76989 7.89844 10.104 8.23255 10.104 8.64355C10.1039 9.0545 9.76985 9.3877 9.35889 9.3877H5.97412C5.56316 9.3877 5.23004 9.0545 5.22998 8.64355C5.22998 8.23255 5.56312 7.89844 5.97412 7.89844H9.35889Z" fill="#ACA0E2" />
      </svg>

    )
  }
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7379 0.761748H5.08493C3.00493 0.753748 1.29993 2.41175 1.25093 4.49075V15.2037C1.20493 17.3167 2.87993 19.0677 4.99293 19.1147C5.02393 19.1147 5.05393 19.1157 5.08493 19.1147H13.0739C15.1679 19.0297 16.8179 17.2997 16.8029 15.2037V6.03775L11.7379 0.761748Z" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.4751 0.75V3.659C11.4751 5.079 12.6231 6.23 14.0431 6.234H16.7981" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.2882 13.3584H5.88818" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.24321 9.60645H5.88721" stroke="#53545C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


  )
}

const title2icon: Record<string, React.ComponentType<any>> = {
  // 'Search Customer': CustomerDashboardIcon,
  'Search Customer': SearchCustomerIcon,
  'Case Management': CaseManagementIcon,
  'Report': ReportIcon,
  'User Management': UserManagementIcon,
  'Access Control': AccessControlIcon,
  'Queue Management': QueueIcon,
}

const getTitleFromPath = (pathSegments: string[]): string => {
  return (
    path2sidebar?.[`/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`] ||
    path2sidebar?.[`/${pathSegments[2]}/${pathSegments[3]}`] ||
    path2sidebar?.[`/${pathSegments[2]}`] ||
    path2sidebar['/']
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AppSidebarMenuList() {
  const { data: meApi } = useGetMeQuery()
  const me = useMemo(() => meApi?.data || null, [meApi])

  const [myPermissions, setMyPermissions] = useState<string[]>([])

  useEffect(() => {
    if (me?.permissions) {
      setMyPermissions(me.permissions.map((p: any) => p.key))
    }
  }, [me])

  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const currentTitle = getTitleFromPath(pathSegments)

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navMain.map(item => {
          // Permission Check
          if (item?.permission?.length) {
            const hasAccess = item.permission.some(p => myPermissions.includes(p))
            if (!hasAccess) return null
          }

          const isActive = currentTitle === item.title
          const Icon = title2icon[item.title]

          return (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem >
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'h-[3rem] gap-3',
                    sidebarMenuButtonVariants({ active: isActive }),
                    'overflow-hidden truncate px-6'
                  )}
                  tooltip={item.title}
                >
                  <Link href={`/th${item.url}`} prefetch={false}>
                    {Icon && (
                      <Icon
                        className={cn(
                          sidebarMenuIconVariants({ active: isActive })
                        )}
                        isActive={isActive}
                      />
                    )}
                    <Typography>{item.title}</Typography>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
