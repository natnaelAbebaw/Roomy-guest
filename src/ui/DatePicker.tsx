import { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "./react_dates_overrides.css";
import moment from "moment";

type MyDatePickerProps = {
  startDate: moment.Moment;
  setStartDate: (date: moment.Moment) => void;
  endDate: moment.Moment;
  setEndDate: (date: moment.Moment) => void;
};

type DateFormat = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
};
function MyDatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: MyDatePickerProps) {
  const [focusedInput, setFocussedInput] = useState<FocusedInputShape | null>(
    null
  );

  const handleDatesChange = ({ startDate, endDate }: DateFormat) => {
    setStartDate(startDate!);
    setEndDate(endDate!);
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="your_unique_start_date_id"
      endDate={endDate}
      endDateId="your_unique_end_date_id"
      onDatesChange={({ startDate, endDate }) =>
        handleDatesChange({ startDate, endDate })
      }
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => setFocussedInput(focusedInput)}
      noBorder={true}
    />
  );
}

export default MyDatePicker;
