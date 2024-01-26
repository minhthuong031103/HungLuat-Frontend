import DataTable from '@/components/datatable/Datatable';
import { queryKey } from '@/lib/constant';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Checkbox,
} from '@nextui-org/react';
import { useCustomer } from '@/hooks/useCustomer';
import { ChevronDown } from 'lucide-react';
import { VerticalDotsIcon } from '@/components/datatable/VerticalDotsIcon';
import { SearchBar } from '@/app/(home)/(components)/home/searchbar';
interface CustomerProps {
    id: string;
    title: string;
    phone: string;
    address: string;
    identityCard: string;
    city: string;
    district: string;
    ward: string;
    houseNumber: string;
    registeredTemporaryResidence: boolean;
    plate: string;
}

interface ResponseProps {
    items: CustomerProps[];
    totalItems: number;
    totalPages: number;
}

const columnKeys = {
    name: 'name',
    phone: 'phone',
    address: 'address',
    identityCard: 'identityCard',
    registeredTemporaryResidence: 'registeredTemporaryResidence',
    roomId: 'roomId',
    action: 'action',
};

const columns = [
    {
        id: columnKeys.name,
        title: 'Họ tên',
        sortable: true,
    },
    {
        id: columnKeys.phone,
        title: 'Số điện thoại',
        sortable: false,
    },
    {
        id: columnKeys.address,
        title: 'Địa chỉ',
        sortable: false,
    },
    {
        id: columnKeys.identityCard,
        title: 'CMND/CCCD',
        sortable: false,
    },

    {
        id: columnKeys.registeredTemporaryResidence,
        title: 'Tạm trú',
        sortable: true,
    },
    {
        id: columnKeys.roomId,
        title: 'Phòng',
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

const RoomCustomer = () => {
    const [limit, setLimit] = useState('10');
    const [currentPage, setCurrentPage] = useState(1);
    const { getCustomers } = useCustomer();
    const { data: customers, isLoading } = useQuery<ResponseProps>({
        queryKey: [queryKey.CUSTOMERS, { currentPage, limit }],
        queryFn: async () => {
            const res = await getCustomers({
                page: currentPage,
                limit,
            });
            return res?.data;
        },
    });

    const renderCell = React.useCallback(
        (user: CustomerProps, columnKey: React.Key) => {
            const cellValue = user[columnKey];

            switch (columnKey) {
                case columnKeys.registeredTemporaryResidence:
                    return (
                        <div className="flex items-center justify-start ml-3">
                            <Checkbox
                                color="success"
                                disabled
                                isSelected={cellValue}
                            ></Checkbox>
                        </div>
                    );
                case columnKeys.action:
                    return (
                        <div className="relative flex w-24 justify-left items-center gap-2">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly size="sm" variant="light">
                                        <VerticalDotsIcon className="text-black" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem>View</DropdownItem>
                                    <DropdownItem>Edit</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                default:
                    return <NormalRenderCell cellValue={cellValue} />;
            }
        },
        []
    );
    return (
        <>

            <div className="flex items-end justify-between mt-4">
                <p className="font-semibold font-lg text-gray">DANH SÁCH KHÁCH THUÊ PHÒNG</p>
            </div>
            <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
                <DataTable
                    columns={columns}
                    keyName={queryKey.CUSTOMERS}
                    isLoading={isLoading}
                    data={customers?.items || []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={customers?.totalPages || 0}
                    totalItems={customers?.totalItems || 0}
                    limit={limit}
                    setLimit={setLimit}
                    renderCell={renderCell}
                    renderTableSize={false} setSearch={undefined} />
            </div>
        </>
    );
};

export default RoomCustomer;
