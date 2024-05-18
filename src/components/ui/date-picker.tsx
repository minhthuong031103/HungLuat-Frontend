/** @format */

import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';

interface DatePickerProps {
  date: Date | undefined;
  labelCustom?: string;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  label?: string;
}

export function DatePicker({
  date,
  setDate,
  label,
  labelCustom,
}: DatePickerProps) {
  return (
    <div className="flex flex-col space-y-3">
      {label && (
        <div className={cn('font-bold text-sm ', labelCustom)}>{label}</div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <div className="flex flex-row gap-x-1 items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, 'dd MMMM, yyyy', { locale: enUS })
              ) : (
                <span>Select Date</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown-buttons"
            fromYear={1950}
            toYear={2025}
            mode="single"
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
