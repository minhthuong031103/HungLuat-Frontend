import { useApiAxios } from '@/components/providers/ApiProvider';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getQueryParams } from '@/lib/utils';

import toast from 'react-hot-toast';

interface createBillProps {
  data: {
    userName: string;
    paymentType: string;
    paymentAmount: number;
    apartmentId: number;
    roomId: number;
    payDay: Date;
  };
  refetch: () => void;
}

export interface BillProps {
  id: number;
  userName: string;
  paymentType: string;
  paymentAmount: number;
  apartmentId: number;
  roomId: number;
  payDay: Date;
}

interface updateBillProps {
  data: BillProps;
  refetch: () => void;
}
export const useStatistics = () => {
  const { requestApi } = useApiAxios();

  const getAllBill = async ({
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/bill/all?${getQueryParams({
          page,
          limit,
          sortBy,
          sortDirection,
        })}`,
        method: 'GET',
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getEmployees ~ error:', error);
    }
  };
  const createPay = async ({ data, refetch }: createBillProps) => {
    try {
      const res = await requestApi({
        endPoint: `/payment/create`,
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_UPDATED.ENG) {
        toast.success(RETURNED_MESSAGES.ROOM.ROOM_UPDATED.VIE);
        refetch();
      } else if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_NOT_FOUND.ENG) {
        toast.error(RETURNED_MESSAGES.ROOM.ROOM_NOT_FOUND.VIE);
      } else {
        toast.error('Cập nhật phòng thất bại');
      }
    } catch (error) {
      toast.error('Cập nhật phòng thất bại');
    }
  };
  const editPay = async ({ data, refetch }: updateBillProps) => {
    try {
      const res = await requestApi({
        endPoint: `/payment/update`,
        method: 'PUT',
        body: data,
      });
      refetch();
      return res;
    } catch (error) {
      console.log('🚀 ~ createBill ~ error:', error);
    }
  };
  const deletePay = async ({ roomId, refetch }) => {
    try {
      const res = await requestApi({
        endPoint: `/bill/${roomId}`,
        method: 'DELETE',
      });
      refetch();
      return res;
    } catch (error) {
      console.log('🚀 ~ createBill ~ error:', error);
    }
  };
  const getAllPay = async ({
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/payment/all?${getQueryParams({
          page,
          limit,
          sortBy,
          sortDirection,
        })}`,
        method: 'GET',
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getEmployees ~ error:', error);
    }
  };
  return {
    getAllBill,
    createPay,
    editPay,
    deletePay,
    getAllPay,
  };
};
