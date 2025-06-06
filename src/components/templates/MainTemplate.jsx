import React from 'react'
import SidebarHeader from '@/components/molecules/SidebarHeader'
import NavItem from '@/components/molecules/NavItem'
import IconButton from '@/components/atoms/IconButton'

const MainTemplate = ({ children, navItems, currentView, setCurrentView, sidebarFooter }) => (
  <div className="flex h-screen bg-secondary dark:bg-secondary text-white overflow-hidden">
    {/* Navigation Sidebar */}
    <div className="w-60 bg-black/90 backdrop-blur-sm p-6 flex flex-col">
      <SidebarHeader />

      <nav className="space-y-4 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.view}
            label={item.name}
            iconName={item.icon}
            isActive={currentView === item.view}
            onClick={() => setCurrentView(item.view)}
          />
        ))}
      </nav>

      <div className="mt-auto">
        <IconButton 
          iconName={sidebarFooter.icon}
          label={sidebarFooter.label}
          onClick={sidebarFooter.onClick}
          className="w-full text-surface-400 hover:text-white"
        />
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col overflow-hidden">
      {children}
    </div>
  </div>
)

export default React.memo(MainTemplate)