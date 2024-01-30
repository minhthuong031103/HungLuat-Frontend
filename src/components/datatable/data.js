import React from 'react';
const users = [
  {
    id: '1',
    name: 'Tony Reichert',
    identityCard: '312533882',
    address: '167/24 Nguyễn Xuyến Quận 10 TP.Hồ Chí Minh',
    registeredTemporaryResidence: true,
    roomId: '101',
    numCar: '51B1-37189',
  },
  {
    id: '10',
    name: 'Peter',
    identityCard: '823533882',
    address: '30 Nguyễn Huệ Quận 1 TP.Hồ Chí Minh',
    registeredTemporaryResidence: false,
    roomId: '101',
    numCar: '51B1-37189',
  },
  {
    id: '3',
    name: 'Peter',
    identityCard: '823533882',
    address: '30 Nguyễn Huệ Quận 1 TP.Hồ Chí Minh',
    registeredTemporaryResidence: false,
    roomId: '101',
    numCar: '51B1-37189',
  },
  {
    id: '4',
    name: 'Peter',
    identityCard: '823533882',
    address: '30 Nguyễn Huệ Quận 1 TP.Hồ Chí Minh',
    registeredTemporaryResidence: true,
    roomId: '101',
    numCar: '51B1-37189',
  },
  {
    id: '5',
    name: 'Peter',
    identityCard: '823533882',
    address: '30 Nguyễn Huệ Quận 1 TP.Hồ Chí Minh',
    registeredTemporaryResidence: false,
    roomId: '101',
    numCar: '51B1-37189',
  },
  {
    id: '6',
    name: 'Peter',
    identityCard: '823533882',
    address: '30 Nguyễn Huệ Quận 1 TP.Hồ Chí Minh',
    registeredTemporaryResidence: true,
    roomId: '101',
    numCar: '51B1-37189',
  },
  {
    id: '7',
    name: 'Peter',
    identityCard: '823533882',
    address: '30 Nguyễn Huệ Quận 1 TP.Hồ Chí Minh',
    registeredTemporaryResidence: false,
    roomId: '101',
    numCar: '51B1-37189',
  },
  {
    id: '8',
    name: 'Peter',
    identityCard: '823533882',
    address: '30 Nguyễn Huệ Quận 1 TP.Hồ Chí Minh',
    registeredTemporaryResidence: false,
    roomId: '101',
    numCar: '51B1-37189',
  },
];

const columns = [
  { name: 'ID', uid: 'id', sortable: false },
  { name: 'Họ và tên', uid: 'name', sortable: false },
  { name: 'CMND/CCCD', uid: 'identityCard', sortable: false },
  { name: 'Địa chỉ thường trú', uid: 'address', sortable: false },
  { name: 'Phòng', uid: 'roomId' },
  { name: 'Số xe', uid: 'numCar' },
  { name: 'Đăng ký tạm trú', uid: 'registeredTemporaryResidence' },
];

export { columns, users };
