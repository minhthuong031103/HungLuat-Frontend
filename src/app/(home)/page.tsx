'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import AddApartmentModal from './components/home/AddApartmentModal'
import RoomDropdown from './components/home/room-dropdown'

const page = () => {
  return (
    <div>
      <RoomDropdown />
      <AddApartmentModal />
    </div>
  )
}

export default page
