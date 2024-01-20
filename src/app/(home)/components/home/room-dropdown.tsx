import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
} from '@nextui-org/react';
import { AddNoteIcon } from './AddNoteIcon.jsx';
import { BsThreeDots } from 'react-icons/bs';
import { CommonSvg } from '../../../../assets/CommonSvg';

const DocumentIcon = ({ className }) => <AddNoteIcon className={className} />;

const RoomDropdown = () => {
  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  const dropdownItems = [
    {
      key: 'new',
      shortcut: '⌘N',
      description: 'Create a new file',
      label: 'New file',
      iconClass: iconClasses,
    },
    {
      key: 'copy',
      shortcut: '⌘C',
      description: 'Copy the file link',
      label: 'Copy link',
      iconClass: iconClasses,
    },
    {
      key: 'edit',
      shortcut: '⌘⇧E',
      description: 'Allows you to edit the file',
      label: 'Edit file',
      iconClass: iconClasses,
    },
    {
      key: 'delete',
      shortcut: '⌘⇧D',
      description: 'Permanently delete the file',
      label: 'Delete file',
      iconClass: cn(iconClasses, 'text-danger'),
      color: 'danger',
      className: 'text-danger',
    },
    {
      key: 'download',
      shortcut: '⌘⇧S',
      description: 'Download the file to your computer',
      label: 'Download file',
      iconClass: iconClasses,
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>{CommonSvg.threedot()}</DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with options">
        <DropdownSection title="Actions" showDivider>
          {dropdownItems.slice(0, 3).map((item) => (
            <DropdownItem
              key={item.key}
              shortcut={item.shortcut}
              description={item.description}
              startContent={<DocumentIcon className={item.iconClass} />}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection title="Danger zone">
          {dropdownItems.slice(3).map((item) => (
            <DropdownItem
              key={item.key}
              shortcut={item.shortcut}
              description={item.description}
              startContent={<DocumentIcon className={item.iconClass} />}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default RoomDropdown;
