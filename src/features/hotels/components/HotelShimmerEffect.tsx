import { Shimmer } from "react-shimmer";
import styled from "styled-components";
import Flex, { FlexJustify } from "../../../ui/Flex";
import Container, { Length } from "../../../ui/Container";
import { Spacing } from "../../../ui/cssConstants";

type ShimmerProps = {
  height: number;
  width: number;
  mb?: string;
  br?: string;
};

const StyledShimmerBox = styled(Shimmer)<ShimmerProps>`
  margin-bottom: ${(props) => props.mb};
  border-radius: ${(props) => props.br};
`;
StyledShimmerBox.defaultProps = {
  mb: Spacing.s4,
  br: "5px",
};

function HotelShimmer() {
  return (
    <Container maxWidth={Length.L30}>
      <StyledShimmerBox height={270} width={300} mb={Spacing.s24} />
      <Flex justify={FlexJustify.SpaceBetween}>
        <StyledShimmerBox height={22} width={180} />
        <StyledShimmerBox height={22} width={50} />
      </Flex>
      <StyledShimmerBox height={22} width={150} />
      <StyledShimmerBox height={22} width={100} />
    </Container>
  );
}
export default HotelShimmer;
