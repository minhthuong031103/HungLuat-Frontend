import DataTable from '@/components/datatable/Datatable'
import { queryKey } from '@/lib/constant'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox
} from '@nextui-org/react'
import { VerticalDotsIcon } from '@/components/datatable/VerticalDotsIcon'
import { useRoom } from '@/hooks/useRoom'
interface BillProps {
  id: string
  name: string
  date: string
}

interface ResponseProps {
  items: BillProps[]
  totalItems: number
  totalPages: number
}
interface BillTaleProps {
  apartmentId: string
  roomId: string
}
const columnKeys = {
  id: 'id',
  name: 'name',
  date: 'date'
}

const columns = [
  {
    id: columnKeys.id,
    title: 'STT',

    sortable: true
  },
  {
    id: columnKeys.date,
    title: 'Tháng',

    sortable: true
  },
  {
    id: columnKeys.name,
    title: 'Tên khách hàng',
    sortable: true
  }
]

const NormalRenderCell = ({ cellValue }) => {
  return (
    <div className="flex flex-col">
      <p className="text-bold text-small ">{cellValue}</p>
    </div>
  )
}

const BillTable = ({ apartmentId, roomId }: BillTaleProps) => {
  const [limit, setLimit] = useState('10')
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState(null)

  const { getBills } = useRoom()
  const { data: bills, isLoading } = useQuery({
    queryKey: [queryKey.BILL, { apartmentId, roomId }],
    queryFn: async () => {
      const res = await getBills({
        apartmentId: apartmentId,
        roomId: roomId
      })
      return res?.data
    }
  })

  const renderCell = React.useCallback(
    (bill: BillProps, columnKey: React.Key) => {
      const cellValue = bill[columnKey]

      return <NormalRenderCell cellValue={cellValue} />
    },
    []
  )
  return (
    <>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
          columns={columns}
          keyName={queryKey.BILL}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          data={bills?.items || []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={bills?.totalPages || 0}
          totalItems={bills?.totalItems || 0}
          limit={limit}
          setLimit={setLimit}
          renderCell={renderCell}
        />
      </div>
    </>
  )
}

export default BillTable
