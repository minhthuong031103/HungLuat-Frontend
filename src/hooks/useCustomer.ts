import { useApiAxios } from '@/components/providers/ApiProvider';
import { CreateCustomerProps } from '@/lib/interface';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getQueryParams } from '@/lib/utils';
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
  const [customerState, dispatchContract]: [CustomerProps, any] = useReducer(
    reducerContract,
    initCustomerState
  );

  const handleSetCustomerValue = <K extends keyof CustomerProps>(
    key: K,
    value: CustomerProps[K]
  ) => {
    dispatchContract({ type: 'SET_VALUES', payload: { [key]: value } });
  };
  const createCustomer = async (
    data: CreateCustomerProps,
    resetState: () => void,
    onClose: () => void
  ) => {
    try {
      const res = await requestApi({
        endPoint: '/customer/create',
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.CUSTOMER.CUSTOMER_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.CUSTOMER.CUSTOMER_CREATED.VIE);
        resetState();
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

  const getCustomers = async ({
    searchField = null,
    search = null,
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      console.log(
        getQueryParams({
          searchField,
          search,
          page,
          limit,
          sortBy,
          sortDirection,
        })
      );
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

  return {
    createCustomer,
    getCustomers,
    customerState,
    handleSetCustomerValue,
  };
};
