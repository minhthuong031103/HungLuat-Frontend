/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import { getRequest } from '@/lib/fetch'

export const SelectAddress = () => {
  const [selectedProvince, setSelectedProvince] = useState(new Set([]))
  const [selectedDistrict, setSelectedDistrict] = useState(new Set([]))
  const [selectedWard, setSelectedWard] = useState(new Set([]))

  const [provinceTouched, setProvinceTouched] = useState(false)
  const [districtTouched, setDistrictTouched] = useState(false)
  const [wardTouched, setWardTouched] = useState(false)

  const [isLoadingProvince, setIsLoadingProvince] = useState(false)
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false)
  const [isLoadingWard, setIsLoadingWard] = useState(false)

  const [provinces, setProvince] = useState([])
  const [districts, setDistrict] = useState([])
  const [wards, setWard] = useState([])

  useEffect(() => {
    async function getProvince() {
      setIsLoadingProvince(true)
      const res = await getRequest({
        endPoint: 'https://provinces.open-api.vn/api/p/'
      })

      setProvince(res)
      setIsLoadingProvince(false)
    }
    getProvince()
  }, [])
  useEffect(() => {
    setDistrict([])
    setWard([])
    async function getDistrict() {
      if (selectedProvince.size > 0) {
        setIsLoadingDistrict(true)
        const valuesArray = Array.from(selectedProvince)
        const provinceCode = valuesArray[0]
        const res = await getRequest({
          endPoint: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        })
        setDistrict(res?.districts)
        setIsLoadingDistrict(false)
      }
    }
    getDistrict()
  }, [selectedProvince])
  useEffect(() => {
    async function getWard() {
      if (selectedDistrict.size > 0) {
        setIsLoadingWard(true)
        const valuesArray = Array.from(selectedDistrict)
        const districtCode = valuesArray[0]
        const res = await getRequest({
          endPoint: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        })
        setWard(res?.wards)
        setIsLoadingWard(false)
      }
    }

    getWard()
  }, [selectedDistrict])
  const isProvinceValid = selectedProvince.size > 0
  const isDistrictValid = selectedDistrict.size > 0
  const isWardValid = selectedWard.size > 0

  // const onSubmit = () => {
  //   const valuesArrayProvince = Array.from(selectedProvince)
  //   const provinceCode = valuesArrayProvince[0]
  //   const provinceValue = provinces.find(
  //     (province) => province.code == provinceCode
  //   )?.name

  //   const valuesArrayDistrict = Array.from(selectedDistrict)
  //   const districtCode = valuesArrayDistrict[0]
  //   const districtValue = districts.find(
  //     (district) => district.code == districtCode
  //   )?.name

  //   const valuesArrayWard = Array.from(selectedWard)
  //   const wardCode = valuesArrayWard[0]
  //   const wardValue = wards.find((ward) => ward.code == wardCode)?.name

  //   if (danhMucValue === 'Căn hộ' || danhMucValue === 'Văn phòng') {
  //     setAddressValue(
  //       `Mã căn ${maCanValue}, tháp ${blockValue}, tầng ${tangSoValue} , số nhà ${houseNumberValue}, đường ${streetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
  //     )
  //   } else if (danhMucValue === 'Nhà ở') {
  //     setAddressValue(
  //       `Mã căn ${maCanValue}, phân khu lô ${phanKhuLoValue} , số nhà ${houseNumberValue}, đường ${streetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
  //     )
  //   } else {
  //     setAddressValue(
  //       `Phân khu ${tenPhanKhuValue}, mã lô ${maLoValue} ,số nhà ${houseNumberValue}, đường ${streetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
  //     )
  //   }
  //   setIsModalOpen(false)
  // }
  return (
    <>
      <Select
        key={'province'}
        radius={'sm'}
        variant={'bordered'}
        label="Thành phố, tỉnh thành"
        isInvalid={isProvinceValid || !provinceTouched ? false : true}
        errorMessage={
          isProvinceValid || !provinceTouched
            ? ''
            : 'Vui lòng chọn thành phố, tỉnh thành'
        }
        autoFocus={false}
        placeholder="Chọn thành phố, tỉnh thành"
        selectedKeys={selectedProvince}
        isLoading={isLoadingProvince}
        onSelectionChange={setSelectedProvince}
        className="w-full "
        onClose={() => setProvinceTouched(true)}
      >
        {provinces?.map((province) => (
          <SelectItem key={province.code} value={province.code}>
            {province.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        key={'district'}
        radius={'sm'}
        variant={'bordered'}
        label="Quận, huyện"
        isInvalid={isDistrictValid || !districtTouched ? false : true}
        errorMessage={
          isDistrictValid || !districtTouched ? '' : 'Vui lòng chọn quận, huyện'
        }
        autoFocus={false}
        placeholder="Chọn quận, huyện"
        selectedKeys={selectedDistrict}
        isLoading={isLoadingDistrict}
        onSelectionChange={setSelectedDistrict}
        className="w-full "
        onClose={() => setDistrictTouched(true)}
      >
        {districts?.map((district) => (
          <SelectItem key={district.code} value={district.code}>
            {district.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        key={'ward'}
        radius={'sm'}
        variant={'bordered'}
        label="Xã, phường"
        isInvalid={isWardValid || !wardTouched ? false : true}
        errorMessage={
          isWardValid || !wardTouched ? '' : 'Vui lòng chọn xã, phường'
        }
        autoFocus={false}
        placeholder="Chọn xã, phường"
        selectedKeys={selectedWard}
        isLoading={isLoadingWard}
        onSelectionChange={setSelectedWard}
        className="w-full "
        onClose={() => setWardTouched(true)}
      >
        {wards?.map((ward) => (
          <SelectItem key={ward.code} value={ward.code}>
            {ward.name}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
