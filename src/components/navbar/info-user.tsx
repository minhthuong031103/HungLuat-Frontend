import { Avatar } from '@nextui-org/react'

const InfoUser = () => {
  return (
    <div className="bg-darkGray rounded-sm flex w-fit h-fit px-2 py-1 items-center gap-3 cursor-pointer hover:bg-darkGray/50">
      <div className="flex flex-col items-end text-white text-xs font-medium">
        <p>Nguyễn Hoàng Nhật Anh</p>
        <p>Quản trị</p>
      </div>
      <Avatar
        className="border-2 rounded-full"
        size="sm"
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
    </div>
  )
}

export default InfoUser
