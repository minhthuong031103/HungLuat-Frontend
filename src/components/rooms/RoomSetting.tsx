'use client';
import { useSettingRoom } from '@/hooks/useSettingRoom';
import { Select, SelectItem, Spinner } from '@nextui-org/react';

import { useState } from 'react';

const RoomSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { settingRoomState, handleSetSettingRoom } = useSettingRoom();
  const renderSelectRoomState = [
    {
      id: 1,
      label: 'Loại phòng',
      value: settingRoomState.typeRoom,
      setValue: e => handleSetSettingRoom('typeRoom', e),
      data: [
        {
          id: 1,
          label: 'Phòng trọ',
          value: 'Phòng trọ',
        },
        {
          id: 2,
          label: 'Chung cư',
          value: 'Chung cư',
        },
      ],
    },
  ];
  return (
    <>
      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-full space-y-4">
          <div className="w-full flex flex-col space-y-3">
            <p className="text-gray text-lg font-semibold">Thông tin phòng</p>
            {renderSelectRoomState.map(item => (
              <Select
                key={item.id}
                label={item.label}
                placeholder="Chọn"
                labelPlacement="outside"
                selectedKeys={[item.value]}
                onChange={e => {
                  item.setValue(e.target.value);
                }}
              >
                {item.data.map(data => (
                  <SelectItem key={data.id} value={data.value}>
                    {data.label}
                  </SelectItem>
                ))}
              </Select>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default RoomSetting;
