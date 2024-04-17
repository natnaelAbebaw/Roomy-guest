import { IoStarSharp } from "react-icons/io5";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../../ui/Flex";
import Heading, { HeadingElement } from "../../ui/Heading";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import { IoMdCheckmark } from "react-icons/io";
import Button, { ButtonType } from "../../ui/Button";
import { FaAngleRight } from "react-icons/fa";
import Image from "../../ui/Image";

import styled from "styled-components";
import Grid from "../../ui/Grid";
import CheckBox from "../../ui/CheckBox";

const ImageBox = styled.div`
  width: 100%;
  height: 20rem;
`;

const StyledCabinCard = styled.div`
  width: 38rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  overflow: hidden;
`;

const CabinDetails = styled.div`
  padding: ${Spacing.s24};
`;

function CabinCard() {
  return (
    <StyledCabinCard>
      <ImageBox>
        <Image src="https://via.placeholder.com/150" alt="cabin" />
      </ImageBox>
      <CabinDetails>
        <Flex
          justify={FlexJustify.SpaceBetween}
          align={FlexAlign.End}
          mb={Spacing.s24}
        >
          <Flex direction={FlexDirection.Column} gap={Spacing.s1}>
            <Heading fs={Font.fs20} as={HeadingElement.H3} mb={Spacing.s1}>
              King Bed cabin
            </Heading>
            <Flex align={FlexAlign.Center}>
              <IoStarSharp />
              <span>4.6 Rating</span>
            </Flex>
          </Flex>
          <span>2 Rooms available</span>
        </Flex>

        <div>
          <Heading>Amenities</Heading>
          <Grid
            columns={"repeat(auto-fit, minmax(12rem, 1fr))"}
            RowGap={Spacing.s8}
          >
            <Flex align={FlexAlign.Center}>
              <IoMdCheckmark /> <span>Free wifi</span>
            </Flex>
            <Flex align={FlexAlign.Center}>
              <IoMdCheckmark /> <span>Free parking</span>
            </Flex>
            <Flex align={FlexAlign.Center}>
              <IoMdCheckmark />
              <span>Swimming pool</span>
            </Flex>
          </Grid>
          <Button type={ButtonType.Normal} mb={Spacing.s24}>
            <Flex align={FlexAlign.Center}>
              <span>See More </span>
              <FaAngleRight />
            </Flex>
          </Button>
        </div>

        <Flex align={FlexAlign.End} justify={FlexJustify.SpaceBetween}>
          <Flex gap={Spacing.s1} direction={FlexDirection.Column}>
            <CheckBox>
              <label htmlFor="Breakfast">
                <input type="checkbox" id="Breakfast" />
                <span></span>
                <div>Breakfast</div>
              </label>
            </CheckBox>
            <Flex>
              <span>$282 night</span>
              <span>•</span>
              <span>$480 total</span>
            </Flex>
          </Flex>
          <Button color={Color.grey0}>Reserve</Button>
        </Flex>
      </CabinDetails>
    </StyledCabinCard>
  );
}

export default CabinCard;
