'use client';

import { CommonSvg } from '@/assets/CommonSvg';
import DataTable from '@/components/datatable/Datatable';
import { useModal } from '@/hooks/useModalStore';

import { useStatistics } from '@/hooks/useStatistics';
import { queryKey } from '@/lib/constant';
import { IncomeProps } from '@/lib/interface';
import { convertPrice, convertPrismaTimeToDateTime } from '@/lib/utils';
import { Button } from '@nextui-org/react';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface ResponseProps {
  items: IncomeProps[];
  totalItems: number;
  totalPages: number;
}

const columnKeys = {
  apartmentName: 'apartmentName',
  roomName: 'roomName',
  endDate: 'endDate',
  totalPrice: 'totalPrice',
  userName: 'userName',
  payType: 'payType',
};

const columns = [
  {
    id: columnKeys.apartmentName,
    title: 'Tên căn hộ',
    sortable: true,
  },
  {
    id: columnKeys.roomName,
    title: 'Tên phòng',
    sortable: true,
  },
  {
    id: columnKeys.payType,
    title: 'Loại chi',
  },
  {
    id: columnKeys.userName,
    title: 'Nhân viên chi',
  },
  {
    id: columnKeys.endDate,
    title: 'Ngày chi',
  },
  {
    id: columnKeys.totalPrice,
    title: 'Tổng tiền chi',
  },
];

const NormalRenderCell = ({ cellValue }) => {
  return (
    <div className="flex flex-col">
      <p className="text-bold text-small ">{cellValue}</p>
    </div>
  );
};

const UserPage = () => {
  const [limit, setLimit] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const { getAllBill } = useStatistics();
  const { onOpen } = useModal();
  const { data: bills, isLoading } = useQuery<ResponseProps>({
    queryKey: [queryKey.BILL, { currentPage, limit }],
    queryFn: async () => {
      const res = await getAllBill({
        page: currentPage,
        limit,
      });
      return {
        items: res?.data?.items.map((item: any) => ({
          id: item.id,
          endDate: convertPrismaTimeToDateTime(item?.endDate),
          userName: item?.userName || 'Không tìm thấy',
          apartmentName: item?.apartment?.name,
          roomName: item?.room?.name,
          totalPrice: convertPrice(item?.room?.netProceeds),
        })),
        totalItems: res?.data?.totalItems,
        totalPages: res?.data?.totalPages,
      };
    },
  });
  const renderCell = React.useCallback(
    (user: IncomeProps, columnKey: React.Key) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        default:
          return <NormalRenderCell cellValue={cellValue} />;
      }
    },
    [],
  );
  return (
    <>
      <div className="flex items-end justify-between ">
        <p className="font-semibold font-lg text-gray">QUẢN LÝ CHI</p>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
          renderHeader={() => {
            return (
              <Button
                onPress={() => onOpen('createEmployee', {})}
                className="rounded-[8px] px-4 py-2 bg-blueButton"
              >
                <div className="flex flex-row items-center gap-x-[8px] ">
                  <div>{CommonSvg.plus()}</div>
                  <div className="text-white mt-[1px] font-medium">
                    Thêm phiếu chi
                  </div>
                </div>
              </Button>
            );
          }}
          columns={columns}
          keyName={queryKey.BILL}
          isLoading={isLoading}
          data={bills?.items || []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={bills?.totalPages || 0}
          totalItems={bills?.totalItems || 0}
          limit={limit}
          setLimit={setLimit}
          setSearch={{}}
          renderCell={renderCell}
        />
      </div>
    </>
  );
};

export default UserPage;
