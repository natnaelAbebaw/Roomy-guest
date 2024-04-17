import styled, { css } from "styled-components";
import FilterBox from "../../../../ui/FilterBox";

const RoomType = [
  "Any type",
  "Single Bed",
  "Double Bed",
  "Twin Bed",
  "Triple Bed",
  "Quad Bed",
  "Queen Bed",
  "King Bed",
  "Suite",
  "Studio",
];

const StyledRoomTypes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 1rem;
  /* padding: 1rem; */
`;

type StyledButtonProps = {
  active: string | undefined;
};
const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--color-grey-100);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-brand-700);
    color: var(--color-grey-0);
  }
  &:active {
    background-color: var(--color-brand-700);
    color: var(--color-grey-0);
  }
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-700);
      color: var(--color-grey-0);
    `}
`;

type RoomTypeFilterProps = {
  selectedRoomType: string;
  setSelectedRoomType: (roomType: string) => void;
};

function RoomTypeFilter({
  selectedRoomType,
  setSelectedRoomType,
}: RoomTypeFilterProps) {
  return (
    <FilterBox>
      <h2>Room Type</h2>
      <p>Search rooms for single bed, or any types of room</p>
      <StyledRoomTypes>
        {RoomType.map((type) => (
          <div key={type}>
            <StyledButton
              active={
                selectedRoomType === type ? `${selectedRoomType}` : undefined
              }
              onClick={() => setSelectedRoomType(type)}
            >
              {type}
            </StyledButton>
          </div>
        ))}
      </StyledRoomTypes>
    </FilterBox>
  );
}

export default RoomTypeFilter;
