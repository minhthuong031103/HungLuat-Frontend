import {
  addDaysToDateString,
  convertPriceNotVND,
  getDaysAmountInMonth
} from '@/lib/utils'
import {
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  Font
} from '@react-pdf/renderer'
import { getDaysInMonth } from 'date-fns'
import { Fragment } from 'react'

const Invoice = ({ data }) => {
  Font.register({
    family: 'Montserrat',
    fonts: [
      {
        src: '/fonts/Montserrat-Regular.ttf'
      },
      {
        src: '/fonts//Montserrat-Bold.ttf',
        fontWeight: 700
      },
      {
        src: '/fonts//Montserrat-Medium.ttf',
        fontWeight: 500
      },
      {
        src: '/fonts//Montserrat-SemiBold.ttf',
        fontWeight: 600
      },
      {
        src: '/fonts//Montserrat-Italic.ttf',
        fontStyle: 'italic'
      }
    ]
  })
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      fontFamily: 'Montserrat',
      flexDirection: 'column'
    },

    spaceBetween: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#3E3E3E'
    },

    titleContainer: { flexDirection: 'row', marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 14, textAlign: 'center', fontWeight: 700 },

    addressTitle: { fontSize: 11 },

    invoice: { fontSize: 20 },

    invoiceNumber: { fontSize: 11 },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 10,
      fontSize: 10,
      paddingTop: 4,
      paddingLeft: 7,
      paddingRight: 7,
      flex: 1,
      height: 23,
      backgroundColor: '#DEDEDE',
      borderColor: 'black',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },

    theader2: { flex: 2, borderRightWidth: 1, borderBottomWidth: 1 },
    theader3: {
      flex: 0.5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1
    },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      paddingRight: 7,
      flex: 1,
      borderColor: 'black',
      borderRightWidth: 1,
      borderBottomWidth: 1
    },

    total: {
      fontSize: 9,
      paddingLeft: 7,
      paddingRight: 7,
      flex: 3.8,
      paddingTop: 4,
      borderColor: 'black',
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
    tbody3: {
      flex: 0.5,
      borderRightWidth: 1,
      borderLeftWidth: 1
    }
  })

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              HÙNG LUẬT GROUP
            </Text>
          </View>
          <View>
            <Text>Địa chỉ: 123, Mai Phú Thọ, Q.2, TPHCM.</Text>
          </View>
          <View>
            <Text>
              Điện thoại: <Text style={{ color: 'blue' }}>0963618637</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.reportTitle}>PHÒNG</Text>
          <View
            style={{
              paddingHorizontal: 18.658,
              paddingVertical: 13.5,
              border: '1px solid black',
              borderRadius: 9999,
              marginTop: 7
            }}
          >
            <Text style={{ fontSize: 14, color: 'blue', fontWeight: 600 }}>
              {data.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )

  const Information = () => (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 600 }}>
        THÔNG BÁO TIỀN PHÒNG TRỌ THÁNG {new Date().getMonth() + 1}/
        {new Date().getFullYear()}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: 600 }}>
        (Từ ngày {data.startDate}đến {data.endDate})
      </Text>
    </View>
  )
  const CustomerInfo = () => (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
      }}
    >
      <View>
        <Text>
          - Khách hàng:{' '}
          <Text style={{ fontWeight: 600 }}>Nguyễn Ngọc Bình</Text>
        </Text>
        <Text>
          - Sốđiện thoại: <Text style={{ fontWeight: 600 }}>0963618637</Text>
        </Text>
      </View>
      <View>
        <Text>
          - Ngày thuê: <Text style={{ fontWeight: 600 }}>28/01/2024</Text>
        </Text>
        <Text>
          - Tiền phòng:{' '}
          <Text style={{ fontWeight: 600 }}>{data.roomPrice}</Text>
        </Text>
      </View>
    </View>
  )
  const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={[styles.theader, styles.theader3]}>
        <Text style={{ fontWeight: 600 }}>STT</Text>
      </View>
      <View style={styles.theader}>
        <Text style={{ fontWeight: 600 }}>Nội dung</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text style={{ fontWeight: 600 }}>Đơn giá xĐơn vị tính</Text>
      </View>
      <View style={styles.theader}>
        <Text style={{ fontWeight: 600 }}>Thành tiền</Text>
      </View>
    </View>
  )
  const tableData = [
    {
      id: 1,
      name: 'Tiền thuê phòng',
      unit:
        data.dayStayed === getDaysInMonth(new Date())
          ? 'Trọn tháng'
          : `${data.dayStayed} ngày`,
      price: `${convertPriceNotVND(data.roomPrice)}đ/tháng`,
      total: convertPriceNotVND(
        Math.floor(
          (Number(data.roomPrice) * Number(data.dayStayed)) /
            getDaysAmountInMonth(
              new Date().getMonth() + 1,
              new Date().getFullYear()
            )
        )
      )
    },
    {
      id: 2,
      name: 'Điện và Phí ANTT',
      unit: `${data.newElectric - data.oldElectric} (mới ${
        data.newElectric
      } - cũ ${data.oldElectric})`,
      price: `${convertPriceNotVND(data.electricPrice)}đ/KWh`,
      total: convertPriceNotVND(data.totalElectricPrice)
    },
    {
      id: 3,
      name: 'Nước',
      unit: `${data.peopleAmount} người`,
      price: `${convertPriceNotVND(data.waterPrice)}đ/người`,
      total: convertPriceNotVND(data.totalWaterPrice)
    },
    {
      id: 4,
      name: 'Tiền thang máy',
      unit: `${data.peopleAmount} người`,
      price: `${convertPriceNotVND(data.elevatorPrice)}đ/người`,
      total: convertPriceNotVND(data.totalElevatorPrice)
    },

    {
      id: 5,
      name: 'Tiền internet',
      unit: '1 phòng',
      price: `${convertPriceNotVND(data.internetPrice)}đ/phòng`,
      total: convertPriceNotVND(data.internetPrice)
    },
    {
      id: 6,
      name: 'Tiền dịch vụ',
      unit: '1 phòng',
      price: `${convertPriceNotVND(data.servicePrice)}đ/phòng`,
      total: convertPriceNotVND(data.servicePrice)
    },
    {
      id: 7,
      name: 'Tiền phụ thu',
      unit: `${data.peopleRealStayed}/4 người`,
      price: `${convertPriceNotVND(data.surcharge)}đ/số người quá quy định`,
      total: convertPriceNotVND(
        Number(data.peopleRealStayed) - 4 > 0
          ? (Number(data.peopleRealStayed) - 4) * Number(data.surcharge)
          : 0
      )
    },
    {
      id: 8,
      name: 'Tiền giữ xe',
      unit: `${data.vehicleAmount} xe`,
      price: `${convertPriceNotVND(data.parkingPrice)}đ/xe`,
      total: convertPriceNotVND(data.totalParkingPrice)
    },
    {
      id: 9,
      name: 'Tiền nợ cũ',
      unit: '1',
      price: `${convertPriceNotVND(data.oldDebt)}đ`,
      total: convertPriceNotVND(data.oldDebt)
    },

    {
      id: 10,
      name: 'Chi phí phát sinh khác',
      unit: '1',
      price: `${convertPriceNotVND(data.otherPrice)}đ`,
      total: convertPriceNotVND(data.otherPrice)
    }
  ]
  const TableBody = () =>
    tableData.map((item) => (
      <Fragment key={item.id}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={[styles.tbody, styles.tbody3]}>
            <Text>{item.id}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{item.name}</Text>
          </View>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>
              {item.price} x {item.unit}
            </Text>
          </View>
          <View
            style={[
              styles.tbody,
              { flexDirection: 'row', justifyContent: 'flex-end' }
            ]}
          >
            <Text>{item.total}</Text>
          </View>
        </View>
      </Fragment>
    ))
  const TableTotal = () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <View style={styles.total}>
        <Text style={{ fontSize: 15, fontWeight: 600 }}>TỔNG CỘNG</Text>
      </View>
      <View
        style={[
          styles.tbody,
          { flexDirection: 'row', justifyContent: 'flex-end' }
        ]}
      >
        <Text style={{ fontWeight: 600, color: 'blue', fontSize: 15 }}>
          {convertPriceNotVND(data.netProceeds)}
        </Text>
      </View>
    </View>
  )
  const Payment = () => (
    <View
      style={{
        paddingHorizontal: 5,
        paddingVertical: 4,
        border: '1px solid black',
        flexDirection: 'column',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>
        Quý khách thanh toán tiền mặt, hoặc chuyển khoản vào TK{' '}
        <Text style={{ fontWeight: 600, color: 'blue' }}>NGUYỄN NGỌC BÌNH</Text>
      </Text>
      <Text>
        - Số TK Ngân hàng Agribank:{' '}
        <Text style={{ fontWeight: 600, color: 'blue' }}>6905 2052 205 75</Text>
        . Nội dung CK:{' '}
        <Text style={{ fontWeight: 600, color: 'blue' }}>
          {data.name} T{new Date().getMonth() + 1}/{new Date().getFullYear()}
        </Text>
      </Text>
    </View>
  )
  const Note = () => (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: 600, color: 'blue' }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'black'
          }}
        >
          *{' '}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'underline',
            color: 'black'
          }}
        >
          Lưu ý
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'black'
          }}
        >
          :{' '}
        </Text>
        Quý khách vui lòng thanh toán trước ngày{' '}
        <Text style={{ fontSize: 14 }}>
          {addDaysToDateString(data.endDate, 7)}
        </Text>
      </Text>
      <Text
        style={{ fontSize: 12, fontWeight: 600, color: 'black', marginTop: 15 }}
      >
        Trân trọng cảm ơn sự hợp tác của quý khách!
      </Text>
    </View>
  )
  const Sign = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 40
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 30
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 600 }}>Ban Quản lý</Text>
        <Text
          style={{
            fontSize: 12,
            fontStyle: 'italic',
            marginTop: 5,
            color: 'gray'
          }}
        >
          Chữ ký, ghi rõ họ tên
        </Text>
      </View>
    </View>
  )
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Information />
        <CustomerInfo />
        <TableHead />
        <TableBody />
        <TableTotal />
        <Payment />
        <Note />
        <Sign />
      </Page>
    </Document>
  )
}
export default Invoice
