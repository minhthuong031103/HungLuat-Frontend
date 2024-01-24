'use client'

import { CommonSvg } from '@/assets/CommonSvg'
import { SearchBar } from './(components)/home/searchbar'
import ListApartment from './(components)/home/list-apartment'
import { useEffect, useState } from 'react'
import { useApartment } from '@/hooks/useApartment'

const page = () => {
  const [apartments, setApartments] = useState([])
  const { getApartments } = useApartment()
  useEffect(() => {
    const handleGetApartments = async () => {
      const res = await getApartments()
      setApartments(res.data.items)
    }
    handleGetApartments()
  }, [])
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

      <div className="w-full h-full mt-4">
        <ListApartment apartments={apartments} />
      </div>
    </>
  )
}

export default page
