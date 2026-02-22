import React, { ReactNode } from "react"
import AppFooter  from "@/components/AppFooter"
import {AppSidebar} from "@/components/AppSidebar"
import AppHeader from "@/components/AppHeader"

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        
        {/* Header */}
        <AppHeader />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

        {/* Footer */}
        <AppFooter />

      </div>
    </div>
  )
}

export default DefaultLayout