'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { CommonSvg } from '@/assets/CommonSvg'
import { useState } from 'react'
import { CustomInput } from './custom-input'
import { SelectAddress } from './select-address'

const AddApartmentModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [apartmentName, setApartmentName] = useState('')
  const [apartmentFloor, setApartmentFloor] = useState('')
  const [address, setAddress] = useState('')

  const handleAddApartment = () => {
    onClose()
  }
  return (
    <div className="">
      <Button
        onPress={onOpen}
        className="rounded-[8px] px-4 py-2 bg-blueButton"
      >
        <div className="flex flex-row items-center gap-x-[8px] ">
          <div>{CommonSvg.plus()}</div>
          <div className="text-white mt-[1px] font-medium">Thêm mới</div>
        </div>
      </Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                  <SelectAddress />
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
    </div>
  )
}

export default AddApartmentModal
