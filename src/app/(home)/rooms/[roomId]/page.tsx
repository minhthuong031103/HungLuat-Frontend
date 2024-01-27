'use client'
import RoomInfo from '@/components/rooms/RoomInfo'
import { useModal } from '@/hooks/useModalStore'
import { useRoom } from '@/hooks/useRoom'
import { queryKey } from '@/lib/constant'
import { cn } from '@/lib/utils'
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const RoomDetailPage = () => {
  const { roomId } = useParams()
  const classNameChosen = 'font-semibold text-sm text-white'
  const classNameNotChosen = 'font-medium text-sm text-black'
  const [flag, setFlag] = useState('finance')
  const { onOpen } = useModal()

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
      action: () => {
        onOpen('contractRoom')
      }
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
  const { getDetailRoom, dispatch } = useRoom()
  const {
    data: roomDetail,
    refetch,
    isLoading
  } = useQuery({
    queryKey: [queryKey.ROOMDETAILS, { roomId }],
    queryFn: async () => {
      const res = await getDetailRoom({
        roomId: roomId
      })
      if (res?.data && res?.data?.startDate && res?.data?.endDate) {
        const endDate = new Date(res?.data?.endDate)
        const startDate = new Date(res?.data?.startDate)
        const dayStayed = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        )
        if (
          endDate.getMonth() === new Date().getMonth() &&
          endDate.getFullYear() === new Date().getFullYear()
        ) {
          dispatch({
            type: 'SET_VALUES',
            payload: { ...res?.data, endDate: endDate, startDate: startDate }
          })
        } else {
          dispatch({
            type: 'SET_VALUES',
            payload: {
              ...res?.data,
              startDate: new Date(new Date().setDate(1)),
              endDate: new Date(),
              dayStayed: dayStayed
            }
          })
        }
      }
      return res?.data
    }
  })
  return (
    <div className="pt-2 space-y-4">
      <Breadcrumbs>
        <BreadcrumbItem href="/rooms">Danh sách phòng</BreadcrumbItem>
        <BreadcrumbItem>{roomDetail?.name}</BreadcrumbItem>
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
      <div>
        {flag === 'finance' && (
          <RoomInfo roomId={roomId} refetch={refetch} isLoading={isLoading} />
        )}
      </div>
    </div>
  )
}

export default RoomDetailPage
