'use client';

import AddApartmentModal from '@/app/(home)/(components)/home/AddApartmentModal';
import EditAppartmentModal from '@/app/(home)/(components)/home/edit-apartment-modal';
import CustomerAddModal from '@/app/(home)/customers/CustomerAddModal';
import { useEffect, useState } from 'react';
import ContractRoomModal from '../rooms/contract-room-modal';
import CreateRoomModal from '../rooms/create-room-modal';
import EditRoomModal from '../rooms/edit-room-modal';
import ExportBillModal from '../rooms/export-bill-modal';
import IndentityModal from '@/app/(home)/customers/AddIndentityModal';
import DeleteRoomModal from '../rooms/delete-room-modal';
import DeleteApartmentModal from '@/app/(home)/(components)/home/delete-apartment-modal';
import CreateEmployeeModal from '../employee/CreateEmployeeModal';
import EditEmployeeModal from '../employee/EditEmployeeModal';
import UpdatePasswordEmployeeModal from '../employee/UpdatePasswordEmployeeModal';
import DeleteEmployeeModal from '../employee/DeleteEmployeeModal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AddApartmentModal />
      <EditAppartmentModal />
      <CreateRoomModal />
      <EditRoomModal />
      <ExportBillModal />
      <ContractRoomModal />
      <CustomerAddModal />
      <DeleteRoomModal />
      <DeleteApartmentModal />
      <CreateEmployeeModal />
      <EditEmployeeModal />
      <UpdatePasswordEmployeeModal />
      <DeleteEmployeeModal />
    </>
  );
};
