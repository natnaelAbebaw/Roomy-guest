import styled, { css } from "styled-components";
import HotelsFilters from "./hotelTags";
import { useEffect, useState } from "react";
import Model from "../../../ui/Modal";
import Filter from "./Filter/Filter";
import { useSearchParams } from "react-router-dom";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../../../context/GlobalContext";
import { Length } from "../../../ui/Container";
import { IoOptionsOutline } from "react-icons/io5";
import { Font } from "../../../ui/cssConstants";
import Text, { FontWeight } from "../../../ui/Text";
type HotelsTopFiltersProps = {
  searchFormState: SearchFormActionType | undefined;
};

const StyledHotelsTopFilters = styled.div<HotelsTopFiltersProps>`
  padding: 1rem 10rem;
  width: 100%;
  ${(props) =>
    props.searchFormState === SearchFormActionType.stickyOnTop
      ? css`
          position: fixed;
          top: 9rem;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
          padding: 0 10rem;
        `
      : css`
          position: absolute;
        `}
  display: flex;
  border-top: 1.4px solid var(--color-grey-100);
  align-items: center;
  justify-content: space-between;
  z-index: 4;
  background-color: var(--color-grey-0);
`;

const StyledButton = styled.button`
  display: flex;
  padding: 1rem 1.6rem;
  background: none;
  border-radius: 12px;
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
  const { searchFormState } = useGlobalContext();
  const [searchParams, setSearchParms] = useSearchParams();
  const [selected] = useState<{
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
    <StyledHotelsTopFilters searchFormState={searchFormState}>
      <HotelsFilters />
      <RightButtons>
        <Model>
          <Model.Open open="filter">
            <StyledButton>
              <IoOptionsOutline fontSize={Font.fs24} />
              <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
                {" "}
                Filter
              </Text>
            </StyledButton>
          </Model.Open>
          <Model.Window maxHeight={Length.L68} name="filter">
            <Filter />
          </Model.Window>
        </Model>

        {/* <DropDownBox>
          <PiSortAscendingThin fontSize={"24px"} />
          <span>SortBy:</span>
          <DropDown
            dropDownList={dropDownList}
            selected={selected}
            onSelected={setSelected}
          />
        </DropDownBox> */}
      </RightButtons>
    </StyledHotelsTopFilters>
  );
}

export default HotelsTopFilters;
