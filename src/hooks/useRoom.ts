import { useApi } from '@/lib/axios'
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
  electricPrice: 0,
  oldElectric: 0,
  newElectric: 0,
  totalElectricPrice: 0,
  waterPrice: 0,
  servicePrice: 0,
  roomPrice: 0,
  totalPrice: 0,
  internetPrice: 0,
  parkingPrice: 0,
  otherPrice: 0,
  suspendedPrice: 0
}
export const useRoom = () => {
  const { requestApi } = useApi()
  const [state, dispatch] = useReducer(reducer, initialState)

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
  return { getRooms, state, dispatch, resetState }
}
