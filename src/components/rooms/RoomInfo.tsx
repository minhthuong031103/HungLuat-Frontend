import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { useRoom } from '@/hooks/useRoom';
import {
  convertPriceNotVND,
  insertSpaceEveryThreeCharacters,
} from '@/lib/utils';
import { Button, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { DatePicker } from '../ui/date-picker';
import { Textarea } from '../ui/text-area';
import BillTable from './BillTable';

interface IRoomInfo {
  id: number;
  contents: {
    label: string;
    type: string;
    placeholder: string;
    isRequired: boolean;
    isDisabled: boolean;
    value: string;
    setValue: (value: string) => void;
  }[];
}
const RoomInfo = ({ roomId, isLoading, refetch }) => {
  const { state, roomInfo1, roomInfo2, handleSetValue, updateRoomStates } =
    useRoom();
  console.log('🚀 ~ RoomInfo ~ state:', state);

  const roomStatus = ['Đang trống', 'Đã thuê', 'Đang sửa chữa'];
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
            <div className="w-full space-y-5">
              <p className="text-gray text-base font-medium">Tiền phòng</p>
              <div className="w-[70%] flex gap-10 items-center">
                <Select
                  label="Tình trạng phòng"
                  labelPlacement="outside"
                  isRequired={true}
                  placeholder="Chọn tình trạng phòng"
                  className="max-w-[50%]"
                  disallowEmptySelection
                  selectedKeys={state.roomStatus ? [state.roomStatus] : []}
                  onChange={e => {
                    handleSetValue('roomStatus', e.target.value);
                  }}
                >
                  {roomStatus.map(item => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
                <CustomInput
                  label="Giá phòng"
                  type="text"
                  placeholder="Nhập giá phòng"
                  isRequired
                  value={insertSpaceEveryThreeCharacters(state.roomPrice)}
                  setValue={value => {
                    const tempValue = value?.split(' ').join('');
                    handleSetValue('roomPrice', tempValue);
                  }}
                />
              </div>
              {state.waterType !== 'Nước M3'
                ? roomInfo1.slice(0, 3).map(item => (
                    <div
                      className="w-[70%] flex gap-10 items-center"
                      key={item.id}
                    >
                      {item.contents.map(content => (
                        <div
                          className="flex w-full items-center gap-3"
                          key={content.label}
                        >
                          <CustomInput
                            key={content.label}
                            label={content.label}
                            type={content.type}
                            placeholder={content.placeholder}
                            isRequired={content.isRequired}
                            disabled={content.isDisabled}
                            value={content.value}
                            setValue={content.setValue}
                          />
                          {content.label === 'Số lượng người ở thực tế' && (
                            <p className="text-black font-medium mt-6 text-base">
                              /4
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                : roomInfo2.slice(0, 3).map(item => (
                    <div
                      className="w-[70%] flex gap-10 items-center"
                      key={item.id}
                    >
                      {item.contents.map(content => (
                        <div
                          className="flex w-full items-center gap-3"
                          key={content.label}
                        >
                          <CustomInput
                            key={content.label}
                            label={content.label}
                            type={content.type}
                            placeholder={content.placeholder}
                            isRequired={content.isRequired}
                            disabled={content.isDisabled}
                            value={content.value}
                            setValue={content.setValue}
                          />
                          {content.label === 'Số lượng người ở thực tế' && (
                            <p className="text-black font-medium mt-6 text-base">
                              /4
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
            <div className="w-full space-y-5">
              <p className="text-gray text-base font-medium">Tiền dịch vụ</p>
              {state.waterType !== 'Nước M3'
                ? roomInfo1.slice(3).map(item => (
                    <div
                      className="w-[70%] flex gap-10 items-center"
                      key={item.id}
                    >
                      {item.contents.map(content => (
                        <CustomInput
                          key={content.label}
                          label={content.label}
                          type={content.type}
                          placeholder={content.placeholder}
                          isRequired={content.isRequired}
                          disabled={content.isDisabled}
                          value={content.value}
                          setValue={content.setValue}
                        />
                      ))}
                    </div>
                  ))
                : roomInfo2.slice(3).map(item => (
                    <div
                      className="w-[70%] flex gap-10 items-center"
                      key={item.id}
                    >
                      {item.contents.map(content => (
                        <CustomInput
                          key={content.label}
                          label={content.label}
                          type={content.type}
                          placeholder={content.placeholder}
                          isRequired={content.isRequired}
                          disabled={content.isDisabled}
                          value={content.value}
                          setValue={content.setValue}
                        />
                      ))}
                    </div>
                  ))}
              <div className="w-[70%]">
                <p className="text-gray text-base font-medium">Ghi chú</p>
                <Textarea
                  placeholder="Vui lòng nhập ghi chú (nếu có)"
                  value={state.note}
                  onChange={e => handleSetValue('note', e.target.value)}
                />
              </div>
              <div className="flex gap-8 items-center">
                <DatePicker
                  label="Chọn ngày bắt đầu"
                  date={state.startDate}
                  labelCustom="font-medium text-sm"
                  setDate={date => handleSetValue('startDate', date)}
                />
                <span className="flex mt-8 h-[1px] w-[15px] bg-gray rounded-full"></span>
                <DatePicker
                  label="Chọn ngày thanh toán"
                  labelCustom="font-medium text-sm"
                  date={state.endDate}
                  setDate={date => handleSetValue('endDate', date)}
                />
              </div>

              <div className="flex justify-end w-full">
                <Button
                  className="rounded-[8px] px-4 py-4 bg-blueButton"
                  onPress={() => updateRoomStates({ roomId, refetch })}
                >
                  <div className="flex flex-row items-center gap-x-[8px] ">
                    <div className="text-white mt-[1px] font-medium">
                      Cập nhật
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <p className="text-gray text-lg font-bold">
              Thông tin hóa đơn tháng trước
              <BillTable roomId={roomId} />
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default RoomInfo;
