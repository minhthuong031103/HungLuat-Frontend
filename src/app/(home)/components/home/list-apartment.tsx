import { CommonSvg } from '@/assets/CommonSvg'
import AddApartmentModal from './AddApartmentModal'
import ApartmentCard from './apartment-card'
import { Button } from '@nextui-org/react'
import { useModal } from '@/hooks/useModalStore'

const ListApartment = () => {
  const apartments = [
    {
      name: 'Căn hộ 1',
      address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      floors: 10,
      rooms: 40,
      stayed: 20,
      empty: 20,
      sap_tra: 10,
      dacoc: 10,
      url: 'https://s3-alpha-sig.figma.com/img/f538/4e15/2c753e8baef4a06273983d45756cae45?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S6Gvfqlq2ibb~veFg~n0OKTwB~GO1wPJjI8nQnWF~vOzCAl0PaJI~90w15oKMlaMBWA39-RPKIeVivTK1VgLuJ1OKWwRNfy-yQqEfTjIJ2V6H2Q01x1Jy72KyzOG1o-d~MN6sEWqpL0YuVq56Yp23lAx5j7bIXI4GB2g-keFeEnGk2XI-8mikV4dZrIyW7od-S0VkyFAStpiq5ZFyyPDmaijNTd~I2x7lFL1w2dv4WMadubEpkJTRUvI-M3cjlr2SKbG7gjkf0HgGUqJ6Kn2X4jUE6sVDmiLlCwXmMKqb48CHLaJe8i6rSwWeJaOa9B34v-YLNPkRu0n1Xcn4wOrSg__'
    },
    {
      name: 'Căn hộ 2',
      address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      floors: 10,
      rooms: 40,
      stayed: 20,
      empty: 20,
      sap_tra: 10,
      dacoc: 10,
      url: 'https://s3-alpha-sig.figma.com/img/f538/4e15/2c753e8baef4a06273983d45756cae45?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S6Gvfqlq2ibb~veFg~n0OKTwB~GO1wPJjI8nQnWF~vOzCAl0PaJI~90w15oKMlaMBWA39-RPKIeVivTK1VgLuJ1OKWwRNfy-yQqEfTjIJ2V6H2Q01x1Jy72KyzOG1o-d~MN6sEWqpL0YuVq56Yp23lAx5j7bIXI4GB2g-keFeEnGk2XI-8mikV4dZrIyW7od-S0VkyFAStpiq5ZFyyPDmaijNTd~I2x7lFL1w2dv4WMadubEpkJTRUvI-M3cjlr2SKbG7gjkf0HgGUqJ6Kn2X4jUE6sVDmiLlCwXmMKqb48CHLaJe8i6rSwWeJaOa9B34v-YLNPkRu0n1Xcn4wOrSg__'
    },
    {
      name: 'Căn hộ 3',
      address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      floors: 10,
      rooms: 40,
      stayed: 20,
      empty: 20,
      sap_tra: 10,
      dacoc: 10,
      url: 'https://s3-alpha-sig.figma.com/img/f538/4e15/2c753e8baef4a06273983d45756cae45?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S6Gvfqlq2ibb~veFg~n0OKTwB~GO1wPJjI8nQnWF~vOzCAl0PaJI~90w15oKMlaMBWA39-RPKIeVivTK1VgLuJ1OKWwRNfy-yQqEfTjIJ2V6H2Q01x1Jy72KyzOG1o-d~MN6sEWqpL0YuVq56Yp23lAx5j7bIXI4GB2g-keFeEnGk2XI-8mikV4dZrIyW7od-S0VkyFAStpiq5ZFyyPDmaijNTd~I2x7lFL1w2dv4WMadubEpkJTRUvI-M3cjlr2SKbG7gjkf0HgGUqJ6Kn2X4jUE6sVDmiLlCwXmMKqb48CHLaJe8i6rSwWeJaOa9B34v-YLNPkRu0n1Xcn4wOrSg__'
    },
    {
      name: 'Căn hộ 4',
      address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      floors: 10,
      rooms: 40,
      stayed: 20,
      empty: 20,
      sap_tra: 10,
      dacoc: 10,
      url: 'https://s3-alpha-sig.figma.com/img/f538/4e15/2c753e8baef4a06273983d45756cae45?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S6Gvfqlq2ibb~veFg~n0OKTwB~GO1wPJjI8nQnWF~vOzCAl0PaJI~90w15oKMlaMBWA39-RPKIeVivTK1VgLuJ1OKWwRNfy-yQqEfTjIJ2V6H2Q01x1Jy72KyzOG1o-d~MN6sEWqpL0YuVq56Yp23lAx5j7bIXI4GB2g-keFeEnGk2XI-8mikV4dZrIyW7od-S0VkyFAStpiq5ZFyyPDmaijNTd~I2x7lFL1w2dv4WMadubEpkJTRUvI-M3cjlr2SKbG7gjkf0HgGUqJ6Kn2X4jUE6sVDmiLlCwXmMKqb48CHLaJe8i6rSwWeJaOa9B34v-YLNPkRu0n1Xcn4wOrSg__'
    },
    {
      name: 'Căn hộ 5',
      address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      floors: 10,
      rooms: 40,
      stayed: 20,
      empty: 20,
      sap_tra: 10,
      dacoc: 10,
      url: 'https://s3-alpha-sig.figma.com/img/f538/4e15/2c753e8baef4a06273983d45756cae45?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S6Gvfqlq2ibb~veFg~n0OKTwB~GO1wPJjI8nQnWF~vOzCAl0PaJI~90w15oKMlaMBWA39-RPKIeVivTK1VgLuJ1OKWwRNfy-yQqEfTjIJ2V6H2Q01x1Jy72KyzOG1o-d~MN6sEWqpL0YuVq56Yp23lAx5j7bIXI4GB2g-keFeEnGk2XI-8mikV4dZrIyW7od-S0VkyFAStpiq5ZFyyPDmaijNTd~I2x7lFL1w2dv4WMadubEpkJTRUvI-M3cjlr2SKbG7gjkf0HgGUqJ6Kn2X4jUE6sVDmiLlCwXmMKqb48CHLaJe8i6rSwWeJaOa9B34v-YLNPkRu0n1Xcn4wOrSg__'
    }
  ]
  const { onOpen } = useModal()
  //  useEffect(() => {
  //    const getApartments = async () => {
  //      const res = await axiosClient.get('/apartment/all')
  //      setApartments(res.data.items)
  //    }
  //    getApartments()
  //  }, [])
  return (
    <>
      <div className="flex items-end justify-between">
        <p className="font-semibold font-lg text-gray">Danh sách căn hộ</p>
        <Button
          onPress={() => onOpen('createApartment')}
          className="rounded-[8px] px-4 py-2 bg-blueButton"
        >
          <div className="flex flex-row items-center gap-x-[8px] ">
            <div>{CommonSvg.plus()}</div>
            <div className="text-white mt-[1px] font-medium">Thêm mới</div>
          </div>
        </Button>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {apartments.map((apartment, index) => (
          <ApartmentCard key={index} apartment={apartment} />
        ))}
      </div>
    </>
  )
}

export default ListApartment
