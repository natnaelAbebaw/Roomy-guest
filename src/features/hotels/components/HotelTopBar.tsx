import styled, { css } from "styled-components";
import HotelsFilters from "./hotelTags";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";

import { PiSortAscendingThin } from "react-icons/pi";

import DropDown from "../../../ui/DropDown";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Model from "../../../ui/Modal";
import Filter from "./Filter/Filter";
import { useSearchParams } from "react-router-dom";
type HotelsTopFiltersProps = {
  issticky: string | undefined;
};

const StyledHotelsTopFilters = styled.div<HotelsTopFiltersProps>`
  padding: 0 10rem;
  width: 100%;
  ${(props) =>
    props.issticky
      ? css`
          position: fixed;
          top: 10rem;
        `
      : css`
          position: absolute;
          /* top: 50%; */
        `}
  border-top: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.02);
  z-index: 2;
  background-color: var(--color-grey-0);
`;

const StyledButton = styled.button`
  display: flex;
  padding: 1rem 1.6rem;
  background: none;
  border-radius: 5px;
  border: 1px solid var(--color-grey-300);
  color: var(--color-grey-600);
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
  color: var(--color-grey-600);
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  border-radius: 5px;
`;

const dropDownList = [
  {
    label: "No sort",
    value: "none",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Rating average",
    value: "-ratingAverage",
  },
];

function HotelsTopFilters() {
  const { isSticky } = useSelector((state: RootState) => state.hotels);
  const [searchParams, setSearchParms] = useSearchParams();
  const [selected, setSelected] = useState<{
    label: string;
    value: string | number;
  }>(dropDownList[0]);

  useEffect(() => {
    if (selected.value === "none") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", selected.value.toString());
    }
    setSearchParms(searchParams);
  }, [searchParams, selected.value, setSearchParms]);

  return (
    <StyledHotelsTopFilters issticky={isSticky ? `${isSticky}` : undefined}>
      <HotelsFilters />
      <RightButtons>
        <Model>
          <Model.Open open="filter">
            <StyledButton>
              <CiFilter fontSize={"24px"} />
              Filter
            </StyledButton>
          </Model.Open>
          <Model.Window name="filter">
            <Filter />
          </Model.Window>
        </Model>

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
