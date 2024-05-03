'use client';

import { useApartment } from '@/hooks/useApartment';
import { useModal } from '@/hooks/useModalStore';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CustomInput } from './custom-input';
import { SelectAddress } from './select-address';
import { checkValueNumberInput } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Zoom } from '@/components/ui/zoom-image';
import IndentityModal from '../../customers/AddIndentityModal';
import { Modal } from '@mantine/core';

const AddApartmentModal = () => {
  const { isOpen, onClose, type, onAction } = useModal();
  const { createApartment } = useApartment();
  const [apartmentName, setApartmentName] = useState('');
  const [apartmentFloor, setApartmentFloor] = useState('');
  const [address, setAddress] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  const [districtValue, setDistrictValue] = useState('');
  const [wardValue, setWardValue] = useState('');
  const [hotline, setHotLine] = useState('');
  const [identityModal, setIdentityModal] = useState(false);
  const [signImage, setSignImage] = useState([]);
  const [signImageUrl, setSignImageUrl] = useState('');
  const isModalOpen = isOpen && type === 'createApartment';
  const resetState = () => {
    setProvinceValue('');
    setDistrictValue('');
    setWardValue('');
    setApartmentName('');
    setApartmentFloor('');
    setAddress('');
    setHotLine('');
    setSignImage([]);
    setSignImageUrl('');
  };
  const handleAddApartment = async () => {
    if (
      apartmentName &&
      apartmentFloor &&
      address &&
      provinceValue &&
      districtValue &&
      wardValue &&
      hotline &&
      signImageUrl
    ) {
      const data = {
        name: apartmentName,
        numberFloor: parseInt(apartmentFloor),
        address: `${address}, ${wardValue}, ${districtValue}, ${provinceValue}`,
        ward: wardValue,
        district: districtValue,
        city: provinceValue,
        houseNumber: address,
        hotline: hotline,
        signImageUrl: signImageUrl,
      };
      await createApartment(data, resetState, onClose);
      onAction();
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin trước khi tạo căn hộ');
    }
  };
  const handleClose = () => {
    resetState();
    onClose();
  };
  return (
    <Modal
      closeOnClickOutside={false}
      centered
      title="Thêm căn hộ"
      classNames={{
        header: 'flex justify-center items-center relative',
        title: 'font-bold text-gray uppercase font-bold text-xl',
        close: 'm-0 absolute right-3 top-3',
      }}
      opened={isModalOpen}
      onClose={handleClose}
      size={'auto'}
      className=""
      radius={15}
      removeScrollProps={{ allowPinchZoom: true }}
    >
      <div className="space-y-4">
        <div className="flex gap-[20px]">
          <CustomInput
            label="Tên căn hộ"
            placeholder="Nhập tên căn hộ"
            value={apartmentName}
            setValue={setApartmentName}
          />
          <CustomInput
            label="Số tầng"
            placeholder="Nhập số tầng"
            type="number"
            value={apartmentFloor}
            setValue={value => {
              if (Number(value) >= 0) setApartmentFloor(value);
            }}
          />
          <CustomInput
            label="Hotline"
            placeholder="Hotline"
            value={hotline}
            setValue={value => {
              setHotLine(value);
            }}
          />
        </div>
        <div className="flex gap-[20px]">
          <SelectAddress
            provinceValue={provinceValue}
            districtValue={districtValue}
            wardValue={wardValue}
            setProvinceValue={setProvinceValue}
            setDistrictValue={setDistrictValue}
            setWardValue={setWardValue}
          />
        </div>
        <div className="w-full pt-[3px]">
          <CustomInput
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            value={address}
            setValue={setAddress}
          />
        </div>
        <div className="flex flex-col gap-3 ">
          <Label>Chữ ký</Label>
          <div className="h-36 w-fit flex flex-col items-center">
            <Zoom key={2}>
              {signImageUrl ? (
                <img
                  src={signImageUrl}
                  className={`h-36 w-56 border-2 rounded-md object-cover object-center ${
                    signImage.length === 0 && 'pointer-events-none'
                  }`}
                />
              ) : (
                <div className="h-36 w-56 border-2 rounded-md object-cover object-center flex justify-center items-center">
                  <p className="text-sm text-gray-500">Chưa có ảnh</p>
                </div>
              )}
            </Zoom>
            <div className="mt-2">
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
              setImageUrl={value => setSignImageUrl(value)}
              maxFiles={1}
              maxSize={1024 * 1024 * 4}
              files={signImage}
              setFiles={setSignImage}
              disabled={false}
            />
          </div>
        </div>
        <div className="flex w-full flex-row justify-end mt-[60px]">
          <Button
            className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
            onPress={handleAddApartment}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddApartmentModal;
