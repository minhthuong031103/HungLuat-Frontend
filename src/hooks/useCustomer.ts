import { useApi } from '@/lib/axios'
import { CreateCustomerProps } from '@/lib/interface'
import { RETURNED_MESSAGES } from '@/lib/translate'
import toast from 'react-hot-toast'

export const useCustomer = () => {
  const { requestApi } = useApi()
  const createCustomer = async (
    data: CreateCustomerProps,
    resetState: () => void,
    onClose: () => void
  ) => {
    try {
      const res = await requestApi({
        endPoint: '/customer/create',
        method: 'POST',
        body: data
      })
      if (res?.message == RETURNED_MESSAGES.CUSTOMER.CUSTOMER_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.CUSTOMER.CUSTOMER_CREATED.VIE)
        resetState()
        onClose()
      } else if (
        res?.message == RETURNED_MESSAGES.CUSTOMER.CUSTOMER_EXISTED.ENG
      ) {
        toast.error(RETURNED_MESSAGES.CUSTOMER.CUSTOMER_EXISTED.VIE)
      }
      return res
    } catch (error) {
      console.log('🚀 ~ createCustomer ~ error:', error)
    }
  }

  const getCustomers = async ({ searchField = '', search = '' }) => {
    try {
      const res = await requestApi({
        endPoint: `/customer/all?searchField=${searchField}&search=${search}`,
        method: 'GET'
      })
      return res
    } catch (error) {
      console.log('🚀 ~ getCustomer ~ error:', error)
    }
  }
  return { createCustomer, getCustomers }
}