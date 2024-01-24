'use client'
import { cn, getCurrentMonth } from '@/lib/utils'
import { SearchBar } from '../(components)/home/searchbar'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CustomSelect } from '../(components)/home/custom-select'
import { useApartment } from '@/hooks/useApartment'
import { CommonSvg } from '@/assets/CommonSvg'
import { Apartment } from '@/types'
import { Button } from '@nextui-org/react'
import ListRooms from '@/components/rooms/ListRooms'
import BuildingPlan from '@/components/buildingPlan/BuildingPlan'
import { useModal } from '@/hooks/useModalStore'

const RoomsPage = () => {
  const [searchAdvanced, setSearchAdvanced] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [electricityPrice, setElectricityPrice] = useState('')
  const [statusRoom, setStatusRoom] = useState('')
  const [statusPayment, setStatusPayment] = useState('')
  const [apartments, setApartments] = useState([])
  const [apartmentChosen, setApartmentChosen] = useState('')
  const { onOpen } = useModal()
  const handleGetApartments = async () => {
    const res = await getApartments({
      searchField: 'name',
      search: searchValue
    })
    setApartments(res.data.items)
  }
  const { getApartments } = useApartment()
  useEffect(() => {
    handleGetApartments()
  }, [])
  const [month, setMonth] = useState('')
  const handleSearch = () => {}
  const classNameChosen = 'font-semibold text-sm text-white'
  const classNameNotChosen = 'font-medium text-sm text-black'
  const [apartment, setApartment] = useState({} as Apartment)
  useEffect(() => {
    if (apartmentChosen) {
      const temp = apartments.find(
        (item) => item.name === Array.from(apartmentChosen)[0]
      )
      setApartment(temp)
    }
  }, [apartmentChosen])
  const [flag, setFlag] = useState(false)
  return (
    <>
      <div className="w-full p-3 border-1 drop-shadow border-borderColor rounded-lg">
        <p className="font-medium text-sm text-black">Tìm kiếm</p>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
        <div
          className="w-fit pb-2 flex items-center gap-3 cursor-pointer group"
          onClick={() => setSearchAdvanced(!searchAdvanced)}
        >
          <p className="font-medium text-base text-gray group-hover:font-semibold group-hover:scale-105">
            Tìm kiếm nâng cao
          </p>
          <ChevronDown
            className={cn(
              'text-gray group-hover:font-semibold group-hover:scale-105',
              searchAdvanced && 'transform rotate-180'
            )}
            size={18}
          />
        </div>
        {searchAdvanced && (
          <div className="flex w-full gap-5 mt-2 pb-2">
            <CustomSelect
              label="Cập nhật điện nước"
              value={electricityPrice}
              setValue={setElectricityPrice}
              data={['1', '2', '3']}
            />
            <CustomSelect
              label="Trạng thái phòng"
              value={statusRoom}
              setValue={setStatusRoom}
              data={['1', '2', '3']}
            />
            <CustomSelect
              label="Trạng thái thu tiền"
              value={statusPayment}
              setValue={setStatusPayment}
              data={['1', '2', '3']}
            />
            <CustomSelect
              label="Tháng"
              value={month}
              setValue={setMonth}
              data={['1', '2', '3']}
            />
          </div>
        )}
      </div>
      <div className="w-full h-full mt-4">
        <div className="flex gap-4 items-center">
          <CustomSelect
            placeholder="Chọn căn hộ"
            variant="flat"
            value={apartmentChosen}
            setValue={setApartmentChosen}
            data={apartments.map((apartment) => apartment.name)}
            className="max-w-[250px]"
            classNames={{
              selectorIcon: 'text-gray',
              value:
                'text-gray uppercase font-semibold text-lg group-data-[has-value=true]:text-gray',
              trigger:
                'data-[hover=true]:bg-white group-data-[focused=true]:bg-white bg-white'
            }}
          />
          <p className="font-bold text-gray text-lg">
            Tháng {getCurrentMonth()}
          </p>
        </div>
        {apartmentChosen && apartment && (
          <div className="mt-2 space-y-5 pl-4">
            <div className="flex gap-2 items-center ">
              <div>{CommonSvg.address()}</div>
              <p className="text-black font-semibold text-sm ">
                {apartment?.address}
              </p>
            </div>
            <div className="flex items-end">
              <div
                className={cn(
                  'flex items-center justify-center p-2 border-1 cursor-pointer',
                  !flag && 'bg-gray pointer-events-none'
                )}
                onClick={() => setFlag(!flag)}
              >
                <p className={!flag ? classNameChosen : classNameNotChosen}>
                  Danh sách phòng
                </p>
              </div>
              <div
                className={cn(
                  'flex items-center justify-center p-2 border-1 cursor-pointer',
                  !!flag && 'bg-gray pointer-events-none'
                )}
                onClick={() => setFlag(!flag)}
              >
                <p className={!flag ? classNameNotChosen : classNameChosen}>
                  Sơ đồ tòa nhà
                </p>
              </div>
              <div className="ml-auto">
                <Button className="rounded-[8px] px-4 py-2 bg-blueButton mr-6">
                  <div className="flex flex-row items-center gap-x-[8px] ">
                    <div>{CommonSvg.export()}</div>
                    <div className="text-white mt-[1px] font-medium">
                      Xuất phiếu
                    </div>
                  </div>
                </Button>
                <Button
                  className="rounded-[8px] px-4 py-2 bg-blueButton"
                  onPress={() =>
                    onOpen('createRoom', {
                      numberFloor: apartment?.numberFloor
                    })
                  }
                >
                  <div className="flex flex-row items-center gap-x-[8px] ">
                    <div>{CommonSvg.plus()}</div>
                    <div className="text-white mt-[1px] font-medium">
                      Thêm mới
                    </div>
                  </div>
                </Button>
              </div>
            </div>
            <div>
              {!flag ? (
                <ListRooms apartmentId={apartment?.id} />
              ) : (
                <BuildingPlan />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default RoomsPage
