import { CommonSvg } from '@/assets/CommonSvg';
import { useModal } from '@/hooks/useModalStore';
import { EModalType } from '@/lib/constant';

interface RoomActionProps {
  status: string;
  onAction: () => void;
  name: string;
  roomId: string | number;
  refetch?: () => void;
}
const RoomAction = ({
  status,
  onAction,
  name,
  refetch,
  roomId,
}: RoomActionProps) => {
  const { onOpen } = useModal();
  const renderExport = () => {
    return (
      <>
        <div className="py-2 px-4 flex items-center justify-center bg-room-red">
          <p className="text-white text-sm font-bold ">Xuất phiếu</p>
        </div>
        <div className="ml-[10px]">{CommonSvg.export()}</div>
      </>
    );
  };
  const renderPending = () => {
    return (
      <>
        <div className="py-2 px-4 flex items-center justify-center bg-room-orange">
          <p className="text-white text-sm font-bold ">Chờ thu</p>
        </div>
        <div className="ml-[10px]">{CommonSvg.pending()}</div>
      </>
    );
  };
  const handleAction = () => {
    if (status === 'Chờ thu') {
      return onOpen(EModalType.CONFIRM_BILL, { name, roomId }, refetch);
    }
    return onAction();
  };
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={handleAction}
    >
      {status === 'Chờ thu' ? renderPending() : renderExport()}
    </div>
  );
};

export default RoomAction;
