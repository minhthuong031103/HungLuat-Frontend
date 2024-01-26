import React from 'react';
import { Customer } from '@/types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  User,
  Pagination,
  Selection,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { CommonSvg } from '@/assets/CommonSvg';
import Loader from '../Loader';

interface CustomerProps {
  id: string;
  name: string;
  address: string;
  identity: string;
  temporaryResidence: boolean;
  plate: string;
}

interface dataTableProps {
  data: any[];
  currentPage: number;
  setCurrentPage: any;
  limit: string;
  setLimit?: any;
  totalPages: number;
  totalItems: number;
  keyName: string;
  search?: string | null;
  setSearch: any;
  renderRight?: any;
  renderCell?: any;
  isLoading?: boolean;
  columns: any;
  renderTableSize?: boolean;
}

interface ColumnProps {
  id: string;
  title: string;
  sortable?: boolean;
}

const limitOptions = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
];

export default function DataTable({
  data,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  totalPages,
  isLoading,
  totalItems,
  keyName,
  search = null,
  setSearch,
  renderRight,
  renderCell,
  columns,
  renderTableSize,
}: dataTableProps) {
  const headerColumns = React.useMemo(() => {
    return columns;
  }, []);

  // const onSearchChange = React.useCallback((value?: string) => {
  //     if (value) {
  //       setFilterValue(value);
  //       setPage(1);
  //     } else {
  //       setFilterValue("");
  //     }
  //   }, []);

  // const onClear = React.useCallback(()=>{
  //   setFilterValue("")
  //   setPage(1)
  // },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-10 items-center">
          <div className="flex gap-3">
            <Button
              // onPress={() => onOpen('createApartment')}
              className="rounded-[8px] px-4 py-2 bg-blueButton"
            >
              <div className="flex flex-row items-center gap-x-[8px] ">
                <div>{CommonSvg.plus()}</div>
                <div className="text-white mt-[1px] font-medium">Thêm</div>
              </div>
            </Button>
          </div>
          {renderTableSize ? (
            <>
              <Select
                label="Giới hạn"
                placeholder="Chọn giới hạn"
                className="w-[120px]"
                selectedKeys={[limit]}
                onChange={(e) => {
                  setLimit(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {limitOptions.map((limit) => (
                  <SelectItem key={limit.value} value={limit.value}>
                    {limit.label}
                  </SelectItem>
                ))}
              </Select>
              <div>
                Tổng số: <span className="font-semibold">{totalItems}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }, [data]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    );
  }, [currentPage, totalPages, data]);
  return isLoading ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <Table
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[700px]',
      }}
      topContent={topContent}
      selectionMode="single"
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {(column: ColumnProps) => (
          <TableColumn
            key={column.id}
            align={column.id === 'actions' ? 'center' : 'start'}
            style={{ backgroundColor: '#2458C6', color: 'white' }}
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={'No users found'} items={data}>
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
