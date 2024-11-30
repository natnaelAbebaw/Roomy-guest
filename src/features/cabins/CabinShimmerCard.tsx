import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../../ui/Flex";
import { Shimmer } from "react-shimmer";
import styled from "styled-components";
import { Spacing } from "../../ui/cssConstants";

type ShimmerProps = {
  height: number;
  width: number;
  mb?: string;
  br?: string;
};

const ShimmerCard = styled.div`
  width: 38rem;
  border: 1px solid var(--color-grey-100);
  border-radius: 1rem;
  overflow: hidden;
  height: 55rem;
`;

const StyledShimmerBox = styled(Shimmer)<ShimmerProps>`
  margin-bottom: ${(props) => props.mb};
  border-radius: ${(props) => props.br};
`;
StyledShimmerBox.defaultProps = {
  mb: "1rem",
  br: "5px",
};

function CabinShimmerCard() {
  return (
    <ShimmerCard>
      <StyledShimmerBox height={200} width={380} mb={"2rem"} />
      <Flex direction={FlexDirection.Column} p={[Spacing.s16, Spacing.s24]}>
        <Flex
          mb={Spacing.s12}
          justify={FlexJustify.SpaceBetween}
          align={FlexAlign.End}
        >
          <Flex direction={FlexDirection.Column} gap={Spacing.s1}>
            <StyledShimmerBox height={30} width={200} />
            <StyledShimmerBox height={20} width={100} />
          </Flex>
          <StyledShimmerBox height={20} width={70} />
        </Flex>

        <StyledShimmerBox height={25} width={140} mb={Spacing.s8} />
        <Flex gap={Spacing.s4} direction={FlexDirection.Column}>
          <Flex justify={FlexJustify.SpaceBetween}>
            <StyledShimmerBox height={20} width={130} />
            <StyledShimmerBox height={20} width={130} />
          </Flex>
          <StyledShimmerBox height={20} width={130} />
        </Flex>

        <Flex gap={Spacing.s48} align={FlexAlign.End}>
          <StyledShimmerBox height={25} width={210} />
          <StyledShimmerBox height={50} width={210} />
        </Flex>
      </Flex>
    </ShimmerCard>
  );
}

export default CabinShimmerCard;
