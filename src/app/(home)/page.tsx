'use client';

import { SearchBar } from './(components)/home/searchbar';
import ListApartment from './(components)/home/list-apartment';
import { useEffect, useState } from 'react';
import { useApartment } from '@/hooks/useApartment';
import { ChevronDown } from 'lucide-react';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { Apartment } from '@/types';
import { CommonSvg } from '@/assets/CommonSvg';
import { useModal } from '@/hooks/useModalStore';
interface ResponseProps {
  items: Apartment[];
  totalItems: number;
  totalPages: number;
}
const page = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { getApartments } = useApartment();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;
  const {
    data: apartments,
    isLoading,
    refetch,
  } = useQuery<ResponseProps>({
    queryKey: [
      queryKey.APARTMENTS,
      { currentPage, limit: 10, searchValue, searchField: 'name', userId },
    ],
    queryFn: async () => {
      const res = await getApartments({
        page: currentPage,
        limit: 10,
        search: searchValue,
        searchField: 'name',
      });
      return res?.data;
    },
  });
  const { onOpen } = useModal();
  const user = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}');
  return (
    <>
      <div className="w-full p-3 border-1 drop-shadow border-borderColor rounded-lg">
        <p className="font-medium text-sm text-black">Tìm kiếm</p>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setCurrentPage={setCurrentPage}
        />
        <div className="w-fit pb-2 flex items-center gap-3 cursor-pointer group">
          <p className="font-medium text-base text-gray group-hover:font-semibold group-hover:scale-105">
            Tìm kiếm nâng cao
          </p>
          <ChevronDown
            className="text-gray group-hover:font-semibold group-hover:scale-105"
            size={18}
          />
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <p className="font-semibold font-lg text-gray">Danh sách căn hộ</p>
        {user?.roleName === 'Admin' && (<Button
          onPress={() => onOpen('createApartment', {}, refetch)}
          className="rounded-[8px] px-4 py-2 bg-blueButton"
        >
          <div className="flex flex-row items-center gap-x-[8px] ">
            <div>{CommonSvg.plus()}</div>
            <div className="text-white mt-[1px] font-medium">Thêm mới</div>
          </div>
        </Button>)}
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[200px]">
          <Spinner />
        </div>
      ) : apartments?.items.length === 0 ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <p className="font-medium text-base text-room-detail/50">
            Không có dữ liệu...
          </p>
        </div>
      ) : (
        <div className="w-full h-full mt-4">
          <ListApartment
            apartments={apartments?.items || []}
            onAction={refetch}
          />
          <div className="py-8 px-2 flex justify-center items-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage}
              total={apartments?.totalPages || 1}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
