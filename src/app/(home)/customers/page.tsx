'use client'

import { CommonSvg } from '@/assets/CommonSvg'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SearchBar } from '../(components)/home/searchbar'
import { useCustomer } from '@/hooks/useCustomer'
import ListCustomer from './list-customer'

const page = () => {
  const [customers, setCustomers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const handleGetCustomers = async () => {
    const res = await getCustomers({
      searchField: 'name',
      search: searchValue
    })
    setCustomers(res.data.items)
  }
  const { getCustomers } = useCustomer()
  useEffect(() => {
    handleGetCustomers()
  }, [])
  const handleSearch = () => {
    handleGetCustomers()
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
        <ListCustomer customers={customers} />
      </div>
    </>
  )
}

export default page
