'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CustomInput } from './custom-input'
import { SelectAddress } from './select-address'
import toast from 'react-hot-toast'
import { useModal } from '@/hooks/useModalStore'

const EditAppartmentModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const [apartmentName, setApartmentName] = useState('')
  const [apartmentFloor, setApartmentFloor] = useState('')
  const [address, setAddress] = useState('')

  const [provinceValue, setProvinceValue] = useState('')
  const [districtValue, setDistrictValue] = useState('')
  const [wardValue, setWardValue] = useState('')
  // useEffect(() => {
  //   if (data) {
  //     setApartmentName(data.name)
  //     setApartmentFloor(data.numberFloor?.toString())
  //     setAddress(data.address)
  //   }
  // }, [data])
  const isModalOpen = isOpen && type === 'editApartment'
  const resetState = () => {
    setApartmentName('')
    setApartmentFloor('')
    setAddress('')
  }
  const handleEditApartment = () => {
    if (
      apartmentName &&
      apartmentFloor &&
      address &&
      provinceValue &&
      districtValue &&
      wardValue
    ) {
      toast.success('Cập nhật thông tin căn hộ thành công')
      resetState()
      onClose()
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin trước khi chỉnh sửa')
    }
  }
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Cập nhật thông tin căn hộ
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex gap-[20px]">
                <div className="w-[60%]">
                  <CustomInput
                    label="Tên căn hộ"
                    placeholder="Nhập tên căn hộ"
                    value={apartmentName}
                    setValue={setApartmentName}
                  />
                </div>
                <div className="w-[40%]">
                  <CustomInput
                    label="Số tầng"
                    placeholder="Nhập số tầng"
                    value={apartmentFloor}
                    setValue={setApartmentFloor}
                  />
                </div>
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
              <div className="">
                <div className="w-full">
                  <CustomInput
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    setValue={setAddress}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleEditApartment}
              >
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditAppartmentModal
