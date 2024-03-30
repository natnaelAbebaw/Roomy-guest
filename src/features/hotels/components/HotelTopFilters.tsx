import styled, { css } from "styled-components";
import HotelsFilters from "./HotelsFilters";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";

import { PiSortAscendingThin } from "react-icons/pi";

import DropDown from "../../../ui/DropDown";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
type HotelsTopFiltersProps = {
  isSticky: boolean;
};

const StyledHotelsTopFilters = styled.div<HotelsTopFiltersProps>`
  padding: 1.6rem 10rem;
  width: 100%;
  ${(props) =>
    props.isSticky
      ? css`
          position: fixed;
          top: 16rem;
        `
      : css`
          position: absolute;
          /* top: 50%; */
        `}
  border-top: 1px solid var(--color-grey-300);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.02);
  z-index: 2;
  background-color: var(--color-grey-0);
`;

const StyledButton = styled.button`
  display: flex;
  padding: 1rem 2rem;
  background: none;
  border-radius: 5px;
  border: 1px solid var(--color-grey-300);
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const DropDownBox = styled.div`
  border: 1px solid var(--color-grey-300);
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  border-radius: 5px;
`;

const dropDownList = [
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Rating",
    value: "rating",
  },
];

function HotelsTopFilters() {
  const { isSticky } = useSelector((state: RootState) => state.hotels);
  const [selected, setSelected] = useState<{
    label: string;
    value: string | number;
  }>(dropDownList[0]);
  return (
    <StyledHotelsTopFilters isSticky={isSticky}>
      <HotelsFilters />
      <RightButtons>
        <StyledButton>
          <CiFilter fontSize={"24px"} />
          Filter
        </StyledButton>
        <DropDownBox>
          <PiSortAscendingThin fontSize={"24px"} />
          <span>SortBy:</span>
          <DropDown
            dropDownList={dropDownList}
            selected={selected}
            onSelected={setSelected}
          />
        </DropDownBox>
      </RightButtons>
    </StyledHotelsTopFilters>
  );
}

export default HotelsTopFilters;
