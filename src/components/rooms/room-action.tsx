import { CommonSvg } from '@/assets/CommonSvg';

interface RoomActionProps {
  status: boolean;
  onAction: () => void;
}
const RoomAction = ({ status, onAction }: RoomActionProps) => {
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={onAction}
    >
      <div className="py-2 px-4 flex items-center justify-center bg-room-red">
        <p className="text-white text-sm font-bold ">Xuất phiếu</p>
      </div>
      <div className="ml-[10px]">{CommonSvg.export()}</div>
    </div>
  );
};

export default RoomAction;
