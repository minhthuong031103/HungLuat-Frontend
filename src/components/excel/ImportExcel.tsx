import { useModal } from '@/hooks/useModalStore';
import { EModalType } from '@/lib/constant';
import { Button, Tooltip } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import { GoUpload } from 'react-icons/go';
import * as XLSX from 'xlsx';
const ImportExcel = ({ refetch }: { refetch: () => void }) => {
  const headerExcel = {
    'Mã phòng': 'id',
    'Tên phòng': 'name',
    'Giá phòng': 'roomPrice',
    'Tiền cọc': 'depositPrice',
    'Nợ cũ': 'oldDebt',
    'Nợ mới': 'newDebt',
    'Số lượng người ở thực tế': 'peopleRealStayed',
    'Phụ thu (VND/người)': 'surcharge',
    'Chỉ số điện lúc bàn giao (KWh)': 'defaultElectric',
    'Chỉ số điện cũ (KWh)': 'oldElectric',
    'Giá điện (VND/KWh)': 'electricPrice',
    'Chỉ số điện mới (KWh)': 'newElectric',
    'Chỉ số nước lúc bàn giao (m3)': 'defaultWater',
    'Chỉ số nước cũ (m3)': 'oldWater',
    'Tiền nước': 'waterPrice',
    'Chỉ số nước mới (m3)': 'newWater',
    'Số lượng người sử dụng dịch vụ': 'peopleAmount',
    'Tiền thang máy (VND/người)': 'elevatorPrice',
    'Chi phí phát sinh': 'otherPrice',
    'Tiền internet (VND/người)': 'internetPrice',
    'Tiền dịch vụ (VND/phòng)': 'servicePrice',
    'Số lượng xe': 'vehicleAmount',
    'Tiền giữ xe (VND/xe)': 'parkingPrice',
    'Tiền giảm trừ': 'reduce',
  };
  const [data, setData] = useState([]);
  const [excelName, setExcelName] = useState('');
  const { onOpen } = useModal();
  const convertToJson = (headers, data) => {
    const rows = [] as any;
    data.forEach(row => {
      const rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };
  const importExcel = e => {
    const file = e.target.files[0];
    setExcelName(file.name);
    const reader = new FileReader();
    reader.onload = event => {
      const bstr = event?.target?.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      // const heads = headers.map((head) => head.replace(/ /g, '_'))
      const rows = fileData.slice(1);
      const jsonData = convertToJson(headers, rows);
      setData(
        jsonData?.map(item => {
          const newItem = {} as any;
          Object.keys(item).forEach(key => {
            newItem[headerExcel[key]] = item[key];
          });
          return newItem;
        }),
      );
    };
    return reader.readAsBinaryString(file);
  };

  const handleUpdateListProductItems = async () => {
    onOpen(EModalType.UPDATE_EXCEL, data, refetch);
  };
  useEffect(() => {
    if (data.length > 0) {
      onOpen(EModalType.UPDATE_EXCEL, data, refetch);
    }
  }, [data]);

  return (
    <div className="ml-4 flex items-center gap-4">
      {data.length > 0 && excelName ? (
        <div
          className="flex items-center text-base cursor-pointer text-link underline"
          onClick={handleUpdateListProductItems}
        >
          <Tooltip content="Cập nhật danh sách phòng" color="default">
            <div>{excelName}</div>
          </Tooltip>
          <Tooltip content="Xoá" color="danger">
            <div>
              <CiTrash
                className="ml-2 h-5 w-5 text-red-600"
                onClick={e => {
                  e.stopPropagation();
                  setData([]);
                  setExcelName('');
                }}
              />
            </div>
          </Tooltip>
        </div>
      ) : (
        <label htmlFor="upload-file" className="cursor-pointer">
          <Button className="rounded-[8px] px-4 py-2 bg-blueButton pointer-events-none">
            <input
              type="file"
              onChange={importExcel}
              name="upload-file"
              id="upload-file"
              hidden
            />
            <div className="text-white flex cursor-pointer items-center first-letter:text-sm">
              Nhập Excel
              <GoUpload className="ml-2 h-4 w-4 text-white" />
            </div>
          </Button>
        </label>
      )}
    </div>
  );
};

export default ImportExcel;
