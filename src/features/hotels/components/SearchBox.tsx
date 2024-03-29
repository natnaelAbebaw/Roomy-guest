import styled, { css } from "styled-components";
import TopSearchGroup from "./TopSearchGroup";
import SearchForm from "./SearchForms";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
type SearchProps = {
  isSticky: boolean;
};
const StyleSearch = styled.div<SearchProps>`
  background-color: var(--color-grey-0);
  transition: all 0.3s;
  ${(props) =>
    props.isSticky
      ? css`
          position: fixed;
          top: 10rem;
          width: min(80rem, 100%);
          z-index: 10;
        `
      : css`
          position: absolute;
          width: min(100rem, 100%);
          z-index: 0;
        `}
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  /* z-index: 10; */
`;

function Search() {
  const { isSticky } = useSelector((state: RootState) => state.hotels);
  return (
    <StyleSearch isSticky={isSticky}>
      <TopSearchGroup />
      <SearchForm />
    </StyleSearch>
  );
}

export default Search;
