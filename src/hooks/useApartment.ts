import { useApiAxios } from '@/components/providers/ApiProvider';
import { CreateApartmentProps } from '@/lib/interface';
import { RETURNED_MESSAGES } from '@/lib/translate';
import toast from 'react-hot-toast';

export const useApartment = () => {
  const { requestApi } = useApiAxios();
  const createApartment = async (
    data: CreateApartmentProps,
    resetState: () => void,
    onClose: () => void
  ) => {
    try {
      const res = await requestApi({
        endPoint: '/apartment/create',
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.APARTMENT.APARTMENT_CREATED.VIE);
        resetState();
        onClose();
      } else if (
        res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.ENG
      ) {
        toast.error(RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createApartment ~ error:', error);
    }
  };

  const getApartments = async ({ searchField = '', search = '' }) => {
    try {
      const res = await requestApi({
        endPoint: `/apartment/all?searchField=${searchField}&search=${search}`,
        method: 'GET',
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getApartment ~ error:', error);
    }
  };
  return { createApartment, getApartments };
};
