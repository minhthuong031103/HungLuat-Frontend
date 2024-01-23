import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn
} from '@nextui-org/react'
import { AddNoteIcon } from './AddNoteIcon.jsx'
import { BsThreeDots } from 'react-icons/bs'
import { CommonSvg } from '../../../../assets/CommonSvg'

const RoomDropdown = ({ className }) => {
  const dropdownItems = [
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: CommonSvg.edit(),
      onAction: () => {
        console.log('edit')
      }
    },
    {
      key: 'delete',
      label: 'Xóa',
      icon: CommonSvg.delete(),
      onAction: () => {
        console.log('delete')
      }
    }
  ]
  return (
    <div className={className}>
      <Dropdown>
        <DropdownTrigger>{CommonSvg.threedot()}</DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with options">
          <DropdownSection>
            {dropdownItems.map((item) => (
              <DropdownItem
                key={item.key}
                startContent={item.icon}
                onPress={item.onAction}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default RoomDropdown
