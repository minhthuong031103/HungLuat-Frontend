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
import { useModal } from '@/hooks/useModalStore'
import { CustomInput } from '@/app/(home)/(components)/home/custom-input'
import { CustomSelect } from '@/app/(home)/(components)/home/custom-select'

const CreateRoomModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [floor, setFloor] = useState([])
  useEffect(() => {
    if (data && floor.length === 0) {
      for (let i = 1; i <= data?.numberFloor; i++) {
        setFloor((prev) => [...prev, `Tầng ${i}`])
      }
    }
  }, [data])
  const [roomName, setRoomName] = useState('')
  const [floorChosen, setFloorChosen] = useState('')
  const isModalOpen = isOpen && type === 'createRoom'
  const resetState = () => {
    setFloor([])
    setRoomName('')
    setFloorChosen('')
  }
  const handleCreateRoom = () => {
    resetState()
    onClose()
  }
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Tạo mới phòng
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex gap-[20px]">
                <CustomInput
                  label="Tên phòng"
                  placeholder="Nhập tên phòng"
                  value={roomName}
                  setValue={setRoomName}
                />
                <CustomSelect
                  label="Tầng"
                  value={floorChosen}
                  setValue={setFloorChosen}
                  data={floor}
                  isRequired={true}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleCreateRoom}
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

export default CreateRoomModal
