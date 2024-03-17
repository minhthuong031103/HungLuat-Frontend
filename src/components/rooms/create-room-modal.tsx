'use client';

import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { CustomSelect } from '@/app/(home)/(components)/home/custom-select';
import { useModal } from '@/hooks/useModalStore';
import { useRoom } from '@/hooks/useRoom';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

const CreateRoomModal = () => {
  const { isOpen, onClose, type, data, onAction } = useModal();
  const [floor, setFloor] = useState([]);
  useEffect(() => {
    if (data && data?.numberFloor) {
      setFloor([]);
      for (let i = 1; i <= data?.numberFloor; i++) {
        setFloor((prev: any) => [...prev, `Tầng ${i}`] as any);
      }
    }
  }, [data]);
  const [roomName, setRoomName] = useState('');
  const [floorChosen, setFloorChosen] = useState('');
  const [waterTypeChosen, setWaterTypeChosen] = useState('');
  const isModalOpen = isOpen && type === 'createRoom';
  const { createRoom } = useRoom();
  const resetState = () => {
    setFloor([]);
    setRoomName('');
    setFloorChosen('');
  };

  const handleCreateRoom = async () => {
    const numberFloor = Number(Array.from(floorChosen)[0].split(' ')[1]);
    const waterType = Array.from(waterTypeChosen)[0];
    await createRoom({
      data: {
        name: roomName,
        apartmentId: data?.apartmentId,
        floor: numberFloor,
        waterType,
      },
      resetState,
      onClose,
    });
    onAction();
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Tạo mới phòng
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-row gap-[20px]">
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

                <CustomSelect
                  className="w-[33%]"
                  label="Loại nước"
                  value={waterTypeChosen}
                  setValue={setWaterTypeChosen}
                  data={['Nước khoáng', 'Nước M3']}
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
  );
};

export default CreateRoomModal;
