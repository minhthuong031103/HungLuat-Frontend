import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@nextui-org/react';
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { CiLogout } from 'react-icons/ci';

const InfoUser = () => {
  const { onLogout } = useAuth();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-darkGray rounded-sm flex w-fit h-fit px-2 py-1 items-center gap-3 cursor-pointer hover:bg-darkGray/50">
          <div className="flex flex-col items-end text-white text-xs font-medium">
            <p>Nguyễn Hoàng Nhật Anh</p>
            <p>Quản trị</p>
          </div>
          <Avatar
            className="border-2 rounded-full"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="logout"
          endContent={<CiLogout className="text-danger" />}
          onPress={() => onLogout()}
        >
          <p className="font-medium text-sm text-danger">Đăng xuất</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default InfoUser;
