'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react'
import { useState } from 'react'
import { CustomInput } from './custom-input'
import { SelectAddress } from './select-address'
import toast from 'react-hot-toast'
import { useModal } from '@/hooks/use-modal-store'
import { axiosClient } from '@/lib/axios'
import { RETURNED_MESSAGES } from '@/lib/translate'

const AddApartmentModal = () => {
  const { isOpen, onClose, type } = useModal()

  const [apartmentName, setApartmentName] = useState('')
  const [apartmentFloor, setApartmentFloor] = useState('')
  const [address, setAddress] = useState('')
  const [provinceValue, setProvinceValue] = useState('')
  const [districtValue, setDistrictValue] = useState('')
  const [wardValue, setWardValue] = useState('')

  const isModalOpen = isOpen && type === 'createApartment'
  const resetState = () => {
    setApartmentName('')
    setApartmentFloor('')
    setAddress('')
  }
  const handleAddApartment = async () => {
    if (
      apartmentName &&
      apartmentFloor &&
      address &&
      provinceValue &&
      districtValue &&
      wardValue
    ) {
      try {
        const res = await axiosClient.post('/apartment/create', {
          name: apartmentName,
          numberFloor: Number(apartmentFloor),
          address: `${address}, ${wardValue}, ${districtValue}, ${provinceValue}`,
          city: provinceValue,
          district: districtValue,
          ward: wardValue,
          houseNumber: address
        })
        if (res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_CREATED.ENG) {
          toast.success(RETURNED_MESSAGES.APARTMENT.APARTMENT_CREATED.VIE)
        } else if (
          res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.ENG
        ) {
          toast.error(RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.VIE)
        }
      } catch (error) {
        console.log('🚀 ~ handleAddApartment ~ error:', error)
      }

      resetState()
      onClose()
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin trước khi tạo căn hộ')
    }
  }
  const handleClose = () => {
    resetState()
    onClose()
  }
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={handleClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Tạo mới căn hộ
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
                onPress={handleAddApartment}
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

export default AddApartmentModal
