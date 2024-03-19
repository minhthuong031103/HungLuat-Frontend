'use client';
import { CommonSvg } from '@/assets/CommonSvg';
import { ModalType, useModal } from '@/hooks/useModalStore';
import { ModalData } from '@/lib/interface';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';
interface RoomDropdownProps {
  className?: string;
  data?: Partial<ModalData>;
  actionType: 'Room' | 'Apartment';
  refecth?: () => void;
}
const RoomDropdown = ({
  className,
  data,
  actionType,
  refecth,
}: RoomDropdownProps) => {
  const dropdownItems = [
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: CommonSvg.edit(),
      onAction: () => {
        onOpen(`edit${actionType}`, data, refecth);
      },
    },
    {
      key: 'delete',
      label: 'Xóa',
      icon: CommonSvg.delete(),
      onAction: () => {
        onOpen(`delete${actionType}`, data, refecth);
      },
    },
  ];
  const { onOpen } = useModal();
  return (
    <div className={className}>
      <Dropdown>
        <DropdownTrigger>{CommonSvg.threedot()}</DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with options">
          <DropdownSection>
            {dropdownItems.map(item => (
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
  );
};

export default RoomDropdown;
