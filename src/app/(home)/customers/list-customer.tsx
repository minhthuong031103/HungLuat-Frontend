'use client'
import { CommonSvg } from '@/assets/CommonSvg'
import { Button } from '@nextui-org/react'
import { useModal } from '@/hooks/useModalStore'
import { Customer } from '@/types'
import CustomerTable from './customer-table'

interface ListCustomerProps {
  customers: Customer[]
}

const ListCustomer = ({ customers }: ListCustomerProps) => {
  const { onOpen } = useModal()
  return (
    <>
      <div className="flex items-end justify-between">
        <p className="font-semibold font-lg text-gray">DANH SÁCH KHÁCH TRỌ</p>
        <Button
          onPress={() => onOpen('createApartment')}
          className="rounded-[8px] px-4 py-2 bg-blueButton"
        >
          <div className="flex flex-row items-center gap-x-[8px] ">
            <div>{CommonSvg.plus()}</div>
            <div className="text-white mt-[1px] font-medium">Thêm mới</div>
          </div>
        </Button>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {customers?.map((customer, index) => (
          <CustomerTable key={index} customer={customer} />
        ))}
      </div>
    </>
  )
}

export default ListCustomer
