'use client'
import { useApiAxios } from '@/components/providers/ApiProvider'
import { RETURNED_MESSAGES } from '@/lib/translate'
import {
  blobToBase64,
  checkValueNumberInput,
  getDaysAmountInMonth,,
  getQueryParams
} from '@/lib/utils';

import { createContext, useContext, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast'
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUES': {
      // if (action.payload.startDate) {
      //   action.payload.endDate = new Date(action.payload.endDate)
      // }
      // if (action.payload.endDate) {
      //   action.payload.endDate = new Date(action.payload.endDate)
      // }
      return { ...state, ...action.payload }
    }
    case 'RESET': {
      const { dayStayed, ...partialInitialState } = initialState
      return { ...partialInitialState, dayStayed: state.dayStayed }
    }
    default:
      return state
  }
}
const initialState = {
  apartmentId: '',
  name: '',
  roomStatus: '',
  roomPrice: 0,

  depositPrice: 0,
  dayStayed: 0,

  peopleRealStayed: 0,
  surcharge: 500000,

  electricPrice: 4000,
  defaultElectric: 0,

  oldElectric: 0,
  newElectric: 0,

  elevatorPrice: 0,
  waterPrice: 100000,
  servicePrice: 150000,
  internetPrice: 0,
  peopleAmount: 0,
  vehicleAmount: 0,
  parkingPrice: 100000,

  otherPrice: 0,
  oldDebt: 0,
  newDebt: 0,

  netProceeds: 0,
  totalElectricPrice: 0,
  totalWaterPrice: 0,
  totalParkingPrice: 0,
  totalElevatorPrice: 0,
  suspenseMoney: 0,

  startDate: new Date(new Date().setDate(1)),
  endDate: new Date()
}
const reducerContract = (state: StateContractProps, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, ...action.payload }
    case 'RESET':
      return { ...initContractState }
    default:
      return state
  }
}
const initContractState: StateContractProps = {
  roomId: '',
  customerId: '',
  phoneNumber: '',
  daySignContract: new Date(),
  dayEndContract: new Date(),
  note: ''
}

interface IRoomContext {
  state: any;
  dispatch: any;
  contractState: any;
  dispatchContract: any;
  handleSetValue: any;
  handleSetContract: any;
  roomInfo: any;
  getRooms: any;
  getBills: any;
  getAllBills: any
  createRoom: any;
  resetState: any;
  getDetailRoom: any;
  updateRoomStates: any;
  exportBill: any;
}
interface StateContractProps {
  roomId: string
  customerId: string
  phoneNumber: string
  daySignContract: Date
  dayEndContract: Date
  note: string
}
export interface exportBillProps {
  roomId: string;
  apartmentId: string
  customerId: string;
  endDate: Date;
  roomPrice: number;
  totalElectricPrice: number;
  totalWaterPrice: number;
  totalElevatorPrice: number;
  totalParkingPrice: number;
  internetPrice: number;
  servicePrice: number;
  otherPrice: number;
  totalSurcharge: number;
  suspenseMoney: number;
  newDebt: number;
  oldDebt: number;
  newElectric: number;
  oldElectric: number;
  files: any[];
  fileName: string
}
const RoomContext = createContext<any>(null)

