'use client';

import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { useModal } from '@/hooks/useModalStore';
import { useRoom } from '@/hooks/useRoom';
import { convertPrice, formatDateCustom } from '@/lib/utils';
import { Modal } from '@mantine/core';
import { Button, Divider } from '@nextui-org/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../invoice/invoice';
import { SidebarWrapper } from '../sidebar/sidebar';

const ExportBillModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { state } = useRoom();
  const isModalOpen = isOpen && type === 'exportBill';
  const handleExportBill = () => {
    onClose();
  };

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
        isRequired={false}
        readonly={true}
        setValue={() => {}}
        disabled={disabled}
      />
    </div>
  );

  const renderNumberInput = (label, value, placeholder, disabled = false) =>
    renderInput(label, value, placeholder, 'text', disabled);

  const renderInputRow = (inputs) => (
    <div className="w-full flex items-center gap-5">{inputs}</div>
  );
  return (
    <Modal
      closeOnClickOutside={false}
      radius={15}
      size={'auto'}
      removeScrollProps={{ allowPinchZoom: true }}
      opened={isModalOpen}
      centered
      onClose={onClose}
    >
      <>
        <div className="flex justify-center items-center text-gray uppercase font-bold text-xl">
          Xuất phiếu thu
        </div>
        <div className="space-y-2">
          <p className="text-gray font-semibold text-lg">Tiền phòng</p>
          {renderInputRow([
            renderNumberInput('Tiền phòng', state.roomPrice, 'Tiền phòng'),
            renderNumberInput('Tiền cọc', state.depositPrice, 'Tiền Cọc'),
            renderNumberInput(
              'Số ngày ở trong tháng',
              state.dayStayed,
              'Số ngày ở trong tháng'
            ),
          ])}
          {renderInputRow([
            renderNumberInput('Tiền nợ cũ', state.oldDebt, 'Tiền nợ cũ'),
            renderNumberInput('Tiền nợ mới', state.newDebt, 'Tiền nợ mới'),
            renderNumberInput(
              'Tổng tiền phụ thu',
              Number(state.peopleRealStayed) - 4 > 0
                ? (Number(state.peopleRealStayed) - 4) * Number(state.surcharge)
                : 0,
              'Số ngày ở trong tháng'
            ),
          ])}
          <p className="text-gray font-semibold text-lg">Tiền dịch vụ</p>

          {renderInputRow([
            renderNumberInput('Giá điện', state.electricPrice, 'Nhập giá điện'),
            renderNumberInput(
              'Điện tiêu thụ',
              state.newElectric - state.oldElectric,
              'Điện tiêu thụ'
            ),
            renderNumberInput(
              'Tổng tiền điện',
              state.totalElectricPrice,
              'Tổng tiền điện'
            ),
          ])}
          {renderInputRow([
            renderNumberInput(
              'Tổng tiền nước',
              state.totalWaterPrice,
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
            ),
            renderNumberInput(
              'Tổng tiền giữ xe',
              state.totalParkingPrice,
              'Tổng tiền giữ xe'
            ),
          ])}

          <div className="w-full">
            <Divider className="my-4" />
            <div className="w-full flex justify-between gap-5 px-5">
              <div className="flex gap-5">
                <p className="font-bold text-black text-lg">TẠM THU</p>
                <p className="text-xl font-bold text-room-red">
                  {convertPrice(state.suspenseMoney)}
                </p>
              </div>
              <div className="flex gap-5">
                <p className="font-bold text-black text-lg">TỔNG TIỀN</p>
                <p className="text-xl font-bold text-room-red">
                  {convertPrice(state.netProceeds)}
                </p>
              </div>
            </div>
            <Divider className="mt-4" />
          </div>
        </div>
        <PDFDownloadLink
          document={
            <Invoice
              data={{
                ...state,
                startDate: formatDateCustom(state.startDate),
                endDate: formatDateCustom(state.endDate),
              }}
            />
          }
          fileName="invoice.pdf"
        >
          <Button
            className="rounded-[8px] w-[133px] px-4 py-2 bg-room-green text-white font-semibold text-sm"
            onPress={handleExportBill}
          >
            Xác nhận
          </Button>
        </PDFDownloadLink>
      </>
    </Modal>
  );
};

export default ExportBillModal;
