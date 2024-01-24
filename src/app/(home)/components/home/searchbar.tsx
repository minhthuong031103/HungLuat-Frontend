/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { CommonSvg } from '@/assets/CommonSvg'
import { Button, Input } from '@nextui-org/react'

export function SearchBar() {
  return (
    <div className="w-full my-2 flex items-center gap-8">
      <Input
        isClearable
        radius="sm"
        size="sm"
        fullWidth={false}
        classNames={{
          input: [
            'bg-transparent',
            'text-black/90',
            'placeholder:text-default-700/80 placeholder:text-sm'
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'bg-white',

            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',

            'group-data-[focused=true]:bg-default-200/50',

            '!cursor-text',
            'w-[535px]',
            'border-1',
            'border-borderColor'
          ],
          base: 'w-fit'
        }}
        placeholder="Nhập thông tin tìm kiếm"
        startContent={CommonSvg.searchIcon({
          className: 'text-black/50 mb-0.5 pointer-events-none flex-shrink-0'
        })}
      />
      <Button
        className="bg-gray text-white px-4 py-2 font-semibold text-base w-[162px]"
        variant="solid"
      >
        Tìm kiếm
      </Button>
    </div>
  )
}