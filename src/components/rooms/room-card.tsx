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
import { useModal } from '@/hooks/useModalStore'
import { useRouter } from 'next/navigation'
interface RoomCardProps {
  room: Room
}
const RoomCard = ({ room }: RoomCardProps) => {
  const { onOpen } = useModal()
  const router = useRouter()
  return (
    <Card
      className="max-w-[174px] h-[300px]"
      classNames={{
        header: 'p-0 flex relative',
        base: 'rounded-none drop-shadow border-1 border-borderColor bg-white'
      }}
    >
      <CardHeader onClick={() => router.push(`/rooms/${room.id}`)}>
        <div className="w-[174px] h-[10px] bg-room-green cursor-pointer"></div>
        <RoomDropdown
          className="absolute top-[18px] right-2 z-50 cursor-pointer hover:scale-105 border-1 rounded-full drop-shadow"
          actionType="editRoom"
        />
      </CardHeader>
      <Divider />
      <CardBody
        className="gap-4 cursor-pointer"
        onClick={() => router.push(`/rooms/${room.id}`)}
      >
        <p className="text-sm font-semibold text-black">{room.name}</p>
        <div className="space-y-3.5">
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Số người</p>
            <p className="text-black font-semibold text-xs ml-auto">4</p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Tiền phòng</p>
            <p className="text-black font-semibold text-xs ml-auto">
              {room.roomPrice}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-xs">Tiền cọc</p>
            <p className="text-black font-semibold text-xs ml-auto">
              {room.depositPrice}
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
        <RoomAction
          onAction={() => {
            onOpen('exportBill')
          }}
          status={true}
        />
      </CardFooter>
    </Card>
  )
}
export default RoomCard
