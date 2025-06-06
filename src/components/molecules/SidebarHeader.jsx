import React from 'react'
import AppLogo from '@/components/atoms/AppLogo'

const SidebarHeader = ({ className = '' }) => (
  <div className={`mb-8 ${className}`}>
    <AppLogo />
  </div>
)

export default React.memo(SidebarHeader)