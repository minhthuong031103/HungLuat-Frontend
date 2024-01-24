import { useApi } from '@/lib/axios'

export const useRoom = () => {
  const { requestApi } = useApi()

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
  return { getRooms }
}
