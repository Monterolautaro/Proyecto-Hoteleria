import Sidebar from '@/components/sidebar/SideBar'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <div className="flex h-screen">
            <Sidebar />
            <div className="w-full bg-gray-100">
                {children}
            </div>
        </div>
    </>
  )
}

