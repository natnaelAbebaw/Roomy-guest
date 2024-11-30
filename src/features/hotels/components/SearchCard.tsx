import { useEffect, useState } from "react";
import MyDatePicker from "../../../ui/DatePicker";

import styled from "styled-components";
import GuestPicker from "../../../ui/GuestPicker";
import Button from "../../../ui/Button";
import { Color, Font } from "../../../ui/cssConstants";
import Heading, { HeadingElement } from "../../../ui/Heading";
import { useSearchParams } from "react-router-dom";
import { QueryParams } from "./queryParams";
import moment from "moment";

const StyledSearchCard = styled.div`
  width: 36rem;
  margin: 0 0 0 auto;
  border: 1px solid var(--color-grey-300);
  padding: 4rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 12rem;
`;

const DatePickerBox = styled.div`
  position: relative;
  background-color: var(--color-grey-300);
  & .DateInput {
    width: 100% !important;
  }

  & .DateInput_input {
    border: 1px solid var(--color-grey-300);
    padding: 3rem 2rem 1rem;
  }

  & .DateInput_input[name="startDate"] {
    border: 1px solid var(--color-grey-300);
    border-radius: 5px 0 0 0;
  }

  & .DateInput_input[name="endDate"] {
    border: 1px solid var(--color-grey-300);
    border-radius: 0 5px 0 0;
  }

  & .DateRangePickerInput_arrow_svg {
    display: none;
  }

  & > label {
    position: absolute;
    font-size: 1.2rem;
    font-weight: 500;
    display: block;
    text-transform: uppercase;
    &:first-of-type {
      top: 15%;
      left: 7%;
    }
    &:last-of-type {
      top: 15%;
      left: 57%;
    }
  }
`;

const GuestPickerBox = styled.div`
  position: relative;
  margin-bottom: 4rem;
  & input {
    padding: 3rem 2rem 1rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 0 0 5px 5px;
  }

  & .down {
    top: 65%;
  }

  & label {
    font-size: 1.2rem;
    text-transform: uppercase;
    position: absolute;
    font-weight: 500;
    top: 15%;
    left: 7%;
    z-index: 1;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 1.5rem 0;

  font-weight: 600;
  color: ${Color.grey0};
  background-image: linear-gradient(
    to right,
    var(--color-brand-900),
    var(--color-brand-500)
  );
`;

function SearchCard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(
    searchParams.has(QueryParams.checkinDate)
      ? moment(searchParams.get(QueryParams.checkinDate))
      : moment()
  );
  const [endDate, setEndDate] = useState(
    searchParams.has(QueryParams.checkinDate)
      ? moment(searchParams.get(QueryParams.checkoutDate))
      : moment().add(2, "day")
  );
  const [numOfGuests, setNumOfGuests] = useState(
    Number(searchParams.get(QueryParams.numGuests)) || 1
  );

  useEffect(() => {
    if (searchParams.has(QueryParams.checkoutDate))
      setEndDate(moment(searchParams.get(QueryParams.checkoutDate)));
    if (searchParams.has(QueryParams.checkinDate))
      setStartDate(moment(searchParams.get(QueryParams.checkinDate)));
    if (searchParams.has(QueryParams.numGuests))
      setNumOfGuests(Number(searchParams.get(QueryParams.numGuests)));
  }, [searchParams, setSearchParams]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const Roomdev = document.getElementById("rooms");
    Roomdev?.scrollIntoView({ behavior: "smooth" });
    searchParams.set(QueryParams.checkinDate, startDate.format("YYYY-MM-DD"));
    searchParams.set(QueryParams.checkoutDate, endDate.format("YYYY-MM-DD"));
    searchParams.set(QueryParams.numGuests, numOfGuests.toString());
    setSearchParams(searchParams);
  }

  return (
    <StyledSearchCard>
      <form action="" onSubmit={onSubmit}>
        <Heading fs={Font.fs24} as={HeadingElement.H2}>
          Tweak Your Date
        </Heading>
        <DatePickerBox>
          <div className="side-Date-picker">
            <MyDatePicker
              setEndDate={setEndDate}
              endDate={endDate}
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </div>
          <label htmlFor="date-range-picker">check-in</label>
          <label htmlFor="date-range-picker">check-out</label>
        </DatePickerBox>
        <GuestPickerBox>
          <label htmlFor="guest-picker">Guests</label>
          <GuestPicker
            numOfGuests={numOfGuests}
            onChangeNumOfGuests={setNumOfGuests}
            setOnFocus={() => {}}
          />
        </GuestPickerBox>
        <StyledButton>See Rooms</StyledButton>
      </form>
    </StyledSearchCard>
  );
}

export default SearchCard;
