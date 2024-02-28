import { useApiAxios } from '@/components/providers/ApiProvider';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getQueryParams } from '@/lib/utils';

import toast from 'react-hot-toast';

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

  return {
    getAllBill,
  };
};
