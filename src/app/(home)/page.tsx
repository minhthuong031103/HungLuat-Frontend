'use client'

import { SearchBar } from './(components)/home/searchbar'
import ListApartment from './(components)/home/list-apartment'
import { useEffect, useState } from 'react'
import { useApartment } from '@/hooks/useApartment'
import { ChevronDown } from 'lucide-react'

const page = () => {
  const [apartments, setApartments] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const handleGetApartments = async () => {
    const res = await getApartments({
      searchField: 'name',
      search: searchValue
    })
    setApartments(res?.data?.items)
  }
  const { getApartments } = useApartment()
  useEffect(() => {
    handleGetApartments()
  }, [])
  const handleSearch = () => {
    handleGetApartments()
  }
  return (
    <>
      <div className="w-full p-3 border-1 drop-shadow border-borderColor rounded-lg">
        <p className="font-medium text-sm text-black">Tìm kiếm</p>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
        <div className="w-fit pb-2 flex items-center gap-3 cursor-pointer group">
          <p className="font-medium text-base text-gray group-hover:font-semibold group-hover:scale-105">
            Tìm kiếm nâng cao
          </p>
          <ChevronDown
            className="text-gray group-hover:font-semibold group-hover:scale-105"
            size={18}
          />
        </div>
      </div>

      <div className="w-full h-full mt-4">
        <ListApartment apartments={apartments} onAction={handleGetApartments} />
      </div>
    </>
  )
}

export default page
