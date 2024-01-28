'use client';

import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useApartment } from '@/hooks/useApartment';
import { useApartmentScroll } from '@/hooks/useApartmentScroll';
import { useCustomer } from '@/hooks/useCustomer';
import { useModal } from '@/hooks/useModalStore';
import { useRoom } from '@/hooks/useRoom';
import { EModalType, queryKey } from '@/lib/constant';
import { checkValueNumberInput } from '@/lib/utils';
import { Apartment, Room } from '@/types';
import { Modal } from '@mantine/core';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SelectAddress } from '../(components)/home/select-address';

const CustomerAddModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === EModalType.CUSTOMER_CREATE;

  const resetState = () => {
    //
  };
  const { handleSetCustomerValue, customerState } = useCustomer();
  const handleCreateContract = () => {
    resetState();
    onClose();
  };

  const {
    apartmentChosen,
    setApartmentChosen,
    setCurrentPage,
    apartments,
    isFetching,
    setIsScrollOpen,
    scrollerRef,
    rooms,
  } = useApartmentScroll();
  console.log('🚀 ~ CustomerAddModal ~ rooms:', rooms);
  console.log('🚀 ~ CustomerAddModal ~ apartmentChosen:', apartmentChosen);
  return (
    <Modal
      centered
      title="Thêm khách trọ"
      classNames={{
        header:
          'flex justify-center items-center text-gray uppercase font-bold text-xl',
      }}
      opened={isModalOpen}
      onClose={onClose}
      size={'auto'}
      className=""
      radius={15}
      removeScrollProps={{ allowPinchZoom: true }}
    >
      <div className="flex flex-col gap-y-5">
        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[33%]">
            <CustomInput
              label="Họ tên khách hàng"
              placeholder="Nhập tên khách hàng"
              value={customerState.name}
              setValue={(value) => handleSetCustomerValue('name', value)}
            />
          </div>
          <div className="w-[33%]">
            <CustomInput
              label="Số điện thoại"
              placeholder="Nhập SĐT khách hàng"
              value={customerState.phone}
              setValue={(value) => {
                checkValueNumberInput('phone', value) &&
                  handleSetCustomerValue('phone', value);
              }}
            />
          </div>
          <div className="w-[33%]">
            <DatePicker
              label="Ngày sinh"
              date={customerState.dayOfBirth}
              labelCustom="font-medium text-sm text-black"
              setDate={(value) => handleSetCustomerValue('dayOfBirth', value)}
            />
          </div>
        </div>
        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[50%]">
            <CustomInput
              label="CMND/CCCD"
              placeholder="Nhập CMND/CCCD"
              value={customerState.identityCard}
              setValue={(value) => {
                {
                  checkValueNumberInput('identityCard', value) &&
                    handleSetCustomerValue('identityCard', value);
                }
              }}
            />
          </div>
          <div className="w-[50%]">
            <DatePicker
              label="Ngày cấp"
              date={customerState.dayOfBirth}
              labelCustom="font-medium text-sm text-black"
              setDate={(value) => handleSetCustomerValue('issueDate', value)}
            />
          </div>
        </div>
        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[50%] ">
            <Select
              labelPlacement="outside"
              label="Căn hộ"
              isRequired={true}
              placeholder="Chọn căn hộ"
              className="max-w-[100%]"
              selectedKeys={apartmentChosen ? [apartmentChosen] : []}
              isLoading={isFetching}
              disallowEmptySelection
              scrollRef={scrollerRef}
              onOpenChange={setIsScrollOpen}
              onChange={(e) => {
                setApartmentChosen(e.target.value);
                setCurrentPage(1);
              }}
            >
              {apartments ? (
                apartments?.pages?.map((page) =>
                  page?.data?.items?.map((item: Apartment) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
                )
              ) : (
                <SelectItem key={''}></SelectItem>
              )}
            </Select>
          </div>
          <div className="w-[50%] z-[100]">
            <Select
              label="Phòng"
              labelPlacement="outside"
              isRequired={true}
              placeholder="Chọn phòng"
              className="max-w-[100%] "
              disallowEmptySelection
              isDisabled={!apartmentChosen.length}
              selectedKeys={customerState.roomId ? [customerState.roomId] : []}
              onChange={(e) => {
                handleSetCustomerValue('roomId', e.target.value);
              }}
            >
              {rooms?.map((item: any) => {
                console.log('🚀 ~ {rooms?.map ~ item:', item);
                return item?.rooms?.map((room: Room) => {
                  return (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  );
                });
              })}
            </Select>
          </div>
        </div>
        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[100%]">
            <CustomInput
              label="Địa chỉ thường trú"
              placeholder="Nhập Địa chỉ thường trú"
              value={customerState.address}
              setValue={(value) => {
                {
                  handleSetCustomerValue('address', value);
                }
              }}
            />
          </div>
        </div>
        <div className="flex w-full flex-row justify-end">
          <Button
            className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
            //  onPress={handleEditApartment}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerAddModal;
