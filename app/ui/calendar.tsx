"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { useState } from "react"
import { cn } from "../lib/utils"
import { buttonVariants } from "./buttons"
import { formatDate } from "../lib/formattedDate"
import { useEffect } from "react"
import { useAtom, useSetAtom } from "jotai"
import { metaAtom, sessionAtom } from "../states/common"
import { getSessions } from "../queries/eventGroups"


export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  modifiers,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [calendarData, setCalendarData] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState<any | null>({});
  const setSessionMeta = useSetAtom(sessionAtom);
  const [sessionInfo] = useAtom(sessionAtom);
  const [timezone, setTimezone] = useState<string>("");
  const [meta] = useAtom(metaAtom);

  const { eventInfo } = sessionInfo;
  console.log(sessionInfo, 'yayaya')
  const handleDayClick = async (date: any) => {
    setSelectedDate(date);
    // const formattedDate = formatDate(date, timezone, 'yyyy-MM-dd');
    const formattedDate = formatDate(date, timezone, 'yyyy-MM-dd');
    const sessions: any = await getSessions(eventInfo.gaEventTmpId, eventInfo.gaGroupIds, formattedDate, eventInfo.cityId);
    const availableSessions = sessions?.sessions.event_session._data;
    
    // update sessionMeta
    setSessionMeta((props: any) => ({
      ...props,
      selectedDate: formattedDate,
      sessions: availableSessions,
    }))
  };

  useEffect(() => {
    if (meta.city) {
      setTimezone(meta?.city?.timezone);
    }
    if (modifiers && modifiers.available) {
      setCalendarData(modifiers)
    }
  }, [modifiers, meta])
  return (
    <DayPicker
      onDayClick={(date) => handleDayClick(date as Date)}
      showOutsideDays={showOutsideDays}
      // className={cn("p-3", className)}
      className={cn("p-0 box-border", className)}
      selected={selectedDate}
      // modifiers={{
      //   selected: (date) => cn('day_selected'),
      // }}
      disabled={(date) => {
        const theDate = formatDate(date, timezone, 'yyyy-MM-dd')
        return !calendarData?.available?.includes(theDate)
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-none"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 border-r border-b",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full",
        cell: "h-[46px] w-[46px] items-center text-center text-sm p-0 relative border-t border-l relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full p-[20px] font-normal aria-selected:opacity-100 "
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
        day_today: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
        day_outside:
          "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
