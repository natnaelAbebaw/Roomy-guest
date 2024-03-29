import styled, { css } from "styled-components";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import SearchLocation from "./SearchLocation";
import PopupBox from "../../../ui/PopupBox";
import GuestPicker from "../../../ui/GuestPicker";
import Button from "../../../ui/Button";
import CustomDatePicker from "../../../ui/DatePicker";
import Input from "../../../ui/Input";
import { useClickOutside } from "../CustomHooks/useClickOutside";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type SearchFormProps = {
  isSticky: boolean;
};

const StyledForm = styled.form<SearchFormProps>`
  display: flex;
  width: min(100rem, 100%);
  margin: 0 auto;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  ${(props) =>
    props.isSticky
      ? css`
          padding: 1.4rem 2rem;
          & label {
            font-size: 1.6rem;
            margin-bottom: 0;
          }

          & input,
          & input::placeholder {
            font-size: 1.4rem;
            padding: 5px 0;
          }

          & .DateInput {
            width: 8rem;
          }

          & > button {
            padding: 1.4rem 2rem;
            font-size: 1.6rem;
            font-weight: 400;
          }
        `
      : css`
          padding: 2.4rem;
        `}
`;

const StyledLabel = styled.label`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-grey-700);
  margin-bottom: 1rem;
  display: inline-block;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: fit-content;
  padding: 2.4rem 3.2rem;
`;
const StyledFaAngleDown = styled(FaAngleDown)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

function SearchForm() {
  const [numOfGuests, setNumOfGuests] = useState(1);
  const { isSticky } = useSelector((state: RootState) => state.hotels);
  const {
    clickState: showGuestPicker,
    setClickState: setShowGuestPicker,
    ref,
  } = useClickOutside<HTMLDivElement>();
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    city: "",
    country: "",
  });
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    if (!locationQuery) {
      alert("Please enter a location");
      return;
    }
    if (!selectedLocation.city || !selectedLocation.country) {
      setSelectedLocation({
        city: locationQuery.split(",")[0],
        country: locationQuery.split(",")[1],
      });
    }

    if (!startDate) {
      console.log("startDate", startDate);
      setStartDate(moment());
    }
    if (!endDate) {
      setEndDate(moment().add(2, "day"));
    }

    console.log(startDate?.format("YYYY-MM-DD"), endDate?.format("YYYY-MM-DD"));

    searchParams.set("city", selectedLocation.city);
    searchParams.set("country", selectedLocation.country);
    searchParams.set("checkinDate", startDate!.format("YYYY-MM-DD"));
    searchParams.set("checkoutDate", endDate!.format("YYYY-MM-DD"));
    searchParams.set("numGuests", numOfGuests.toString());

    setSearchParams(searchParams);
  }

  return (
    <StyledForm isSticky={isSticky} action="" onSubmit={onSubmit}>
      <InputBox>
        <StyledLabel htmlFor="Locations">Locations</StyledLabel>
        <SearchLocation
          setSelectedLocation={setSelectedLocation}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          selectedLocation={selectedLocation}
        />
      </InputBox>
      <InputBox>
        <StyledLabel htmlFor="Checkin-checkout">
          Check in - check out
        </StyledLabel>
        <CustomDatePicker
          startDate={startDate!}
          setStartDate={setStartDate}
          endDate={endDate!}
          setEndDate={setEndDate}
        />
      </InputBox>
      <InputBox>
        <StyledLabel htmlFor="Guests"> Guests</StyledLabel>
        <input type="hidden" id="Guests" placeholder="1 room, 2 adults" />
        <InputBox>
          <Input
            type="text"
            value={`${numOfGuests} Guests`}
            readOnly
            onClick={() => setShowGuestPicker(true)}
            onFocus={() => setShowGuestPicker(true)}
          />
          <StyledFaAngleDown />
        </InputBox>
        {showGuestPicker && (
          <PopupBox ref={ref}>
            <GuestPicker
              onChangeNumOfGuests={setNumOfGuests}
              numOfGuests={numOfGuests}
            />
          </PopupBox>
        )}
      </InputBox>
      <StyledButton>
        <FaSearch />
        <span>Search</span>
      </StyledButton>
    </StyledForm>
  );
}

export default SearchForm;
