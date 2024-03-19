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
import toast from 'react-hot-toast';

const EditRoomModal = () => {
  const { isOpen, onClose, type, data, onAction } = useModal();
  console.log('🚀 ~ EditRoomModal ~ data:', data);
  const [floor, setFloor] = useState([]);
  const [floorChosen, setFloorChosen] = useState(new Set<string>([]));
  const [waterTypeChosen, setWaterTypeChosen] = useState(new Set<string>([]));
  useEffect(() => {
    if (data && floor.length === 0 && data.numberFloor) {
      for (let i = 1; i <= data.numberFloor; i++) {
        setFloor((prev: any) => [...prev, `Tầng ${i}`] as any);
      }
    }
    setRoomName(data?.name || '');
    setWaterTypeChosen(new Set([data?.waterType || 'Nước khoáng']));
  }, [data]);
  useEffect(() => {
    if (data && floor.length > 0 && data.floor) {
      setFloorChosen(new Set([`Tầng ${data.floor}`]));
    }
  }, [data, floor]);
  const [roomName, setRoomName] = useState('');
  const isModalOpen = isOpen && type === 'editRoom';
  const { updateRoom } = useRoom();
  const resetState = () => {
    setFloor([]);
    setRoomName('');
    setFloorChosen(new Set<string>([]));
  };
  const handleEditRoom = async () => {
    const waterType = Array.from(waterTypeChosen)[0];
    if (
      roomName === '' ||
      Array.from(floorChosen)[0] === '' ||
      waterType === ''
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    await updateRoom({
      data: {
        name: roomName,
        waterType: waterType,
        floor: Number(Array.from(floorChosen)[0].split(' ')[1]),
        roomId: data.roomId,
      },
      refetch: onAction,
    });
    resetState();
    onClose();
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Cập nhật thông tin phòng
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
                  setValue={value => setFloorChosen(new Set(value))}
                  data={floor}
                  isRequired={true}
                />
              </div>
              <CustomSelect
                className="w-[33%]"
                label="Loại nước"
                value={waterTypeChosen}
                setValue={value => setWaterTypeChosen(new Set(value))}
                data={['Nước khoáng', 'Nước M3']}
                isRequired={true}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleEditRoom}
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

export default EditRoomModal;
