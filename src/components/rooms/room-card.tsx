import { Room } from '@/types'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider
} from '@nextui-org/react'
import RoomAction from './room-action'
import RoomDropdown from '@/app/(home)/(components)/home/room-dropdown'
interface RoomCardProps {
  room: Room
}
const RoomCard = ({ room }: RoomCardProps) => {
  console.log(room)
  return (
    <Card
      className="max-w-[174px] h-[300px]"
      classNames={{
        header: 'p-0 flex relative',
        base: 'rounded-none drop-shadow border-1 border-borderColor bg-white'
      }}
    >
      <CardHeader>
        <div className="w-[174px] h-[10px] bg-room-green"></div>
        <RoomDropdown
          className="absolute top-[18px] right-2 z-50 cursor-pointer hover:scale-105 border-1 rounded-full drop-shadow"
          actionType="editApartment"
        />
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        <p className="text-sm font-semibold text-black">{room.name}</p>
        <div className="space-y-3.5">
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Số người</p>
            <p className="text-black font-semibold text-xs ml-auto">4</p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Tiền phòng</p>
            <p className="text-black font-semibold text-xs ml-auto">
              {room.rent}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Tiền cọc</p>
            <p className="text-black font-semibold text-xs ml-auto">
              {room.deposit}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Tạm thu</p>
            <p className="text-black font-semibold text-xs ml-auto">
              {room.suspenseMoney}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Nợ</p>
            <p className="text-black font-semibold text-xs ml-auto">
              {room.debt}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Thực thu</p>
            <p className="text-black font-semibold text-xs ml-auto">
              {room.netProceeds}
            </p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-center">
        <RoomAction />
      </CardFooter>
    </Card>
  )
}
export default RoomCard
