import styled, { css } from "styled-components";
// import TopSearchGroup from "./TopSearchGroup";
import SearchForm from "./SearchForms";
import { useEffect, useState } from "react";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../../../context/GlobalContext";
import { createPortal } from "react-dom";

type SearchProps = {
  searchFormState: SearchFormActionType | undefined;
  width?: number;
  fixed?: string;
};
const StyleSearch = styled.div<SearchProps>`
  z-index: 10;
  transition: width 0.25s ease-in-out;
  margin-top: 8rem;
  margin-inline: auto;
  /* width: 60%; */
  margin-bottom: 2rem;
  ${(props) =>
    props.searchFormState === SearchFormActionType.stickyOnTop
      ? css<SearchProps>`
          position: ${({ fixed }) => (fixed ? "fixed" : `relative`)};
          top: 4rem;
          margin-top: 0;
          width: ${({ width }) => (width ? `${width}px` : "40rem")};
          transform: translate(-50%, -50%);
          left: 50%;
          ${({ fixed }) =>
            !fixed &&
            css`
              margin-top: -7rem;
              transform: translate(0);
              left: 0;
              top: 0;
            `}
        `
      : props.searchFormState === SearchFormActionType.hangOnTop
      ? css<SearchProps>`
          position: ${({ fixed }) => (fixed ? "fixed" : `relative`)};
          top: 2rem;
          width: 60%;
          transform: translate(-50%, -50%);
          left: 50%;
          ${({ fixed }) =>
            !fixed &&
            css`
              margin-top: -12rem;
              transform: translate(0);
              left: 0;
              top: 0;
            `}
        `
      : css`
          position: static;
          border-radius: 1rem;
          width: min(90rem, 100%);
        `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 102vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 2;
`;

function SearchBox({
  fixed = true,
  defaultState = SearchFormActionType.normal,
}: {
  fixed?: boolean;
  defaultState?: SearchFormActionType;
}) {
  const { searchFormState, dispatch } = useGlobalContext();
  const [width, setWidth] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  useEffect(() => {
    dispatch?.(defaultState);
  }, [defaultState, dispatch]);

  useEffect(() => {
    setCurrentScroll(window.scrollY);
  }, [searchFormState]);

  useEffect(() => {
    function removeOverlay() {
      if (
        searchFormState === SearchFormActionType.hangOnTop &&
        Math.abs(currentScroll - window.scrollY) > 50
      ) {
        dispatch?.(SearchFormActionType.stickyOnTop);
      }
    }

    window.addEventListener("scroll", removeOverlay);
    return () => {
      window.removeEventListener("scroll", removeOverlay);
    };
  }, [currentScroll, dispatch, searchFormState]);

  return (
    <StyleSearch
      width={width}
      fixed={fixed ? `fixed` : undefined}
      searchFormState={searchFormState}
    >
      {searchFormState === SearchFormActionType.hangOnTop &&
        createPortal(
          <Overlay
            onClick={() => dispatch?.(SearchFormActionType.stickyOnTop)}
            onScroll={() => {
              console.log("scroll");
              dispatch?.(SearchFormActionType.stickyOnTop);
            }}
          />,
          document.body
        )}
      <div>
        {/* <TopSearchGroup /> */}
        <SearchForm setWdith={setWidth} />
      </div>
    </StyleSearch>
  );
}

export default SearchBox;
