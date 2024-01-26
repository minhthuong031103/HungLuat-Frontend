'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Divider
} from '@nextui-org/react'
import { useModal } from '@/hooks/useModalStore'
import { useRoom } from '@/hooks/useRoom'
import { CustomInput } from '@/app/(home)/(components)/home/custom-input'

const ExportBillModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { state, resetState, dispatch } = useRoom()
  const isModalOpen = isOpen && type === 'exportBill'
  const handleExportBill = () => {
    resetState()
    onClose()
  }

  const handleSetValue = (key, value) => {
    dispatch({
      type: 'SET_VALUES',
      payload: { [key]: value }
    })
  }

  const renderInput = (
    label,
    value,
    placeholder,
    inputType,
    disabled = false
  ) => (
    <div className="w-[31%]">
      <CustomInput
        label={label}
        value={value}
        placeholder={placeholder}
        type={inputType}
        setValue={(value) => handleSetValue(label, value)}
        disabled={disabled}
      />
    </div>
  )

  const renderNumberInput = (label, value, placeholder, disabled = false) =>
    renderInput(label, value, placeholder, 'number', disabled)

  const renderInputRow = (inputs) => (
    <div className="w-full flex items-center gap-5">{inputs}</div>
  )

  return (
    <Modal size="3xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Xuất phiếu thu
            </ModalHeader>
            <ModalBody className="space-y-2">
              {renderInputRow([
                renderNumberInput(
                  'Giá điện',
                  state.electricPrice,
                  'Nhập giá điện'
                ),
                renderNumberInput(
                  'Chỉ số điện cũ',
                  state.oldElectric,
                  'Nhập chỉ số điện cũ',
                  true
                ),
                renderNumberInput(
                  'Chỉ số điện mới',
                  state.newElectric,
                  'Nhập chỉ số điện mới'
                )
              ])}
              <p className="text-gray font-semibold text-lg">Chi phí</p>
              {renderInputRow([
                renderNumberInput(
                  'Tổng tiền điện',
                  state.totalElectricPrice,
                  'Tổng tiền điện'
                ),
                renderNumberInput(
                  'Tổng tiền nước',
                  state.waterPrice,
                  'Tổng tiền nước'
                ),
                renderNumberInput(
                  'Tiền dịch vụ',
                  state.servicePrice,
                  'Tiền dịch vụ'
                ),
                renderNumberInput(
                  'Chi phí phát sinh khác',
                  state.otherPrice,
                  'Chi phí phát sinh'
                )
              ])}
              {renderInputRow([
                renderNumberInput('Tiền phòng', state.roomPrice, 'Tiền phòng'),
                renderNumberInput('Trả trước', state.depositPrice, 'Trả trước'),
                renderNumberInput('Tiền xe', state.parkingPrice, 'Tiền xe'),
                renderNumberInput(
                  'Tiền Internet',
                  state.internetPrice,
                  'Tiền Internet'
                )
              ])}
              <div className="w-full">
                <Divider className="my-4" />
                <div className="w-full flex justify-end gap-5 px-5">
                  <p className="font-bold text-black text-lg">TỔNG TIỀN</p>
                  <p className="text-xl font-bold text-room-red">
                    {state.totalPrice}
                  </p>
                </div>
                <Divider className="mt-4" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-room-green text-white font-semibold text-sm"
                onPress={handleExportBill}
              >
                Xác nhận
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ExportBillModal
