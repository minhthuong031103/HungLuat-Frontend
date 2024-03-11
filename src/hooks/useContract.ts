import { useApiAxios } from '@/components/providers/ApiProvider';
import { RETURNED_MESSAGES } from '@/lib/translate';
import toast from 'react-hot-toast';

export const useContract = () => {
  const { requestApi } = useApiAxios();
  const deleteContract = async ({
    contractId,
    action,
  }: {
    contractId: string;
    action: () => void;
  }) => {
    try {
      const res = await requestApi({
        endPoint: `/contract/${contractId}`,
        method: 'DELETE',
      });
      if (res?.message == RETURNED_MESSAGES.CONTRACT.CONTRACT_DELETED.ENG) {
        toast.success(RETURNED_MESSAGES.CONTRACT.CONTRACT_DELETED.VIE);
        action();
      } else if (
        res?.message == RETURNED_MESSAGES.CONTRACT.CONTRACT_NOT_FOUND.ENG
      ) {
        toast.error(RETURNED_MESSAGES.CONTRACT.CONTRACT_NOT_FOUND.VIE);
      } else {
        toast.error('Xóa hợp đồng thất bại');
      }
    } catch (error) {
      toast.error('Xóa hợp đồng thất bại');
    }
  };

  return { deleteContract };
};
