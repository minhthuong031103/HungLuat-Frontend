import { CommonSvg } from '@/assets/CommonSvg'
import { SearchBar } from '../(components)/home/searchbar'

const RoomsPage = () => {
  return (
    <>
      <div className="w-full p-3 border-1 drop-shadow border-borderColor rounded-lg">
        <p className="font-medium text-sm text-black">Tìm kiếm</p>
        <SearchBar />
        <div className="w-fit pb-2 flex items-center gap-3 cursor-pointer">
          <p className="font-medium text-base text-gray hover:font-semibold hover:scale-105">
            Tìm kiếm nâng cao
          </p>
          {CommonSvg.dropdown()}
        </div>
      </div>
      <div className="w-full h-full mt-4">123</div>
    </>
  )
}

export default RoomsPage
