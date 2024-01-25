import { cn } from '@/lib/utils'
import { Select, SelectItem } from '@nextui-org/react'

interface CustomSelectProps {
  label?: string
  placeholder?: string
  value: string
  isRequired?: boolean
  variant?: 'flat' | 'bordered' | 'underlined' | 'faded'
  setValue: (e: string) => void
  data: string[]
  className?: string
  classNames?: object
  isLoading?: boolean
}
export const CustomSelect = ({
  label,
  placeholder = 'Chọn',
  value,
  setValue,
  variant = 'bordered',
  isRequired = false,
  isLoading = false,
  data,
  className,
  classNames
}: CustomSelectProps) => {
  return (
    <Select
      variant={variant}
      isRequired={isRequired}
      label={label}
      placeholder={placeholder}
      labelPlacement={'outside'}
      selectedKeys={value}
      classNames={classNames}
      isLoading={isLoading}
      className={cn('max-w-xs', className)}
      onSelectionChange={(e) => {
        setValue(e)
      }}
    >
      {data.map((item) => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  )
}
