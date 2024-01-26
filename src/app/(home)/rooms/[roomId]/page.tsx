'use client'
import RoomInfo from '@/components/rooms/RoomInfo'
import { useModal } from '@/hooks/useModalStore'
import { useRoom } from '@/hooks/useRoom'
import { cn } from '@/lib/utils'
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const RoomDetailPage = () => {
  const { roomId } = useParams()
  const classNameChosen = 'font-semibold text-sm text-white'
  const classNameNotChosen = 'font-medium text-sm text-black'
  const { getDetailRoom } = useRoom()
  const [flag, setFlag] = useState('finance')
  const { onOpen } = useModal()
  const { data: roomDetail, refetch } = getDetailRoom({ roomId: roomId })
  const render = [
    {
      name: 'Tài chính phòng',
      key: 'finance'
    },
    {
      name: 'Danh sách khách thuê',
      key: 'listUser'
    },
    {
      name: 'Cấu hình phòng',
      key: 'setting'
    }
  ]
  const buttonRender = [
    {
      content: 'Hợp đồng',
      action: () => {}
    },
    {
      content: 'Xuất phiếu',
      action: () => {
        onOpen('exportBill')
      }
    },
    {
      content: 'Đổi phòng',
      action: () => {
        onOpen('createRoom', {
          numberFloor: 5,
          apartmentId: 1
        })
      }
    }
  ]
  return (
    <div className="pt-2 space-y-4">
      <Breadcrumbs>
        <BreadcrumbItem href="/rooms">Danh sách phòng</BreadcrumbItem>
        <BreadcrumbItem>P1-Chi</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex items-end pt-3">
        {render?.map((item) => (
          <div
            key={item.key}
            className={cn(
              'flex items-center justify-center p-2 border-1 cursor-pointer',
              flag === item.key && 'bg-gray pointer-events-none'
            )}
            onClick={() => setFlag(item.key)}
          >
            <p
              className={
                flag === item.key ? classNameChosen : classNameNotChosen
              }
            >
              {item.name}
            </p>
          </div>
        ))}
        <div className="ml-auto gap-3 flex">
          {buttonRender?.map((item) => (
            <div key={item.content}>
              <Button
                className="rounded-[8px] px-4 py-2 bg-blueButton"
                onPress={item.action}
              >
                <div className="flex flex-row items-center gap-x-[8px] ">
                  <div className="text-white mt-[1px] font-medium">
                    {item.content}
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>{flag === 'finance' && <RoomInfo />}</div>
    </div>
  )
}

export default RoomDetailPage
