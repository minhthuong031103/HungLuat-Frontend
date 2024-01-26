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

      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <CustomerTable />
      </div>
    </>
  )
}

export default ListCustomer
