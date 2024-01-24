import { useRoom } from '@/hooks/useRoom'
import { useEffect, useState } from 'react'
import RoomCard from './room-card'

interface ListRoomsProps {
  apartmentId: string
}
const ListRooms = ({ apartmentId }: ListRoomsProps) => {
  const [floors, setFloors] = useState([])
  const { getRooms } = useRoom()
  useEffect(() => {
    const handleGetRooms = async () => {
      const res = await getRooms({ apartmentId: apartmentId })
      setFloors(res.data.rooms)
    }
    if (apartmentId) {
      handleGetRooms()
    }
  }, [apartmentId])

  return (
    <div className="w-full h-auto space-y-4">
      {floors.map((floor) => {
        return (
          <div className="w-full h-full shrink-0 space-y-2">
            <p className="text-base text-black font-bold">Tầng{floor.floor}</p>
            <div className="w-full grid gap-[10px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
              {floor.rooms.map((room) => {
                return <RoomCard room={room} />
              })}
              {floor.rooms.map((room) => {
                return <RoomCard room={room} />
              })}
              {floor.rooms.map((room) => {
                return <RoomCard room={room} />
              })}
              {floor.rooms.map((room) => {
                return <RoomCard room={room} />
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListRooms
