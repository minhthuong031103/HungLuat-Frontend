import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image
} from '@nextui-org/react'
import RoomDropdown from './room-dropdown'
import { CommonSvg } from '@/assets/CommonSvg'
import { Apartment } from '@/types'
import { imageApartment } from '@/lib/constant'
interface ApartmentCardProps {
  apartment: Apartment
}
const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  return (
    <Card
      className="max-w-[359px] max-h-[533px]"
      classNames={{
        header: 'p-0 flex relative',
        base: 'rounded-none'
      }}
    >
      <CardHeader>
        <Image
          alt="Apartment"
          height={186}
          radius="none"
          src={apartment.url ? apartment.url : imageApartment}
          width={359}
        />
        <RoomDropdown
          className="absolute top-2 right-2 z-50 cursor-pointer hover:scale-105"
          actionType="editApartment"
        />
      </CardHeader>
      <Divider />
      <CardBody className="gap-[5px]">
        <p className="font-bold text-gray text-lg uppercase">
          {apartment.name}
        </p>
        <div className="flex flex-col gap-2 h-fit">
          <div className="flex gap-2">
            <div>{CommonSvg.address()}</div>
            <p className="text-black font-semibold text-sm ">
              {apartment.address}
            </p>
          </div>
          <div className="flex gap-2">
            {CommonSvg.floor()}
            <p className="text-black font-semibold text-sm">
              {apartment.numberFloor | 0} tầng
            </p>
          </div>
          <div className="flex gap-2">
            {CommonSvg.room()}
            <p className="text-black font-semibold text-sm">
              {apartment.rooms | 0} phòng
            </p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col gap-[5px] h-fit w-full">
          <div className="flex items-center">
            <p className="text-cardDetail font-medium text-sm">Đang ở</p>
            <p className="text-black font-semibold text-base ml-auto">
              {apartment.stayed | 0}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-cardDetail font-medium text-sm">Sắp trả</p>
            <p className="text-black font-semibold text-base ml-auto">
              {apartment.sap_tra | 0}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-cardDetail font-medium text-sm">Đã cọc</p>
            <p className="text-black font-semibold text-base ml-auto">
              {apartment.dacoc | 0}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-cardDetail font-medium text-sm">Trống</p>
            <p className="text-black font-semibold text-base ml-auto">
              {apartment.empty | 0}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ApartmentCard
