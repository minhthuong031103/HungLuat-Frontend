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

const DeletePayModal = () => {
  const { isOpen, onClose, type, onAction, data } = useModal();

  const isModalOpen = isOpen && type === EModalType.PAY_DELETE;

  const handleDeletePay = async () => {
    onClose();
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Xóa thông tin phiếu chi
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="text-center">
                Bạn có đồng ý xóa phiếu chi{' '}
                <span className="text-gray font-bold text-base">
                  {data?.name}
                </span>{' '}
                ?
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
                onPress={handleDeletePay}
              >
                Xóa
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeletePayModal;
