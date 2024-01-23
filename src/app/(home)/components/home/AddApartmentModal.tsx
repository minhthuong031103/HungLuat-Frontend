'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@nextui-org/react'
import { CommonSvg } from '@/assets/CommonSvg'
import { useState } from 'react'

interface CustomInputProps {
  label: string
  placeholder: string
  value: string
  setValue: (e: string) => void
  type?: string
}

const CustomInput = ({
  label,
  placeholder,
  value,
  setValue,
  type
}: CustomInputProps) => {
  return (
    <Input
      type={type}
      label={label}
      isClearable
      variant="bordered"
      isRequired
      value={value}
      onValueChange={(e) => {
        setValue(e)
      }}
      placeholder={placeholder}
      labelPlacement="outside"
      classNames={{
        label: 'text-black ',
        input: [],
        innerWrapper: 'bg-transparent',
        inputWrapper: ['border-1 px-[10px] py-[8px]']
      }}
      // startContent={
      //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      // }
    />
  )
}

const AddApartmentModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [apartmentName, setApartmentName] = useState('')
  const [apartmentFloor, setApartmentFloor] = useState('')
  return (
    <div className="">
      <Button
        onPress={onOpen}
        className="rounded-[8px] px-[16px] py-[8px] bg-blueButton"
      >
        <div className="flex flex-row items-center gap-x-[8px] ">
          <div>{CommonSvg.plus()}</div>
          <div className="text-white mt-[1px]">Them moi</div>
        </div>
      </Button>
      <Modal className="" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="flex flex-col gap-1 items-center ">
                Tao moi Can Ho{' '}
              </div>
              <ModalBody className="">
                <div>
                  <div className="flex flex-row gap-x-[20px]">
                    <div className="w-[65%]">
                      <CustomInput
                        label="Ten Can Ho"
                        placeholder="Nhap ten can ho"
                        value={apartmentName}
                        setValue={setApartmentName}
                      />
                    </div>

                    <div className="w-[35%]">
                      <CustomInput
                        label="So Tang"
                        placeholder="Nhap so tang"
                        value={apartmentFloor}
                        setValue={setApartmentFloor}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
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
