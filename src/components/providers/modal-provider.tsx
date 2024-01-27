'use client'

import AddApartmentModal from '@/app/(home)/(components)/home/AddApartmentModal'
import EditAppartmentModal from '@/app/(home)/(components)/home/edit-apartment-modal'
import { useEffect, useState } from 'react'
import CreateRoomModal from '../rooms/create-room-modal'
import EditRoomModal from '../rooms/edit-room-modal'
import ExportBillModal from '../rooms/export-bill-modal'
import ContractRoomModal from '../rooms/contract-room-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <>
      <AddApartmentModal />
      <EditAppartmentModal />
      <CreateRoomModal />
      <EditRoomModal />
      <ExportBillModal />
      <ContractRoomModal />
    </>
  )
}
