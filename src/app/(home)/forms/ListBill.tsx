import { CommonSvg } from '@/assets/CommonSvg'
import DataTable from '@/components/datatable/Datatable'
import { VerticalDotsIcon } from '@/components/datatable/VerticalDotsIcon'

import { queryKey } from '@/lib/constant'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'

import React, { useState } from 'react'

import { exportBillProps, useRoom } from '@/hooks/useRoom'

interface ResponseProps {
  items: exportBillProps[]
  totalItems: number
  totalPages: number
}

const columnKeys = {
  numberFloor: 'numberFloor',
  name: 'name',
  customer: 'customer',
  pdfUrl: 'pdfUrl',
  action: 'action',
  endDate: 'endDate'
}

const columns = [
  {
    id: columnKeys.endDate,
    title: 'Ngày xuất phiếu',
    sortable: true
  },
  {
    id: columnKeys.numberFloor,
    title: 'Tầng',
    sortable: true
  },
  {
    id: columnKeys.name,
    title: 'Tên phòng',
    sortable: true
  },
  {
    id: columnKeys.customer,
    title: 'Tên khách hàng',
    sortable: true
  },
  {
    id: columnKeys.pdfUrl,
    title: 'File đính kèm',
    sortable: true
  },

  {
    id: columnKeys.action,
    title: 'Thao tác',
    sortable: false
  }
]

const NormalRenderCell = ({ cellValue }) => {
  return (
    <div className="flex flex-col">
      <p className="text-bold text-small ">{cellValue}</p>
    </div>
  )
}

const ListBill = ({ search, searchField, setSearch, apartmentId }) => {
  const [limit, setLimit] = useState('10')
  const [currentPage, setCurrentPage] = useState(1)
  const { getAllBills } = useRoom()
  const { data: billsApartment, isLoading } = useQuery<ResponseProps>({
    queryKey: [queryKey.BILLAPARTMENT, { currentPage, limit, search }],
    queryFn: async () => {
      const res = await getAllBills({
        apartmentId: apartmentId,
        page: currentPage,
        limit,
        search,
        searchField
      })
      return {
        ...res?.data,
        items: res?.data?.items.map((item) => ({
          ...item,
          name: item.room.name,
          numberFloor: item.room.floor,
          customer: item.room?.customer || 'Chưa có tên'
        }))
      }
    }
  })

  const renderCell = React.useCallback(
    (bills: exportBillProps, columnKey: React.Key) => {
      let cellValue = bills[columnKey]
      const nameInvoice = bills[columnKeys.name]
      if (columnKey === columnKeys.endDate) {
        cellValue = `Tháng ${new Date(cellValue).getMonth() + 1}/${new Date(
          cellValue
        ).getFullYear()}`
      }
      switch (columnKey) {
        case columnKeys.pdfUrl:
          return (
            <div className="flex flex-col ml-4">
              <a
                download={nameInvoice}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-small underline text-room-blue cursor-pointer"
                href={cellValue}
              >
                Tệp tin
              </a>
            </div>
          )
        case columnKeys.action:
          return (
            <div className="relative flex justify-start items-center gap-2 ml-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-black" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Xem chi tiết</DropdownItem>
                  <DropdownItem>Chỉnh sửa</DropdownItem>
                  <DropdownItem>Xóa</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return <NormalRenderCell cellValue={cellValue} />
      }
    },
    []
  )
  return (
    <>
      <div className="flex items-end justify-between mt-4">
        <p className="font-semibold font-lg text-gray">THÔNG TIN HÓA ĐƠN</p>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
          columns={columns}
          keyName={queryKey.BILLAPARTMENT}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          data={billsApartment?.items || []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={billsApartment?.totalPages || 0}
          totalItems={billsApartment?.totalItems || 0}
          limit={limit}
          setLimit={setLimit}
          renderCell={renderCell}
        />
      </div>
    </>
  )
}

export default ListBill
