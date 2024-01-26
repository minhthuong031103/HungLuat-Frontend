import { CustomInput } from '@/app/(home)/(components)/home/custom-input'
import { CustomSelect } from '@/app/(home)/(components)/home/custom-select'
import { useRoom } from '@/hooks/useRoom'
import { DatePicker } from '../ui/date-picker'
import BillTable from './BillTable'

const RoomInfo = () => {
  const { state, roomInfo, handleSetValue } = useRoom()
  return (
    <div className="w-full h-full space-y-4">
      <div className="w-full flex flex-col space-y-3">
        <p className="text-gray text-lg font-medium">Thông tin phòng</p>
        <div className="w-full space-y-5">
          <p className="text-gray text-base font-medium">Tiền phòng</p>
          <div className="w-[70%] flex gap-10 items-center">
            <CustomSelect
              label="Tình trạng phòng"
              isRequired={true}
              value={state.statusRoom}
              className="max-w-[50%]"
              setValue={(value) => handleSetValue('statusRoom', value)}
              data={['Đang trống', 'Đang thuê', 'Đang sửa chữa']}
            />
            <CustomInput
              label="Giá phòng"
              type="number"
              placeholder="Nhập giá phòng"
              isRequired
              value={state.roomPrice}
              setValue={(value) => handleSetValue('roomPrice', value)}
            />
          </div>
          {roomInfo.slice(0, 3).map((item) => (
            <div className="w-[70%] flex gap-10 items-center" key={item.id}>
              {item.contents.map((content) => (
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
                    <p className="text-black font-medium mt-6 text-base">/4</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full space-y-5">
          <p className="text-gray text-base font-medium">Tiền dịch vụ</p>
          {roomInfo.slice(3).map((item) => (
            <div className="w-[70%] flex gap-10 items-center" key={item.id}>
              {item.contents.map((content) => (
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
          <div className="flex gap-20 items-center">
            <DatePicker
              label="Chọn ngày bắt đầu"
              date={state.startDate}
              labelCustom="font-medium text-sm"
              setDate={(date) => handleSetValue('startDate', date)}
            />
            <DatePicker
              label="Chọn ngày thanh toán"
              labelCustom="font-medium text-sm"
              date={state.endDate}
              setDate={(date) => handleSetValue('endDate', date)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-5">
        <p className="text-gray text-lg font-medium">
          Thông tin hóa đơn tháng trước
          <BillTable apartmentId="1" roomId="1" />
        </p>
      </div>
    </div>
  )
}
export default RoomInfo
