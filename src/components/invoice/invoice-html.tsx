import React, { forwardRef } from 'react';
import { getDaysInMonth } from 'date-fns';
import {
  addDaysToDateString,
  convertPriceNotVND,
  getDaysAmountInMonth,
} from '@/lib/utils';
import { getText } from 'number-to-text-vietnamese';

const InvoiceHtml = forwardRef(({ data }, ref) => {
  const styles = {
    page: {
      backgroundColor: '#fff',
      fontSize: '11px',
      paddingTop: '5px',
      paddingLeft: '40px',
      paddingRight: '40px',
      lineHeight: '1.5',
      fontFamily: 'Times New Roman',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    },
    spaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#3E3E3E',
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '24px',
    },
    // Add other styles similarly...
  };

  // Function to render the invoice's header
  const InvoiceTitle = () => (
    <div style={styles.titleContainer}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#3E3E3E',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textDecoration: 'underline',
                textTransform: 'uppercase',
              }}
            >
              {data?.apartmentName}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '10px' }}>Địa chỉ: {data?.address}</span>
          </div>
          <div>
            <span style={{ fontSize: '9px' }}>
              Điện thoại:{' '}
              <span style={{ color: 'blue' }}>{data?.apartment?.hotline}</span>
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            PHÒNG
          </span>
          <div
            style={{
              padding: '7px',
              border: '1px solid black',
              borderRadius: '50%',
              marginTop: '7px',
            }}
          >
            <span
              style={{ fontSize: '14px', color: 'blue', fontWeight: 'bold' }}
            >
              {data.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // More components (CustomerInfo, TableHead, etc.) will be defined in a similar fashion.
  // Function to render additional information about the invoice
  const Information = () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8px',
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
        THÔNG BÁO TIỀN PHÒNG TRỌ THÁNG {new Date().getMonth() + 1}/
        {new Date().getFullYear()}
      </span>
      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
        (Từ ngày {data.startDate} đến {data.endDate})
      </span>
    </div>
  );

  // Function to render customer information
  const CustomerInfo = () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={{ fontSize: '11px' }}>
          - Khách hàng: <strong>{data?.clientName}</strong>
        </span>
        <span style={{ fontSize: '11px' }}>
          - Số điện thoại: <strong>{data?.clientPNumber}</strong>
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={{ fontSize: '11px' }}>
          - Ngày thuê: <strong>{data?.daySigned}</strong>
        </span>
        <span style={{ fontSize: '11px' }}>
          - Tiền phòng: <strong>{convertPriceNotVND(data.roomPrice)}</strong>
        </span>
      </div>
    </div>
  );

  // Function to render the table header
  const TableHead = () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px',
      }}
    >
      <div
        style={{
          flex: 0.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#DEDEDE',
          padding: '4px 7px',
          border: '1px dashed black',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '11px' }}>STT</span>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#DEDEDE',
          padding: '4px 7px',
          border: '1px dashed black',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '11px' }}>Nội dung</span>
      </div>
      <div
        style={{
          flex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#DEDEDE',
          padding: '4px 7px',
          border: '1px dashed black',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '11px' }}>
          Đơn giá x Đơn vị tính
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#DEDEDE',
          padding: '4px 7px',
          border: '1px dashed black',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '11px' }}>Thành tiền</span>
      </div>
    </div>
  );
  const tableData = [
    {
      id: 1,
      name: 'Tiền thuê phòng',
      unit:
        data.dayStayed === getDaysInMonth(new Date())
          ? 'Trọn tháng'
          : `${data.dayStayed}/${getDaysInMonth(new Date())} ngày`,
      price: `${convertPriceNotVND(data.roomPrice)}đ/tháng`,
      total: convertPriceNotVND(
        Math.floor(
          (Number(data.roomPrice) * Number(data.dayStayed)) /
            getDaysAmountInMonth(
              new Date().getMonth() + 1,
              new Date().getFullYear(),
            ),
        ),
      ),
    },
    {
      id: 2,
      name: 'Điện và Phí ANTT',
      unit: `${
        Number(data.oldElectric) >= Number(data.newElectric)
          ? 0
          : Math.floor(
              (Number(data.newElectric) - Number(data.oldElectric)) * 10,
            ) / 10
      } (mới ${Math.floor(data.newElectric * 10) / 10} - cũ ${
        data.oldElectric
      })`,
      price: `${convertPriceNotVND(data.electricPrice)}đ/KWh`,
      total: convertPriceNotVND(data.totalElectricPrice),
    },
    {
      id: 3,
      name: 'Nước',
      unit:
        data.waterType === 'Nước M3'
          ? `${
              Number(data.oldWater) >= Number(data.newWater)
                ? 0
                : Math.floor(
                    (Number(data.newWater) - Number(data.oldWater)) * 10,
                  ) / 10
            } (mới ${Math.floor(data.newWater * 10) / 10} - cũ ${data.oldWater})`
          : `${data.peopleAmount} người`,
      price: `${convertPriceNotVND(data.waterPrice)}đ/${data.waterType === 'Nước M3' ? `M3` : `người`}`,
      total: convertPriceNotVND(data.totalWaterPrice),
    },
    {
      id: 4,
      name: 'Tiền thang máy',
      unit: `${data.peopleAmount} người`,
      price: `${convertPriceNotVND(data.elevatorPrice)}đ/người`,
      total: convertPriceNotVND(data.totalElevatorPrice),
    },

    {
      id: 5,
      name: 'Tiền internet',
      unit: '1 phòng',
      price: `${convertPriceNotVND(data.internetPrice)}đ/phòng`,
      total: convertPriceNotVND(data.internetPrice),
    },
    {
      id: 6,
      name: 'Tiền dịch vụ',
      unit: '1 phòng',
      price: `${convertPriceNotVND(data.servicePrice)}đ/phòng`,
      total: convertPriceNotVND(data.servicePrice),
    },
    {
      id: 7,
      name: 'Tiền phụ thu',
      unit: `${data.peopleRealStayed}/4 người`,
      price: `${convertPriceNotVND(data.surcharge)}đ/số người quá quy định`,
      total: convertPriceNotVND(
        Number(data.peopleRealStayed) - 4 > 0
          ? (Number(data.peopleRealStayed) - 4) * Number(data.surcharge)
          : 0,
      ),
    },
    {
      id: 8,
      name: 'Tiền giữ xe',
      unit: `${data.vehicleAmount} xe`,
      price: `${convertPriceNotVND(data.parkingPrice)}đ/xe`,
      total: convertPriceNotVND(data.totalParkingPrice),
    },
    {
      id: 9,
      name: 'Tiền nợ cũ',

      price: `${convertPriceNotVND(data.oldDebt)}đ`,
      total: convertPriceNotVND(data.oldDebt),
    },
    {
      id: 10,
      name: 'Tiền nợ mới',

      price: `${convertPriceNotVND(data.newDebt)}đ`,
      total: `- ${convertPriceNotVND(data.newDebt)}`,
    },
    {
      id: 11,
      name: 'Tiền giảm trừ',

      price: `${convertPriceNotVND(data.reduce)}đ`,
      total: `- ${convertPriceNotVND(data.reduce)}`,
    },
    {
      id: 11,
      name: 'Chi phí phát sinh khác',

      price: `${convertPriceNotVND(data.otherPrice)}đ`,
      total: convertPriceNotVND(data.otherPrice),
    },
  ];
  // Function to render each row in the table body
  const TableBody = () =>
    tableData.map(item => (
      <div
        key={item.id}
        style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
      >
        <div
          style={{
            flex: 0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 7px',
            border: '1px dashed black',
          }}
        >
          <span style={{ fontSize: '11px' }}>{item.id}</span>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 7px',
            border: '1px dashed black',
          }}
        >
          <span style={{ fontSize: '11px' }}>{item.name}</span>
        </div>
        <div
          style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 7px',
            border: '1px dashed black',
          }}
        >
          <span style={{ fontSize: '11px' }}>
            {item.price} x {item.unit}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '4px 7px',
            border: '1px dashed black',
          }}
        >
          <span style={{ fontSize: '11px' }}>{item.total}</span>
        </div>
      </div>
    ));
  // Function to render the table total
  const TableTotal = () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          flex: 3.8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4px 7px',
          border: '1px dashed black',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>TỔNG CỘNG</span>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '4px 7px',
          border: '1px dashed black',
        }}
      >
        <span style={{ fontWeight: 'bold', color: 'blue', fontSize: '12px' }}>
          {convertPriceNotVND(data.suspenseMoney)}
        </span>
      </div>
    </div>
  );

  // Function to render the total in words
  const TotalText = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '11px',
        marginTop: '5px',
      }}
    >
      <span>
        (Bằng chữ:{' '}
        <strong>
          {getText(data.suspenseMoney, ',')?.charAt(0)?.toUpperCase() +
            getText(data.suspenseMoney, ',')?.slice(1)}{' '}
          đồng
        </strong>
        )
      </span>
      <span>
        (<span style={{ textDecoration: 'underline' }}>Ghi chú</span>:{' '}
        {data.note})
      </span>
    </div>
  );

  // Function to render payment information
  const Payment = () => (
    <div
      style={{
        display: 'flex',
        paddingLeft: '2px',
        paddingRight: '2px',
        paddingTop: '3px',
        paddingBottom: '3px',
        border: '1px dashed black',
        flexDirection: 'column',
        marginTop: '20px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: '10px' }}>
        Quý khách thanh toán tiền mặt, hoặc chuyển khoản vào TK "
        <span
          style={{
            color: 'blue',
          }}
        >
          {data?.bankName}
        </span>
        "
      </span>
      <span>
        - Số TK Ngân hàng{' '}
        <span
          style={{
            color: 'blue',
          }}
        >
          {data?.bank}
        </span>
        : <strong>{data?.bankNumber}</strong>. Nội dung chuyển khoản:{' '}
        {data?.apartmentName} P{data.name} T{new Date().getMonth() + 1}/
        {new Date().getFullYear()}
      </span>
      <span>
        - Số TK Ngân hàng{' '}
        <span
          style={{
            color: 'blue',
          }}
        >
          {data?.bank2}
        </span>
        : <strong>{data?.bankNumber2}</strong>. Nội dung chuyển khoản:{' '}
        {data?.apartmentName} P{data.name} T{new Date().getMonth() + 1}/
        {new Date().getFullYear()}
      </span>
    </div>
  );

  // Function to render additional notes
  const Note = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5px',
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'blue' }}>
        * <span style={{ textDecoration: 'underline' }}>Lưu ý</span>: Vui lòng
        nộp tiền trước ngày {addDaysToDateString(data.endDate, 7)}
      </span>
      <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '7px' }}>
        Trân trọng cảm ơn sự hợp tác của quý khách!
      </span>
    </div>
  );

  // Function to render the signature
  const Sign = () => (
    <div
      style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '30px',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
          Ban Quản lý
        </span>
        <span
          style={{
            fontSize: '12px',
            fontStyle: 'italic',
            fontWeight: 'bold',
            marginTop: '5px',
          }}
        >
          Chữ ký, ghi rõ họ tên
        </span>
        {data?.apartment?.signImageUrl && (
          <img
            style={{ width: '100px', height: '65px', marginTop: '5px' }}
            src={data?.apartment?.signImageUrl}
            alt="Signature"
          />
        )}
      </div>
    </div>
  );
  return (
    <div ref={ref} style={styles.page}>
      <InvoiceTitle />
      <Information />
      <CustomerInfo />
      <TableHead />
      <TableBody />
      <TableTotal />
      <TotalText />
      <Payment />
      <Note />
      <Sign />
    </div>
  );
});

export default InvoiceHtml;
