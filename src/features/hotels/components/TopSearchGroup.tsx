import { IoIosBed } from "react-icons/io";
import { MdFlight, MdLocalTaxi } from "react-icons/md";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState } from "../../../store";

type SearchGroupProps = {
  isSticky: boolean;
};

const SearchGroup = styled.div<SearchGroupProps>`
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-300);
  ${(props) =>
    props.isSticky
      ? css`
          display: none;
        `
      : css`
          display: flex;
        `}
`;

const StyledUl = styled.ul`
  width: min(50rem, 100%);
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  & li {
    display: flex;
    padding: 2rem;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1.8rem;
    color: var(--color-grey-700);
    height: 100%;
    position: relative;
  }
  & li:nth-child(2),
  li:nth-child(3) {
    display: none;
  }
  & li:nth-child(1)::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 4px;
    border-radius: 1.5px;
    background-color: var(--color-brand-700);
    bottom: 0;
  }
`;

function TopSearchGroup() {
  const { isSticky } = useSelector((state: RootState) => state.hotels);

  return (
    <SearchGroup isSticky={isSticky}>
      <StyledUl>
        <li>
          <IoIosBed />
          <span>Hotels</span>
        </li>

        <li>
          <MdFlight />
          <span>Flights</span>
        </li>

        <li>
          <MdLocalTaxi />
          <span>Airport taxi</span>
        </li>
      </StyledUl>
    </SearchGroup>
  );
}

export default TopSearchGroup;
