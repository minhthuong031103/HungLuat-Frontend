'use client';

import { CommonSvg } from '@/assets/CommonSvg';
import DataTable from '@/components/datatable/Datatable';
import { VerticalDotsIcon } from '@/components/datatable/VerticalDotsIcon';
import { useApartment } from '@/hooks/useApartment';
import { useModal } from '@/hooks/useModalStore';

import { BillProps, useStatistics } from '@/hooks/useStatistics';
import { EModalType, KEY_CONTEXT, queryKey } from '@/lib/constant';
import { IncomeProps } from '@/lib/interface';
import { convertPrice, convertPrismaTimeToDateTime } from '@/lib/utils';
import { Apartment } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface ResponseProps {
  items: BillProps[];
  totalItems: number;
  totalPages: number;
}

const columnKeys = {
  apartmentName: 'apartmentName',
  roomName: 'roomName',
  payDay: 'payDay',
  paymentAmount: 'paymentAmount',
  userName: 'userName',
  paymentType: 'paymentType',
  action: 'action',
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
    id: columnKeys.paymentType,
    title: 'Loại chi',
  },
  {
    id: columnKeys.userName,
    title: 'Nhân viên chi',
  },
  {
    id: columnKeys.payDay,
    title: 'Ngày chi',
  },
  {
    id: columnKeys.paymentAmount,
    title: 'Tổng tiền chi',
  },
  {
    id: columnKeys.action,
    title: 'Thao tác',
    sortable: false,
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
  const { getAllPay } = useStatistics();
  const { onOpen } = useModal();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [apartmentChosen, setApartmentChosen] = useState('');
  const { getApartments } = useApartment();

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
  const {
    data: bills,
    isLoading,
    refetch,
  } = useQuery<ResponseProps>({
    queryKey: [
      queryKey.PAYMENTS,
      { currentPage, limit, userId, apartmentChosen },
    ],
    queryFn: async () => {
      const res = await getAllPay({
        page: currentPage,
        limit,
        apartmentId: apartmentChosen,
      });
      return {
        items: res?.data?.items.map((item: any) => ({
          id: item.id,
          payDay: convertPrismaTimeToDateTime(item?.payDay),
          userName: item?.userName || 'Không tìm thấy',
          apartmentName: item?.apartment?.name,
          apartmentId: item?.apartment?.id,
          roomId: item?.room?.id,
          payMoney: item?.paymentAmount,
          payDayDefault: item?.payDay,
          roomName: item?.room?.name,
          paymentType: item?.paymentType,
          paymentAmount: convertPrice(item?.paymentAmount),
        })),
        totalItems: res?.data?.totalItems,
        totalPages: res?.data?.totalPages,
      };
    },
  });
  const renderCell = React.useCallback(
    (bill: BillProps, columnKey: React.Key) => {
      const cellValue = bill[columnKey];
      switch (columnKey) {
        case columnKeys.action:
          return (
            <div className="relative flex w-24 ml-3 items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-black" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => onOpen('editPay', bill, refetch)}
                  >
                    Chỉnh sửa
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => onOpen(EModalType.PAY_DELETE, bill, refetch)}
                  >
                    Xóa
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <NormalRenderCell cellValue={cellValue} />;
      }
    },
    [],
  );
  return (
    <>
      <div className="w-full h-full flex items-center">
        <p className="font-semibold text-lg text-gray">QUẢN LÝ CHI</p>
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
          renderHeader={() => {
            return (
              <Button
                onPress={() => onOpen('addPay', {}, refetch)}
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
