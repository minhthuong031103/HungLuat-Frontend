import AddApartmentModal from './AddApartmentModal'
import ApartmentCard from './apartment-card'

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
    }
  ]
  return (
    <>
      <div className="flex items-end justify-between">
        <p className="font-semibold font-lg text-gray">Danh sách căn hộ</p>
        <AddApartmentModal />
      </div>
      <div className="w-full h-full mt-4 justify-start grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {apartments.map((apartment, index) => (
          <ApartmentCard key={index} apartment={apartment} />
        ))}
      </div>
    </>
  )
}

export default ListApartment
