'use client';

import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { useCustomerByRoomScroll } from '@/hooks/useCustomerByRoomScroll';
import { useModal } from '@/hooks/useModalStore';
import { useRoom } from '@/hooks/useRoom';
import { checkValueNumberInput } from '@/lib/utils';
import { Customer } from '@/types';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { throttle } from 'lodash';
import { useParams } from 'next/navigation';
import ModalCus from '../modalCus/ModalCus';
import { DatePicker } from '../ui/date-picker';
const ContractRoomModal = () => {
  const { isOpen, onClose, type, onAction } = useModal();
  const { roomId } = useParams();
  const { contractState, handleSetContract } = useRoom();
  const isModalOpen = isOpen && type === 'contractRoom';

  const {
    customerChosen,
    setCustomerChosen,
    setCurrentPage,
    customers,
    setSearchValue,
    isFetching,
    setIsScrollOpen,
    scrollerRef,
  } = useCustomerByRoomScroll({ roomId });
  console.log('🚀 ~ ContractRoomModal ~ customers:', customers);
  const { createContract } = useRoom();
  const handleCreateContract = async () => {
    const data = {
      ...contractState,
      defaultElectric: Number(contractState.defaultElectric),
      customerId: Number(customerChosen),
      roomId: Number(roomId),
    };
    await createContract({ data, onClose });
    onAction();
    setCustomerChosen('');
  };

  return (
    <ModalCus isModalOpen={isModalOpen} onClose={onClose} title={'HỢP ĐỒNG'}>
      <div className="flex flex-col gap-y-5">
        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[33%]">
            <Autocomplete
              labelPlacement="outside"
              label="Khách hàng"
              isRequired={true}
              placeholder="Chọn khách hàng"
              className="max-w-[100%]"
              selectedKeys={customerChosen ? [customerChosen] : []}
              isLoading={isFetching}
              scrollRef={scrollerRef}
              onOpenChange={setIsScrollOpen}
              // onSelectionChange={e => {
              //   setCustomerChosen(e as any);
              // }}
              onChange={e => {
                console.log('🚀 ~ ContractRoomModal ~ e:', e);
                setCustomerChosen(e.target.value);
                setCurrentPage(1);
              }}
              // onInputChange={e => {
              //   setSearchValue(e);
              // }}
            >
              {customers ? (
                customers?.pages?.map(page =>
                  page?.data?.items?.map((item: Customer) => {
                    console.log('🚀 ~ ContractRoomModal ~ item:', item);
                    return (
                      <AutocompleteItem key={item.id} value={item.id}>
                        {item.name}
                      </AutocompleteItem>
                    );
                  }),
                )
              ) : (
                <AutocompleteItem key={''}></AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className="w-[33%]">
            <DatePicker
              label="Ngày ký hợp đồng"
              date={contractState.daySignContract}
              labelCustom="font-medium text-sm text-black"
              setDate={value => handleSetContract('dateContract', value)}
            />
          </div>
          <div className="w-[33%]">
            <DatePicker
              label="Ngày hết hạn hợp đồng"
              labelCustom="font-medium text-sm text-black"
              date={contractState.dayEndContract}
              setDate={value => handleSetContract('dateExpired', value)}
            />
          </div>
        </div>

        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[50%]">
            <CustomInput
              label="Ghi chú"
              placeholder="Nhập ghi chú"
              value={contractState.note}
              setValue={value => {
                {
                  handleSetContract('note', value);
                }
              }}
            />
          </div>
          <div className="w-[50%]">
            <CustomInput
              label="Chỉ số điện bàn giao"
              placeholder="Nhập chỉ số điện"
              value={contractState.defaultElectric}
              setValue={value => {
                {
                  handleSetContract('defaultElectric', value);
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
            onPress={handleCreateContract}
          >
            Lưu
          </Button>
        </div>
      </div>
    </ModalCus>
  );
};

export default ContractRoomModal;
