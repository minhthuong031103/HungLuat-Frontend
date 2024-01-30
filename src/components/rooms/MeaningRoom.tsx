'use client';

import { cn } from '@/lib/utils';

const MeaningRoom = () => {
  const meaningRoom = [
    {
      id: 1,
      content: 'Chưa xuất phiếu thu',
      className: 'bg-room-red',
    },
    {
      id: 2,
      content: 'Phòng trống',
      className: 'bg-room-empty border-1 border-room-borderColor',
    },
    {
      id: 3,
      content: 'Đợi thu',
      className: 'bg-room-orange',
    },
    {
      id: 4,
      content: 'Đã thu',
      className: 'bg-room-green',
    },
    {
      id: 5,
      content: 'Đặt cọc',
      className: 'bg-room-blue',
    },
    {
      id: 6,
      content: 'Dự kiến trả',
      className: 'bg-room-yellow',
    },
  ];
  return (
    <>
      {meaningRoom.map(item => (
        <div className="flex gap-4 items-center" key={item.id}>
          <div className={cn(`w-[39px] h-[39px] ${item.className}`)}></div>
          <span className="font-medium text-base text-black">
            {item.content}
          </span>
        </div>
      ))}
    </>
  );
};

export default MeaningRoom;
