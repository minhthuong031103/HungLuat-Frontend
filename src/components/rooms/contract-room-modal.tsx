'use client'

import { useModal } from '@/hooks/useModalStore'
import { CustomInput } from '@/app/(home)/(components)/home/custom-input'
import { useRoom } from '@/hooks/useRoom'
import { DatePicker } from '../ui/date-picker'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@nextui-org/react'
const ContractRoomModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { contractState, handleSetContract } = useRoom()
  const isModalOpen = isOpen && type === 'contractRoom'
  const resetState = () => {
    //
  }
  const handleCreateContract = () => {
    resetState()
    onClose()
  }

  return (
    // <Modal
    //   size="3xl"
    //   isOpen={isModalOpen}
    //   onOpenChange={onClose}
    //   classNames={{
    //     body: 'z-10'
    //   }}
    // >
    //   <ModalContent>
    //     {() => (
    //       <>
    //         <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
    //           Hợp đồng
    //         </ModalHeader>
    //         <ModalBody className="space-y-4">

    //         </ModalBody>

    //         <ModalFooter>
    //           <Button
    //             className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
    //             onPress={handleCreateContract}
    //           >
    //             Lưu
    //           </Button>
    //         </ModalFooter>
    //       </>
    //     )}
    //   </ModalContent>
    // </Modal>
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-gray uppercase font-bold text-xl">
            Hợp đồng
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="flex gap-[20px] w-full items-end">
              <div className="w-[33%]">
                <CustomInput
                  label="Họ tên khách hàng"
                  placeholder="Nhập tên khách hàng"
                  value={contractState.customerName}
                  setValue={(value) => handleSetContract('customerName', value)}
                />
              </div>
              <div className="w-[33%]">
                <CustomInput
                  label="Số điện thoại"
                  placeholder="Nhập SĐT khách hàng"
                  value={contractState.phoneNumber}
                  setValue={(value) => handleSetContract('phoneNumber', value)}
                />
              </div>
              <div>
                <DatePicker
                  label="Ngày ký hợp đồng"
                  date={contractState.dateContract}
                  labelCustom="font-medium text-sm"
                  setDate={(value) => handleSetContract('dateContract', value)}
                />
              </div>
            </div>
            <div className="flex gap-[20px] w-full items-end">
              <div className="w-[33%]">
                <CustomInput
                  label="Họ tên khách hàng"
                  placeholder="Nhập tên khách hàng"
                  value={contractState.customerName}
                  setValue={(value) => handleSetContract('customerName', value)}
                />
              </div>
              <div className="w-[33%]">
                <CustomInput
                  label="Số điện thoại"
                  placeholder="Nhập SĐT khách hàng"
                  value={contractState.phoneNumber}
                  setValue={(value) => handleSetContract('phoneNumber', value)}
                />
              </div>
              <div>
                <DatePicker
                  label="Ngày ký hợp đồng"
                  date={contractState.dateContract}
                  labelCustom="font-medium text-sm"
                  setDate={(value) => handleSetContract('dateContract', value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
            onPress={handleCreateContract}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContractRoomModal
