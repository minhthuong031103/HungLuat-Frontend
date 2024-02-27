import { useApiAxios } from '@/components/providers/ApiProvider';
import { EmployeeProps } from '@/lib/interface';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getQueryParams } from '@/lib/utils';

import toast from 'react-hot-toast';

export const useEmployee = () => {
  const { requestApi } = useApiAxios();

  const createEmployee = async (data: EmployeeProps, onClose: () => void) => {
    try {
      const res = await requestApi({
        endPoint: '/user/create',
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.AUTH.USER_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.AUTH.USER_CREATED.VIE);
        onClose();
      } else if (res?.message == RETURNED_MESSAGES.AUTH.USER_EXISTED.ENG) {
        toast.error(RETURNED_MESSAGES.AUTH.USER_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createUser ~ error:', error);
    }
  };

  const getEmployees = async ({
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/user/all?${getQueryParams({
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
    getEmployees,
    createEmployee,
  };
};
