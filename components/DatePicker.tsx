import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { formatDateToString } from "@/lib/utils";

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  defaultValue?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  allowClear?: boolean;
  openInDate?: Date;
  disabled?: boolean;
  showTime?: boolean;
  timeFormat?: "12h" | "24h";
  showBelow?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  allowClear = false,
  defaultValue = null,
  maxDate,
  minDate,
  onChange,
  openInDate,
  placeholder,
  value,
  disabled = false,
  showTime = false,
  timeFormat = "24h",
  showBelow = false,
}) => {
  const [calendarView, setCalendarView] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue);

  const getInitialTimeView = useCallback(
    (sourceDate: Date | null) => {
      let h = 0,
        m = 0,
        ap = "AM";

      if (sourceDate) {
        h = sourceDate.getHours();
        m = sourceDate.getMinutes();
        ap = h >= 12 ? "PM" : "AM";
        if (timeFormat === "12h") {
          h = h % 12 || 12;
        }
      } else {
        h = timeFormat === "12h" ? 12 : 0;
        m = 0;
        ap = timeFormat === "12h" ? (h >= 12 ? "PM" : "AM") : "AM";
        if (h === 0 && timeFormat === "12h") ap = "AM";
        if (h === 12 && timeFormat === "12h") ap = "PM";
        if (timeFormat === "12h" && h === 12 && m === 0 && !sourceDate)
          ap = "AM";
      }
      return { hours: h, minutes: m, ampm: ap };
    },
    [timeFormat]
  );

  const [timeView, setTimeView] = useState(getInitialTimeView(defaultValue));
  const [openUpward, setOpenUpward] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const dateValue = isControlled ? value : selectedDate;

  const createDateWithTime = (
    year: number,
    month: number,
    day: number,
    hoursInput: number,
    minutesInput: number
  ): Date => {
    let h24 = hoursInput;
    if (timeFormat === "12h") {
      if (timeView.ampm === "PM" && hoursInput < 12) {
        h24 = hoursInput + 12;
      } else if (timeView.ampm === "AM" && hoursInput === 12) {
        // 12 AM (midnight)
        h24 = 0;
      }
      // For AM 1-11, hoursInput (1-11) is already correct for h24.
      // For PM 12 (noon), hoursInput (12) is already correct for h24.
    }
    return new Date(year, month, day, h24, minutesInput);
  };

  const createFullDate = (year: number, month: number, day: number): Date => {
    if (showTime) {
      return createDateWithTime(
        year,
        month,
        day,
        timeView.hours,
        timeView.minutes
      );
    } else {
      return new Date(year, month, day, 0, 0, 0, 0);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (!isControlled) setSelectedDate(date);
    onChange?.(date);
  };

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDateChange(null);
    setTimeView(getInitialTimeView(null));
  };

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday as 0
  };

  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return;
    const newDate = createFullDate(
      calendarView.getFullYear(),
      calendarView.getMonth(),
      day
    );
    handleDateChange(newDate);
    if (!showTime) {
      setShowCalendar(false);
    }
  };

  const handleNextMonthDateClick = (day: number) => {
    if (isNextMonthDateDisabled(day)) return;
    const nextMonth = (calendarView.getMonth() + 1) % 12;
    const nextYear =
      calendarView.getMonth() === 11
        ? calendarView.getFullYear() + 1
        : calendarView.getFullYear();
    const newDate = createFullDate(nextYear, nextMonth, day);
    handleDateChange(newDate);
    setCalendarView(new Date(nextYear, nextMonth, 1));
    if (!showTime) {
      setShowCalendar(false);
    }
  };

  const handlePreviousMonthDateClick = (day: number) => {
    if (isPreviousMonthDateDisabled(day)) return;
    const prevMonth = (calendarView.getMonth() - 1 + 12) % 12;
    const prevYear =
      calendarView.getMonth() === 0
        ? calendarView.getFullYear() - 1
        : calendarView.getFullYear();
    const newDate = createFullDate(prevYear, prevMonth, day);
    handleDateChange(newDate);
    setCalendarView(new Date(prevYear, prevMonth, 1));
    if (!showTime) {
      setShowCalendar(false);
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(
      calendarView.getFullYear(),
      calendarView.getMonth(),
      day
    );
    date.setHours(0, 0, 0, 0); // Compare date part only
    const minD = minDate
      ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      : null;
    if (minD) minD.setHours(0, 0, 0, 0);
    const maxD = maxDate
      ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
      : null;
    if (maxD) maxD.setHours(0, 0, 0, 0);

    if (minD && date < minD) return true;
    if (maxD && date > maxD) return true;
    return false;
  };

  const isNextMonthDateDisabled = (day: number) => {
    const month = (calendarView.getMonth() + 1) % 12;
    const year =
      calendarView.getMonth() === 11
        ? calendarView.getFullYear() + 1
        : calendarView.getFullYear();
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    const minD = minDate
      ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      : null;
    if (minD) minD.setHours(0, 0, 0, 0);
    const maxD = maxDate
      ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
      : null;
    if (maxD) maxD.setHours(0, 0, 0, 0);
    if (minD && date < minD) return true;
    if (maxD && date > maxD) return true;
    return false;
  };

  const isPreviousMonthDateDisabled = (day: number) => {
    const month = (calendarView.getMonth() - 1 + 12) % 12;
    const year =
      calendarView.getMonth() === 0
        ? calendarView.getFullYear() - 1
        : calendarView.getFullYear();
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    const minD = minDate
      ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      : null;
    if (minD) minD.setHours(0, 0, 0, 0);
    const maxD = maxDate
      ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
      : null;
    if (maxD) maxD.setHours(0, 0, 0, 0);
    if (minD && date < minD) return true;
    if (maxD && date > maxD) return true;
    return false;
  };

  const isSelectedDay = (day: number) =>
    dateValue?.getDate() === day &&
    dateValue?.getMonth() === calendarView.getMonth() &&
    dateValue?.getFullYear() === calendarView.getFullYear();

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === calendarView.getMonth() &&
      today.getFullYear() === calendarView.getFullYear()
    );
  };

  const calculatePosition = useCallback(() => {
    if (!datePickerRef.current) return false;
    const pickerRect = datePickerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const estimatedCalendarHeight = showTime ? 400 : 340;
    const spaceBelow = windowHeight - pickerRect.bottom;
    return (
      spaceBelow < estimatedCalendarHeight &&
      pickerRect.top > estimatedCalendarHeight
    );
  }, [showTime]);

  const toggleCalendar = () => {
    if (!showCalendar) {
      // Calendar is about to open
      setOpenUpward(calculatePosition());

      const calendarDisplayDate = openInDate ?? dateValue ?? new Date();
      setCalendarView(
        new Date(
          calendarDisplayDate.getFullYear(),
          calendarDisplayDate.getMonth(),
          calendarDisplayDate.getDate()
        )
      );

      // Determine the source for the time picker's initial time
      let timePickerSource: Date | null = null;
      if (dateValue) {
        timePickerSource = dateValue; // Use actual selected date/time
      } else if (showTime && openInDate) {
        timePickerSource = openInDate; // Use openInDate's time if provided and showTime is active
      }
      // If no dateValue, and (no openInDate for time OR !showTime),
      // timePickerSource remains null. getInitialTimeView(null) will default to midnight.
      setTimeView(getInitialTimeView(timePickerSource));
    }
    setShowCalendar(!showCalendar);
  };

  const handleTimeChange = (type: "hours" | "minutes", value: number) => {
    let newHoursInView = timeView.hours;
    let newMinutesInView = timeView.minutes;

    if (type === "hours") {
      if (timeFormat === "12h") {
        newHoursInView = Math.max(1, Math.min(12, value));
      } else {
        // 24h
        newHoursInView = Math.max(0, Math.min(23, value));
      }
    } else {
      // minutes
      newMinutesInView = Math.max(0, Math.min(59, value));
    }

    const newTimeViewState = {
      ...timeView,
      hours: newHoursInView,
      minutes: newMinutesInView,
    };
    setTimeView(newTimeViewState);

    if (dateValue) {
      const newDate = createDateWithTime(
        dateValue.getFullYear(),
        dateValue.getMonth(),
        dateValue.getDate(),
        newHoursInView,
        newMinutesInView
      );
      handleDateChange(newDate);
    } else if (showTime) {
      // If no date is selected yet, but time is changed, we might want to create a new date
      // For now, we only update timeView. A date must be picked to form a full Date.
      // Or, we could decide to create a date based on `calendarView` current day
      // This behavior might need further clarification based on desired UX.
    }
  };

  const toggleAmPm = () => {
    if (timeFormat !== "12h") return;

    const newAmPm = timeView.ampm === "AM" ? "PM" : "AM";
    const newTimeViewState = { ...timeView, ampm: newAmPm };
    setTimeView(newTimeViewState);

    if (dateValue) {
      let h24 = timeView.hours; // current hours in 1-12 format
      if (newAmPm === "PM" && timeView.hours < 12) {
        h24 = timeView.hours + 12;
      } else if (newAmPm === "AM" && timeView.hours === 12) {
        // 12 PM (noon) -> 12 AM (midnight)
        h24 = 0;
      }
      // If newAmPm is AM and timeView.hours is 1-11 (e.g. 10 PM -> 10 AM), h24 remains timeView.hours (1-11).
      // If newAmPm is PM and timeView.hours is 12 (e.g. 12 AM -> 12 PM), h24 remains timeView.hours (12).

      const newDate = new Date(
        dateValue.getFullYear(),
        dateValue.getMonth(),
        dateValue.getDate(),
        h24,
        timeView.minutes
      );
      handleDateChange(newDate);
    }
  };

  const renderCalendar = () => {
    const month = calendarView.getMonth();
    const year = calendarView.getFullYear();
    const days = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const totalCells = Math.ceil((firstDay + days) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + days);

    return (
      <div className="grid grid-cols-7 gap-1 text-sm text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="font-semibold p-1">
            {day}
          </div>
        ))}
        {[...Array(firstDay).keys()].map((_, i) => {
          const prevMonthDaysCount = daysInMonth(
            month === 0 ? 11 : month - 1,
            month === 0 ? year - 1 : year
          );
          const day = prevMonthDaysCount - firstDay + i + 1;
          const isDisabled = isPreviousMonthDateDisabled(day);
          return (
            <div
              key={`prev-${i}`}
              className={`p-1 rounded cursor-pointer text-gray-400 ${
                isDisabled
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => !isDisabled && handlePreviousMonthDateClick(day)}
            >
              {day}
            </div>
          );
        })}
        {[...Array(days).keys()].map((_, i) => {
          const day = i + 1;
          const isDisabled = isDateDisabled(day);
          const isTodayDate = isToday(day);
          const isSelected = isSelectedDay(day);
          return (
            <div
              key={`current-${i}`}
              className={`p-1 rounded cursor-pointer 
                ${isTodayDate && !isSelected ? "border border-blue-500" : ""} 
                ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"} 
                ${isDisabled ? "opacity-30 pointer-events-none" : ""}`}
              onClick={() => !isDisabled && handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
        {[...Array(nextMonthDays).keys()].map((_, i) => {
          const day = i + 1;
          const isDisabled = isNextMonthDateDisabled(day);
          return (
            <div
              key={`next-${i}`}
              className={`p-1 rounded cursor-pointer text-gray-400 ${
                isDisabled
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => !isDisabled && handleNextMonthDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mouseup", handleClickOutside);
    }
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [showCalendar]);

  useEffect(() => {
    if (showCalendar) {
      const handleResizeOrScroll = () => setOpenUpward(calculatePosition());
      window.addEventListener("resize", handleResizeOrScroll);
      window.addEventListener("scroll", handleResizeOrScroll, true);
      return () => {
        window.removeEventListener("resize", handleResizeOrScroll);
        window.removeEventListener("scroll", handleResizeOrScroll, true);
      };
    }
  }, [showCalendar, calculatePosition]);

  useEffect(() => {
    // Update timeView if controlled `value` changes.
    // If `value` is null, timeView resets to default (midnight/12 AM).
    if (isControlled && showTime) {
      setTimeView(getInitialTimeView(value));
    }
  }, [value, isControlled, showTime, timeFormat, getInitialTimeView]);

  const navigateToPreviousMonth = () => {
    const currentMonth = calendarView.getMonth();
    const currentYear = calendarView.getFullYear();
    const newDate = new Date(currentYear, currentMonth - 1, 1);

    if (minDate) {
      const minBoundary = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        1
      );
      minBoundary.setHours(0, 0, 0, 0);
      // Allow navigation to the minDate's month even if newDate is slightly before minBoundary (e.g., minDate is 15th, newDate is 1st)
      if (
        newDate.getFullYear() < minBoundary.getFullYear() ||
        (newDate.getFullYear() === minBoundary.getFullYear() &&
          newDate.getMonth() < minBoundary.getMonth())
      ) {
        return;
      }
    }
    setCalendarView(newDate);
  };

  const navigateToNextMonth = () => {
    const currentMonth = calendarView.getMonth();
    const currentYear = calendarView.getFullYear();
    const newDate = new Date(currentYear, currentMonth + 1, 1);

    if (maxDate) {
      const maxBoundary = new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        1
      );
      maxBoundary.setHours(0, 0, 0, 0);
      // Allow navigation to the maxDate's month
      if (
        newDate.getFullYear() > maxBoundary.getFullYear() ||
        (newDate.getFullYear() === maxBoundary.getFullYear() &&
          newDate.getMonth() > maxBoundary.getMonth())
      ) {
        return;
      }
    }
    setCalendarView(newDate);
  };

  return (
    <div className="relative w-full" ref={datePickerRef}>
      <div className="relative w-full">
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5 pointer-events-none" />

        <Input
          value={
            dateValue ? formatDateToString(dateValue, showTime, timeFormat) : ""
          }
          placeholder={placeholder || "Select date"}
          readOnly
          onClick={disabled ? undefined : toggleCalendar}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              toggleCalendar();
            }
          }}
          disabled={disabled}
          className="w-full pl-10 pr-4 py-6 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer"
          aria-haspopup="dialog"
          aria-expanded={showCalendar}
        />
      </div>
      {showCalendar && !disabled && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Date picker dialog"
          className={`absolute z-50 bg-white dark:bg-black  dark:text-gray-300  shadow-lg border rounded p-4 mt-2 w-full min-w-[20rem] sm:w-80 ${
            showBelow
              ? "top-full"
              : openUpward
              ? "bottom-full mb-2"
              : "top-full"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={navigateToPreviousMonth}
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Previous month"
            >
              <ArrowLeftIcon fontSize={24} />
            </button>
            <span className="font-medium text-center">
              {calendarView.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={navigateToNextMonth}
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Next month"
            >
              <ArrowRightIcon fontSize={24} />
            </button>
          </div>
          {renderCalendar()}

          {showTime && (
            <div className="mt-4 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowCalendar(false)} // OK button just closes the picker
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                OK
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
