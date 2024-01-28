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
import { checkValueNumberInput } from '@/lib/utils'
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
              <div className="w-[33%]">
                <DatePicker
                  label="Ngày sinh"
                  date={contractState.dayOfBirth}
                  labelCustom="font-medium text-sm text-black"
                  setDate={(value) => handleSetContract('dayOfBirth', value)}
                />
              </div>
            </div>
            <div className="flex gap-[20px] w-full items-end">
              <div className="w-[33%]">
                <DatePicker
                  label="Ngày ký hợp đồng"
                  date={contractState.dateContract}
                  labelCustom="font-medium text-sm text-black"
                  setDate={(value) => handleSetContract('dateContract', value)}
                />
              </div>
              <div className="w-[33%]">
                <DatePicker
                  label="Ngày hết hạn hợp đồng"
                  labelCustom="font-medium text-sm text-black"
                  date={contractState.dateExpired}
                  setDate={(value) => handleSetContract('dateExpired', value)}
                />
              </div>
              <div className="w-[33%]">
                <CustomInput
                  label="CMND/CCCD"
                  placeholder="Nhập CMND/CCCD"
                  value={contractState.identityCard}
                  setValue={(value) => {
                    {
                      checkValueNumberInput('identityCard', value) &&
                        handleSetContract('identityCard', value)
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex gap-[20px] w-full items-end">
              <div className="w-[33%]">
                <DatePicker
                  label="Ngày cấp"
                  date={contractState.issueDate}
                  labelCustom="font-medium text-sm text-black"
                  setDate={(value) => handleSetContract('issueDate', value)}
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
