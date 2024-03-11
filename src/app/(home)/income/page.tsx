'use client';

import DataTable from '@/components/datatable/Datatable';
import { useApartment } from '@/hooks/useApartment';

import { useStatistics } from '@/hooks/useStatistics';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { IncomeProps } from '@/lib/interface';
import { convertPrice, convertPrismaTimeToDateTime } from '@/lib/utils';
import { Apartment } from '@/types';
import { Select, SelectItem } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
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
    id: columnKeys.userName,
    title: 'Nhân viên thu',
  },
  {
    id: columnKeys.endDate,
    title: 'Ngày thu',
  },
  {
    id: columnKeys.totalPrice,
    title: 'Tổng tiền thu',
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
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const [searchValue, setSearchValue] = useState('');
  const [apartmentChosen, setApartmentChosen] = useState('');
  const { getApartments } = useApartment();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: apartments,
    fetchNextPage,
    hasNextPage,
    refetch: refetchData,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [queryKey.APARTMENTS_SELECT, { currentPage, limit: 10, userId }],
    ({ pageParam = 0 }) =>
      getApartments({
        page: pageParam,
        limit: 10,
        search: searchValue,
        searchField: 'name',
      }),
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (
          lastPage?.data.currentPage === 1 &&
          pages?.length < lastPage?.data.totalPages
        )
          return 2;
        if (pages?.length < lastPage?.data.totalPages) return pages?.length;
        else return undefined;
      },
    },
  );
  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    hasMore: hasNextPage,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore: () => {
      fetchNextPage();
    },
  });

  const { data: bills, isLoading } = useQuery<ResponseProps>({
    queryKey: [queryKey.BILL, { currentPage, limit, userId, apartmentChosen }],
    queryFn: async () => {
      const res = await getAllBill({
        page: currentPage,
        limit,
        apartmentId: apartmentChosen,
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
      <div className="w-full h-full flex items-center">
        <p className="font-semibold text-lg text-gray">QUẢN LÝ THU</p>
        <div className="flex gap-4 items-center ml-auto">
          <Select
            placeholder="Tất cả căn hộ"
            className="w-[250px]"
            selectedKeys={apartmentChosen ? [apartmentChosen] : []}
            isLoading={isFetching}
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            classNames={{
              selectorIcon: 'text-gray',
              value:
                'text-gray uppercase font-semibold text-lg group-data-[has-value=true]:text-gray',
              trigger:
                'data-[hover=true]:bg-white group-data-[focused=true]:bg-white bg-white',
            }}
            onChange={e => {
              setApartmentChosen(e.target.value);
              setCurrentPage(1);
            }}
          >
            {apartments ? (
              apartments?.pages?.map(page =>
                page?.data?.items?.map((item: Apartment) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                )),
              )
            ) : (
              <SelectItem key={''}></SelectItem>
            )}
          </Select>
        </div>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
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
