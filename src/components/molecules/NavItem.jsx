import React from 'react'
import IconButton from '@/components/atoms/IconButton'

const NavItem = ({ label, iconName, isActive, onClick }) => (
  <IconButton 
    iconName={iconName}
    label={label}
    onClick={onClick}
    active={isActive}
    size={20}
  />
)

export default React.memo(NavItem)