import { useApiAxios } from '@/components/providers/ApiProvider';
import { queryKey } from '@/lib/constant';
import { CreateCustomerProps, GetCustomersOfRoomProps } from '@/lib/interface';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getBase64, getQueryParams } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useReducer } from 'react';
import toast from 'react-hot-toast';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  dayOfBirth: Date;
  identityCard: string;
  issueDate: Date;
  roomId: string;
  provinceValue?: string;
  districtValue?: string;
  wardValue?: string;
  identityFrontUrl?: string;
  identityBackUrl?: string;
}

const initCustomerState: CustomerProps = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  createdAt: '',
  updatedAt: '',
  dayOfBirth: new Date(),
  identityCard: '',
  issueDate: new Date(),
  roomId: '',
  identityFrontUrl: '',
  identityBackUrl: '',
};

const reducerContract = (state: CustomerProps, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, ...action.payload };
    case 'RESET':
      return { ...initCustomerState };
    default:
      return state;
  }
};

export const useCustomer = () => {
  const { requestApi } = useApiAxios();
  const [customerState, dispatchContract]: [CreateCustomerProps, any] =
    useReducer(reducerContract, initCustomerState);

  const handleSetCustomerValue = <K extends keyof CreateCustomerProps>(
    key: K,
    value: CreateCustomerProps[K],
  ) => {
    dispatchContract({ type: 'SET_VALUES', payload: { [key]: value } });
  };
  const createCustomer = async (
    data: CreateCustomerProps,
    onClose: () => void,
  ) => {
    try {
      const res = await requestApi({
        endPoint: '/customer/create',
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.CUSTOMER.CUSTOMER_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.CUSTOMER.CUSTOMER_CREATED.VIE);
        resetCustomerState();
        onClose();
      } else if (
        res?.message == RETURNED_MESSAGES.CUSTOMER.CUSTOMER_EXISTED.ENG
      ) {
        toast.error(RETURNED_MESSAGES.CUSTOMER.CUSTOMER_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createCustomer ~ error:', error);
    }
  };
  interface ResponseProps {
    items: CustomerProps[];
    totalItems: number;
    totalPages: number;
  }
  const getCustomers = async ({
    searchField = null,
    search = null,
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/customer/all?${getQueryParams({
          searchField,
          search,
          page,
          limit,
          sortBy,
          sortDirection,
        })}`,
        method: 'GET',
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getCustomer ~ error:', error);
    }
  };

  const getCustomersByRoom = async ({
    searchField = null,
    search = null,
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
    roomId,
  }: GetCustomersOfRoomProps) => {
    try {
      if (roomId) {
        const res = await requestApi({
          endPoint: `/customer/room/${roomId}?${getQueryParams({
            searchField,
            search,
            page,
            limit,
            sortBy,
            sortDirection,
          })}`,
          method: 'GET',
        });
        return res;
      }
    } catch (error) {
      console.log('🚀 ~ getCustomer ~ error:', error);
    }
  };

  const upLoadImage = async data => {
    const formData = new FormData();
    const base64 = (await getBase64(data)) as any;
    formData.append('file', base64);
    try {
      const res = await requestApi({
        endPoint: '/upload/base64',
        method: 'POST',
        body: formData,
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ upLoadImage ~ error:', error);
    }
  };
  const resetCustomerState = () => {
    dispatchContract({ type: 'RESET' });
  };

  return {
    createCustomer,
    upLoadImage,
    getCustomers,
    customerState,
    handleSetCustomerValue,
    resetCustomerState,
    getCustomersByRoom,
  };
};
