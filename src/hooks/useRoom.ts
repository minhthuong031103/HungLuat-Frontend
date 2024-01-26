import { useApiAxios } from '@/components/providers/ApiProvider'
import { useApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useReducer } from 'react'
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, ...action.payload }
    case 'RESET':
      return { ...initialState }
    default:
      return state
  }
}

const initialState = {
  statusRoom: 0,
  roomPrice: 0,

  depositPrice: 0,
  dayStayed: 0,

  peopleRealStayed: 0,
  surcharge: 0,

  electricPrice: 0,
  defaultElectric: 0,

  oldElectric: 0,
  newElectric: 0,

  totalElectricPrice: 0,

  waterPrice: 0,
  servicePrice: 0,
  internetPrice: 0,
  peopleAmount: 0,
  vehicleAmount: 0,
  parkingPrice: 0,

  otherPrice: 0,
  oldDebt: 0,
  newDebt: 0,
  totalPrice: 0,

  startDate: new Date(new Date().setDate(1)),
  endDate: new Date()
}
export const useRoom = () => {
  const { requestApi } = useApiAxios()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleSetValue = (key, value) => {
    dispatch({
      type: 'SET_VALUES',
      payload: { [key]: value }
    })
  }
  const roomInfo = [
    {
      id: 1,
      contents: [
        {
          label: 'Tiền cọc / Trả trước',
          type: 'number',
          placeholder: 'Nhập tiền cọc',
          isRequired: true,
          value: state.depositPrice,
          setValue: (value) => handleSetValue('depositPrice', value)
        },
        {
          label: 'Số ngày ở trong tháng',
          type: 'number',
          placeholder: 'Nhập số ngày ở trong tháng',
          isRequired: true,
          isDisabled: true,
          value: state.dayStayed,
          setValue: (value) => handleSetValue('dayStayed', value)
        }
      ]
    },
    {
      id: 2,
      contents: [
        {
          label: 'Giảm trừ nợ cũ',
          type: 'number',
          placeholder: 'Nhập tiền nợ cũ',
          isRequired: true,
          value: state.oldDebt,
          setValue: (value) => handleSetValue('oldDebt', value)
        },
        {
          label: 'Tiền nợ',
          type: 'number',
          placeholder: 'Nhập số ngày ở trong tháng',
          isRequired: true,
          value: state.newDebt,
          setValue: (value) => handleSetValue('newDebt', value)
        }
      ]
    },
    {
      id: 3,
      contents: [
        {
          label: 'Phụ thu (VND / người)',
          type: 'number',
          placeholder: 'Nhập tiền phụ thu',
          isRequired: true,
          value: state.otherPrice,
          setValue: (value) => handleSetValue('otherPrice', value)
        },
        {
          label: 'Số lượng người ở thực tế',
          type: 'number',
          placeholder: 'Nhập số lượng người ở thực tế',
          isRequired: true,
          value: state.peopleRealStayed,
          setValue: (value) => handleSetValue('peopleRealStayed', value)
        }
      ]
    },
    {
      id: 4,
      contents: [
        {
          label: 'Chỉ số điện lúc bàn giao',
          type: 'number',
          placeholder: 'Chỉ số điện lúc bàn giao',
          isRequired: true,
          isDisabled: true,
          value: state.defaultElectric,
          setValue: (value) => handleSetValue('defaultElectric', value)
        },
        {
          label: 'Chỉ số điện cũ',
          type: 'number',
          placeholder: 'Nhập chỉ số điện cũ',
          isRequired: true,
          isDisabled: true,
          value: state.oldElectric,
          setValue: (value) => handleSetValue('oldElectric', value)
        }
      ]
    },
    {
      id: 5,
      contents: [
        {
          label: 'Giá điện (kw / h)',
          type: 'number',
          placeholder: 'Giá điện',
          isRequired: true,
          value: state.electricPrice,
          setValue: (value) => handleSetValue('electricPrice', value)
        },

        {
          label: 'Chỉ số điện mới',
          type: 'number',
          placeholder: 'Nhập chỉ số điện mới',
          isRequired: true,
          value: state.newElectric,
          setValue: (value) => handleSetValue('newElectric', value)
        }
      ]
    },
    {
      id: 6,
      contents: [
        {
          label: 'Số lượng người sử dụng',
          type: 'number',
          placeholder: 'Nhập số lượng',
          isRequired: true,
          value: state.peopleAmount,
          setValue: (value) => handleSetValue('peopleAmount', value)
        },
        {
          label: 'Tiền nước (VND / người)',
          type: 'number',
          placeholder: 'Nhập tiền nước',
          isRequired: true,
          value: state.waterPrice,
          setValue: (value) => handleSetValue('waterPrice', value)
        }
      ]
    },
    {
      id: 7,
      contents: [
        {
          label: 'Tiền Internet (VND / phòng)',
          type: 'number',
          placeholder: 'Nhập tiền Internet',
          isRequired: true,
          value: state.internetPrice,
          setValue: (value) => handleSetValue('internetPrice', value)
        },
        {
          label: 'Tiền dịch vụ (VND / phòng)',
          type: 'number',
          placeholder: 'Nhập tiền dịch vụ',
          isRequired: true,
          value: state.servicePrice,
          setValue: (value) => handleSetValue('servicePrice', value)
        }
      ]
    },
    {
      id: 8,
      contents: [
        {
          label: 'Số lượng xe',
          type: 'number',
          placeholder: 'Nhập số xe',
          isRequired: true,
          value: state.vehicleAmount,
          setValue: (value) => handleSetValue('vehicleAmount', value)
        },
        {
          label: 'Tiền gửi xe (VND / xe)',
          type: 'number',
          placeholder: 'Nhập tiền gửi xe',
          isRequired: true,
          value: state.parkingPrice,
          setValue: (value) => handleSetValue('parkingPrice', value)
        }
      ]
    }
  ]
  const getRooms = async ({ apartmentId }) => {
    try {
      const res = await requestApi({
        endPoint: `/room/apartment/${apartmentId}`,
        method: 'GET'
      })
      return res
    } catch (error) {
      console.log('🚀 ~ getRooms ~ error:', error)
    }
  }
  const resetState = () => {
    dispatch({ type: 'RESET' })
  }
  const getDetailRoom = ({ roomId: string }) => {
    return useQuery({
      queryKey: ['userInfo'],
      queryFn: async () => {
        const res = []
        return res?.[0]
      }
    })
  }
  return {
    getRooms,
    state,
    dispatch,
    resetState,
    getDetailRoom,
    roomInfo,
    handleSetValue
  }
}
