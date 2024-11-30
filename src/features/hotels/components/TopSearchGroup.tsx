import { IoIosBed } from "react-icons/io";
import { MdFlight, MdLocalTaxi } from "react-icons/md";

import styled, { css } from "styled-components";

import {
  SearchFormActionType,
  useGlobalContext,
} from "../../../context/GlobalContext";
import Flex, { FlexAlign, FlexJustify } from "../../../ui/Flex";
import Text from "../../../ui/Text";
import Container, { Length } from "../../../ui/Container";
import { Color, Font, Spacing } from "../../../ui/cssConstants";

type SearchGroupProps = {
  searchFormState: SearchFormActionType;
};

const SearchGroup = styled.div<SearchGroupProps>`
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.searchFormState === SearchFormActionType.stickyOnTop
      ? css`
          display: none;
        `
      : css`
          display: flex;
        `}
  ${({ searchFormState }) =>
    searchFormState === SearchFormActionType.normal &&
    css`
      border-bottom: 1px solid var(--color-grey-300);
    `}
  & li {
    border-bottom: 2px solid ${Color.brand700};
    list-style: none;
  }
  & li:not(:first-child) {
    visibility: hidden;
  }
`;

function TopSearchGroup() {
  const { searchFormState } = useGlobalContext();
  return (
    <SearchGroup searchFormState={searchFormState}>
      <Flex
        align={FlexAlign.Center}
        justify={FlexJustify.Center}
        gap={Spacing.s48}
        width={Length.Full}
      >
        <Container as={"li"} padding={[Spacing.s24, Spacing.s8]}>
          <Flex align={FlexAlign.Center}>
            <IoIosBed color={Color.grey600} fontSize={Font.fs20} />
            <Text fontSize={Font.fs18}>Hotels</Text>
          </Flex>
        </Container>

        <Container as={"li"} padding={[Spacing.s24, Spacing.s8]}>
          <Flex align={FlexAlign.Center}>
            <MdFlight color={Color.grey600} fontSize={Font.fs20} />
            <Text fontSize={Font.fs18}>Flights</Text>
          </Flex>
        </Container>

        <Container as={"li"} padding={[Spacing.s24, Spacing.s8]}>
          <Flex align={FlexAlign.Center}>
            <MdLocalTaxi color={Color.grey600} fontSize={Font.fs20} />
            <Text fontSize={Font.fs18}>Airport taxi</Text>
          </Flex>
        </Container>
      </Flex>
    </SearchGroup>
  );
}

export default TopSearchGroup;
