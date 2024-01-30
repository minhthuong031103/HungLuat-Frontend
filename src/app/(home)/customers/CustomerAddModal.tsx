'use client';

import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { FileDialog } from '@/components/ui/FileDialog';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Zoom } from '@/components/ui/zoom-image';
import { useApartmentScroll } from '@/hooks/useApartmentScroll';
import { useCustomer } from '@/hooks/useCustomer';
import { useModal } from '@/hooks/useModalStore';
import { EModalType } from '@/lib/constant';
import { checkValueNumberInput } from '@/lib/utils';
import { Apartment, Room } from '@/types';
import { Modal } from '@mantine/core';
import { Button, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import IndentityModal from './AddIndentityModal';

const CustomerAddModal = () => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const [identityModal, setIdentityModal] = useState(false);
  const [identityBackModal, setIdentityBackModal] = useState(false);

  const isModalOpen = isOpen && type === EModalType.CUSTOMER_CREATE;
  const [cmndMatTruoc, setCmndMatTruoc] = useState([]);
  const [cmndMatSau, setCmndMatSau] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSetCustomerValue, customerState, createCustomer } =
    useCustomer();
  const handleAddCustomer = async () => {
    // resetCustomerState()
    setIsLoading(true);
    const data = {
      name: customerState.name,
      phone: customerState.phone,
      dayOfBirth: new Date(customerState.dayOfBirth),
      identityCard: customerState.identityCard,
      issuedDate: new Date(customerState.issuedDate),
      address: customerState.address,
      identityFrontUrl: customerState.identityFrontUrl,
      identityBackUrl: customerState.identityBackUrl,
      roomId: Number(customerState.roomId),
    };
    await createCustomer(data, onClose);
    setIsLoading(false);
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
  return (
    <Modal
      closeOnClickOutside={false}
      centered
      title="Thêm khách trọ"
      classNames={{
        header: 'flex justify-center items-center relative',
        title: 'font-bold text-gray uppercase font-bold text-xl',
        close: 'm-0 absolute right-3 top-3',
      }}
      opened={isModalOpen}
      onClose={onClose}
      size={'auto'}
      className=""
      radius={15}
      removeScrollProps={{ allowPinchZoom: true }}
    >
      <div className="flex flex-col gap-y-[10px]">
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
              date={customerState.issuedDate}
              labelCustom="font-medium text-sm text-black"
              setDate={(value) => handleSetCustomerValue('issuedDate', value)}
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
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3 ">
            <Label>Ảnh CMND mặt trước</Label>
            <div className="h-36 ">
              <Zoom key={2}>
                {customerState.identityFrontUrl ? (
                  <img
                    src={customerState.identityFrontUrl}
                    className={`h-36 w-56 border-2 rounded-md object-cover object-center ${
                      cmndMatTruoc?.length === 0 && 'pointer-events-none'
                    }`}
                  />
                ) : (
                  <div className="h-36 w-56 border-2 rounded-md object-cover object-center flex justify-center items-center">
                    <p className="text-sm text-gray-500">Chưa có ảnh</p>
                  </div>
                )}
              </Zoom>
              <div className="w-full flex justify-center mt-2">
                <Button
                  onPress={() => setIdentityModal(true)}
                  isDisabled={identityModal}
                  variant="flat"
                >
                  Tải ảnh lên
                </Button>
              </div>
              <IndentityModal
                isModalOpen={identityModal}
                onClose={() => setIdentityModal(false)}
                className="w-full"
                name="identityFrontUrl"
                key="identityFrontUrl"
                setImageUrl={(value) =>
                  handleSetCustomerValue('identityFrontUrl', value)
                }
                maxFiles={1}
                maxSize={1024 * 1024 * 4}
                files={cmndMatTruoc}
                setFiles={setCmndMatTruoc}
                disabled={false}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <Label>Ảnh CMND mặt sau</Label>
            <div className="h-36 ">
              <Zoom key={2}>
                {customerState.identityBackUrl ? (
                  <img
                    src={customerState.identityBackUrl}
                    className={`h-36 w-56 border-2 rounded-md object-cover object-center ${
                      cmndMatSau?.length === 0 && 'pointer-events-none'
                    }`}
                  />
                ) : (
                  <div className="h-36 w-56 border-2 rounded-md object-cover object-center flex justify-center items-center">
                    <p className="text-sm text-gray-500">Chưa có ảnh</p>
                  </div>
                )}
              </Zoom>
              <div className="w-full flex justify-center mt-2">
                <Button
                  onPress={() => setIdentityBackModal(true)}
                  isDisabled={identityBackModal}
                  variant="flat"
                >
                  Tải ảnh lên
                </Button>
              </div>
              <IndentityModal
                isModalOpen={identityBackModal}
                onClose={() => setIdentityBackModal(false)}
                className="w-full"
                name="identityBackUrl"
                setImageUrl={(value) =>
                  handleSetCustomerValue('identityBackUrl', value)
                }
                maxFiles={1}
                maxSize={1024 * 1024 * 4}
                files={cmndMatSau}
                setFiles={setCmndMatSau}
                disabled={false}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row justify-end mt-[60px]">
          <Button
            className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
            onPress={handleAddCustomer}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" color="white" /> : 'Lưu'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerAddModal;
