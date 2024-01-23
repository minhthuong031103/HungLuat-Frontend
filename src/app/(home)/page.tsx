'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import AddApartmentModal from './components/home/AddApartmentModal';
import RoomDropdown from './components/home/room-dropdown';
import { useAuth } from '@/hooks/useAuth';

const page = () => {
  const { onLogout } = useAuth();
  return (
    <div>
      <RoomDropdown />

      <AddApartmentModal />
      <Button
        onClick={() => {
          onLogout();
        }}
      >
        Dang xuat
      </Button>
    </div>
  );
};

export default page;
