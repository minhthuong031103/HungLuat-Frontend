'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useModal } from '@/hooks/useModalStore';

import { EModalType } from '@/lib/constant';
import { useCustomer } from '@/hooks/useCustomer';

const UpdateExcelModal = () => {
  const { isOpen, onClose, type, onAction, data } = useModal();

  const isModalOpen = isOpen && type === EModalType.UPDATE_EXCEL;

  const handleUpdateExcel = async () => {
    console.log(data);
    onClose();
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Cập nhật thông tin phòng từ EXCEL
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="text-center">
                Bạn có đồng ý cập nhật thông tin danh sách phòng trọ?
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 text-black bg-white hover:bg-white/40 border-1 transition-colors font-semibold text-sm"
                onPress={onClose}
              >
                Hủy
              </Button>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleUpdateExcel}
              >
                Cập nhật
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateExcelModal;