export const RoomProvider = ({ children }) => {
  const { requestApi } = useApiAxios()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [contractState, dispatchContract]: [StateContractProps, any] =
    useReducer(reducerContract, initContractState)

  const handleSetValue = async (key, value) => {
    if (
      (key == 'startDate' && value <= state.endDate) ||
      (key == 'endDate' && value >= state.startDate) ||
      key == 'roomStatus' ||
      (key != 'startDate' &&
        key != 'endDate' &&
        key != 'roomStatus' &&
        checkValueNumberInput(key, value))
    ) {
      if (value === '') {
        value = 0
      }
      if (value[0] == '0' && value[1] != '.' && value.length > 1) {
        value = value.slice(1)
      }
      dispatch({ type: 'SET_VALUES', payload: { [key]: value } })
    }
  }
  const handleSetContract = (key, value) => {
    dispatchContract({ type: 'SET_VALUES', payload: { [key]: value } })
  }
  useEffect(() => {
    const startDate = new Date(state.startDate)
    const endDate = new Date(state.endDate)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    handleSetValue('dayStayed', diffDays)
  }, [state.startDate, state.endDate])
  const roomInfo = [
    {
      id: 1,
      contents: [
        {
          label: 'Tiền cọc',
          type: 'text',
          placeholder: 'Nhập tiền cọc',
          isRequired: true,
          value: state.depositPrice,
          setValue: (value) => handleSetValue('depositPrice', value)
        },
        {
          label: 'Số ngày ở trong tháng',
          type: 'text',
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
          label: 'Nợ cũ',
          type: 'text',
          placeholder: 'Nhập tiền nợ cũ',
          isRequired: true,
          value: state.oldDebt,
          setValue: (value) => handleSetValue('oldDebt', value)
        },
        {
          label: 'Nợ mới',
          type: 'text',
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
          type: 'text',
          placeholder: 'Nhập tiền phụ thu',
          isRequired: true,
          value: state.surcharge,
          setValue: (value) => handleSetValue('surcharge', value)
        },
        {
          label: 'Số lượng người ở thực tế',
          type: 'text',
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
          label: 'Chỉ số điện lúc bàn giao (KWh)',
          type: 'text',
          placeholder: 'Chỉ số điện lúc bàn giao',
          isRequired: true,
          isDisabled: true,
          value: state.defaultElectric,
          setValue: (value) => handleSetValue('defaultElectric', value)
        },
        {
          label: 'Chỉ số điện cũ (KWh)',
          type: 'text',
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
          label: 'Giá điện (VNĐ / KWh)',
          type: 'text',
          placeholder: 'Giá điện',
          isRequired: true,
          value: state.electricPrice,
          setValue: (value) => handleSetValue('electricPrice', value)
        },

        {
          label: 'Chỉ số điện mới (KWh)',
          type: 'text',
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
          type: 'text',
          placeholder: 'Nhập số lượng',
          isRequired: true,
          value: state.peopleAmount,
          setValue: (value) => handleSetValue('peopleAmount', value)
        },
        {
          label: 'Tiền nước (VND / người)',
          type: 'text',
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
          label: 'Tiền thang máy (VND / người)',
          type: 'text',
          placeholder: 'Nhập tiền thang máy',
          isRequired: true,
          value: state.elevatorPrice,
          setValue: (value) => handleSetValue('elevatorPrice', value)
        },
        {
          label: 'Chi phí phát sinh khác',
          type: 'text',
          placeholder: 'Nhập chi phí phát sinh',
          value: state.otherPrice,
          setValue: (value) => handleSetValue('otherPrice', value)
        }
      ]
    },
    {
      id: 8,
      contents: [
        {
          label: 'Tiền Internet (VND / phòng)',
          type: 'text',
          placeholder: 'Nhập tiền Internet',
          isRequired: true,
          value: state.internetPrice,
          setValue: (value) => handleSetValue('internetPrice', value)
        },
        {
          label: 'Tiền dịch vụ (VND / phòng)',
          type: 'text',
          placeholder: 'Nhập tiền dịch vụ',
          isRequired: true,
          value: state.servicePrice,
          setValue: (value) => handleSetValue('servicePrice', value)
        }
      ]
    },
    {
      id: 9,
      contents: [
        {
          label: 'Số lượng xe',
          type: 'text',
          placeholder: 'Nhập số xe',
          isRequired: true,
          value: state.vehicleAmount,
          setValue: (value) => handleSetValue('vehicleAmount', value)
        },
        {
          label: 'Tiền gửi xe (VND / xe)',
          type: 'text',
          placeholder: 'Nhập tiền gửi xe',
          isRequired: true,
          value: state.parkingPrice,
          setValue: (value) => handleSetValue('parkingPrice', value)
        }
      ]
    }
  ]
  const getRooms = async ({
    apartmentId,
    search = '',
    searchField = 'name'
  }) => {
    try {
      const res = await requestApi({
        endPoint: `/room/apartment/${apartmentId}?search=${search}&searchField=${searchField}`,
        method: 'GET'
      })
      return res
    } catch (error) {
      console.log('🚀 ~ getRooms ~ error:', error)
    }
  }
  const getBills = async ({
    roomId,
    searchField = null,
    search = null,
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc'
  }) => {
    try {
      const res = await requestApi({
        endPoint: `/bill/room/${roomId}?${getQueryParams({
          searchField,
          search,
          page,
          limit,
          sortBy,
          sortDirection
        })}`,
        method: 'GET'
      })
      return res
    } catch (error) {
      console.log('🚀 ~ getRooms ~ error:', error)
    }
  }
  const getAllBills = async ({
    apartmentId,
    searchField = null,
    search = null,
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc'
  }) => {
    try {
      const res = await requestApi({
        endPoint: `/bill/apartment/${apartmentId}?${getQueryParams({
          searchField,
          search,
          page,
          limit,
          sortBy,
          sortDirection
        })}`,
        method: 'GET'
      })
      return res
    } catch (error) {
      console.log('🚀 ~ getRooms ~ error:', error)
    }
  }
  const createRoom = async ({ data, resetState: rsState, onClose }) => {
    try {
      const res = await requestApi({
        endPoint: `/room/create`,
        method: 'POST',
        body: data
      })
      if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.ROOM.ROOM_CREATED.VIE)
        rsState()
        onClose()
      } else if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_EXISTED.ENG) {
        toast.error(RETURNED_MESSAGES.ROOM.ROOM_EXISTED.VIE)
      } else {
        toast.error('Tạo phòng thất bại')
      }
      return res
    } catch (error) {
      toast.error('Tạo phòng thất bại')
    }
  }
  const resetState = () => {
    dispatch({ type: 'RESET' })
  }
  const getDetailRoom = async ({ roomId }) => {
    try {
      const res = await requestApi({
        endPoint: `/room/${roomId}`,
        method: 'GET'
      })
      return res
    } catch (error) {
      console.log('🚀 ~ getDetailRoom ~ error:', error)
    }
  }
  const checkUpdateState = () => {
    if (
      state.roomStatus &&
      state.roomPrice >= 0 &&
      state.depositPrice >= 0 &&
      state.dayStayed >= 0 &&
      state.peopleRealStayed >= 0 &&
      state.surcharge >= 0 &&
      state.oldDebt >= 0 &&
      state.newDebt >= 0 &&
      state.electricPrice >= 0 &&
      state.newElectric >= 0 &&
      state.peopleAmount >= 0 &&
      state.waterPrice >= 0 &&
      state.elevatorPrice >= 0 &&
      state.otherPrice >= 0 &&
      state.servicePrice >= 0 &&
      state.internetPrice >= 0 &&
      state.vehicleAmount >= 0 &&
      state.parkingPrice >= 0
    ) {
      if (state.oldElectric > state.newElectric) {
        return false
      }
      return true
    }
    return false
  }
  useEffect(() => {
    const EP =
      Number(state.oldElectric) >= Number(state.newElectric)
        ? 0
        : Math.floor(
            (Math.floor(
              (Number(state.newElectric) - Number(state.oldElectric)) * 10,
            ) /
              10) *
              Number(state.electricPrice)
          )
    const WP = Number(state.waterPrice) * Number(state.peopleAmount)
    const PP = Number(state.parkingPrice) * Number(state.vehicleAmount)
    const EPV = Number(state.elevatorPrice) * Number(state.peopleAmount)
    const SC =
      Number(state.peopleRealStayed) - 4 > 0
        ? (Number(state.peopleRealStayed) - 4) * Number(state.surcharge)
        : 0
    const RC = Math.floor(
      (Number(state.roomPrice) * Number(state.dayStayed)) /
        getDaysAmountInMonth(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        )
    )
    const NC =
      EP +
      WP +
      PP +
      EPV +
      SC +
      Number(state.otherPrice) +
      Number(state.servicePrice) +
      Number(state.internetPrice) +
      Number(state.oldDebt) +
      RC
    handleSetValue('totalElectricPrice', EP)
    handleSetValue('totalWaterPrice', WP)
    handleSetValue('totalParkingPrice', PP)
    handleSetValue('totalElevatorPrice', EPV)
    handleSetValue('netProceeds', NC)
    handleSetValue('suspenseMoney', NC - Number(state.newDebt))
  }, Object.values(state))
  const updateRoomStates = async ({ roomId, refetch }) => {
    if (checkUpdateState()) {
      const data = {
        roomId: Number(roomId),
        roomStatus: state.roomStatus,
        depositPrice: Number(state.depositPrice),
        roomPrice: Number(state.roomPrice),
        internetPrice: Number(state.internetPrice),
        vehicleAmount: Number(state.vehicleAmount),
        parkingPrice: Number(state.parkingPrice),
        suspenseMoney: Number(state.netProceeds - state.newDebt),
        dayStayed: Number(state.dayStayed),
        peopleAmount: Number(state.peopleAmount),
        electricPrice: Number(state.electricPrice),
        defaultElectric: Number(state.defaultElectric),
        oldElectric: Number(state.oldElectric),
        oldDebt: Number(state.oldDebt),
        newDebt: Number(state.newDebt),
        newElectric: Number(state.newElectric),
        otherPrice: Number(state.otherPrice),
        surcharge: Number(state.surcharge),
        peopleRealStayed: Number(state.peopleRealStayed),
        servicePrice: Number(state.servicePrice),
        elevatorPrice: Number(state.elevatorPrice),
        totalElectricPrice: Number(state.totalElectricPrice),
        waterPrice: Number(state.waterPrice),
        netProceeds: Number(state.netProceeds),
        totalParkingPrice: Number(state.totalParkingPrice),
        totalWaterPrice: Number(state.totalWaterPrice),
        totalElevatorPrice: Number(state.totalElevatorPrice),
        startDate: state.startDate,
        endDate: state.endDate
      }
      try {
        const res = await requestApi({
          endPoint: `/room/info/update`,
          method: 'PUT',
          body: data
        })
        if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_UPDATED.ENG) {
          toast.success(RETURNED_MESSAGES.ROOM.ROOM_UPDATED.VIE)
          refetch()
        } else if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_NOT_FOUND.ENG) {
          toast.error(RETURNED_MESSAGES.ROOM.ROOM_NOT_FOUND.VIE)
        } else {
          toast.error('Cập nhật phòng thất bại')
        }
      } catch (error) {
        toast.error('Cập nhật phòng thất bại')
      }
    } else {
      if (state.newElectric < state.oldElectric) {
        toast.error('Chỉ số điện mới không được nhỏ hơn chỉ số điện cũ')
        return
      }
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }
  }

  const exportBill = async (data: exportBillProps, refetch: () => void) => {
    const formData = new FormData()
    const dataKey = Object.keys(data)
    for (let i = 0; i < dataKey.length; i++) {
      formData.append(dataKey[i], data[dataKey[i]])
    }
    const base64 = (await blobToBase64(data.files[0])) as string
    formData.append('files', base64)

    try {
      const res = await requestApi({
        endPoint: `/bill/export`,
        method: 'POST',
        body: formData
      })
      if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_UPDATED.ENG) {
        toast.success('Xuất hóa đơn thành công')
        refetch()
      } else if (res?.message == RETURNED_MESSAGES.ROOM.ROOM_NOT_FOUND.ENG) {
        toast.error(RETURNED_MESSAGES.ROOM.ROOM_NOT_FOUND.VIE)
      } else {
        toast.error('Xuất hóa đơn thất bại')
      }
    } catch (error) {
      toast.error('Xuất hóa đơn thất bại')
    }
  }
  return (
    <RoomContext.Provider
      value={{
        state,
        dispatch,
        contractState,
        dispatchContract,
        handleSetValue,
        handleSetContract,
        roomInfo,
        getRooms,
        getAllBills,
        getBills,
        createRoom,
        resetState,
        getDetailRoom,
        updateRoomStates,
        exportBill
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export const useRoom = (): IRoomContext => {
  return useContext(RoomContext)
}
