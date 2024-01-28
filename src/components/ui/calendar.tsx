/** @format */

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { vi } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 110%; 
    color: red;
  }
`

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <>
      <style>{css}</style>

      <DayPicker
        captionLayout="dropdown-buttons"
        fromYear={1950}
        toYear={2025}
        locale={vi}
        showOutsideDays={showOutsideDays}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today'
        }}
        // className={cn('p-3', className)}
        classNames={{
          dropdown_icon: 'hidden',
          dropdown_month: 'mr-4',
          months: 'cursor-pointer'
          // months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          // month: 'space-y-4',
          // nav: 'space-x-1 flex items-center',
          // nav_button: cn(
          //   buttonVariants({ variant: 'outline' }),
          //   'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          // ),
          // nav_button_previous: 'absolute left-1',
          // nav_button_next: 'absolute right-1',
          // table: 'w-full border-collapse space-y-1',
          // head_row: 'flex',
          // head_cell:
          //   'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
          // row: 'flex w-full mt-2',
          // cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          // day: cn(
          //   buttonVariants({ variant: 'ghost' }),
          //   'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
          // ),
          // day_selected:
          //   'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          // day_today: 'bg-accent text-accent-foreground',
          // day_outside: 'text-muted-foreground opacity-50',
          // dropdown_month: 'w-full',
          // dropdown_year: 'w-full',
          // dropdown_icon: 'hidden',
          // day_disabled: 'text-muted-foreground opacity-50',
          // day_range_middle:
          //   'aria-selected:bg-accent aria-selected:text-accent-foreground',
          // day_hidden: 'invisible',
          // ...classNames,
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />
        }}
        {...props}
      />
    </>
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
