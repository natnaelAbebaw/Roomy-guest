import { Shimmer } from "react-shimmer";
import styled from "styled-components";

const StyledHotelShimmerEffect = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  column-gap: 2rem;
  row-gap: 4rem;
  padding: 3rem 10rem;
`;

function HotelShimmerEffect() {
  return (
    <StyledHotelShimmerEffect>
      {new Array(12).fill(12).map((_, index) => (
        <HotelShimmer key={index} />
      ))}
    </StyledHotelShimmerEffect>
  );
}

export default HotelShimmerEffect;

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
  mb: "1rem",
  br: "5px",
};

const FlexDiv = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

function HotelShimmer() {
  return (
    <div>
      <StyledShimmerBox height={250} width={300} mb={"2rem"} />
      <FlexDiv>
        <StyledShimmerBox height={30} width={200} mb="2rem" />
        <StyledShimmerBox height={30} width={30} />
      </FlexDiv>
      <StyledShimmerBox height={20} width={230} mb="1rem" />
      <StyledShimmerBox height={20} width={210} />
    </div>
  );
}
