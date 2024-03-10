import { useApiAxios } from '@/components/providers/ApiProvider';
import { useReducer } from 'react';
import toast from 'react-hot-toast';

export const useSettingRoom = () => {
  const { requestApi } = useApiAxios();
  const configRoom = async ({ roomId, data }) => {
    const res = await requestApi({
      endPoint: `/room/config/${roomId}`,
      method: 'PUT',
      body: data,
    });
    if (res?.message === 'Room updated')
      toast.success('Cấu hình phòng thành công');
    else toast.error('Cấu hình phòng thất bại');
    return res;
  };
  const getConfigRoom = async ({ roomId }) => {
    const res = await requestApi({
      endPoint: `/room/config/${roomId}`,
      method: 'GET',
    });
    return res;
  };
  return {
    configRoom,
    getConfigRoom,
  };
};
