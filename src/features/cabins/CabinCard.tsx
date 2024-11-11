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

import Text, { FontWeight } from "../../ui/Text";
import Container, { Length } from "../../ui/Container";
import Modal from "../../ui/Modal";
import CabinDetails from "./CabinDetails";
import Price from "./Price";
import { CabinStat } from "../../services/hotelApi";

const ImageBox = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
`;

const StyledCabinCard = styled.div`
  width: 38rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
`;

function CabinCard({
  cabin,
  breakfastPrice,
}: {
  cabin: CabinStat;
  breakfastPrice: number | undefined;
}) {
  return (
    <StyledCabinCard>
      <ImageBox>
        <Image src={cabin.images[0]} alt="cabin image" />
      </ImageBox>
      <Container padding={[Spacing.s16, Spacing.s24]}>
        <Flex
          justify={FlexJustify.SpaceBetween}
          align={FlexAlign.Center}
          mb={Spacing.s16}
        >
          <Flex direction={FlexDirection.Column} gap={Spacing.s1}>
            <Heading fs={Font.fs18} as={HeadingElement.H3} mb={Spacing.s1}>
              {cabin.cabinType}
            </Heading>
            <Flex align={FlexAlign.Center} gap={Spacing.s8}>
              <IoStarSharp color={Color.grey500} />
              <Text color={Color.grey600} fontSize={Font.fs14}>
                4.6 Rating
              </Text>
            </Flex>
          </Flex>
          <Flex align={FlexAlign.Center} justify={FlexJustify.End}>
            <Text color={Color.grey600} fontSize={Font.fs14}>
              {cabin.numCabinsAvailable} Available
            </Text>
          </Flex>
        </Flex>

        <Container>
          <Heading
            fontWeight={FontWeight.Medium}
            fs={Font.fs16}
            mb={Spacing.s8}
          >
            Amenities
          </Heading>
          <Grid
            columns={"repeat(auto-fit, minmax(12rem, 1fr))"}
            RowGap={Spacing.s8}
          >
            {new Array(3).fill(0).map((_, i) => (
              <Flex key={i} align={FlexAlign.Center}>
                <IoMdCheckmark color={Color.grey600} />{" "}
                <Text color={Color.grey600} fontSize={Font.fs14}>
                  {cabin.amenities[i]}
                </Text>
              </Flex>
            ))}
          </Grid>
          <Modal>
            <Modal.Open open="cabinDetails">
              <Button buttonType={ButtonType.Normal} mb={Spacing.s16}>
                <Flex align={FlexAlign.Center}>
                  <span>See More </span>
                  <FaAngleRight />
                </Flex>
              </Button>
            </Modal.Open>
            <Modal.Window
              name="cabinDetails"
              maxWdith={Length.L128}
              maxHeight={Length.L72}
              padding={[Spacing.s8, Spacing.s16]}
            >
              <CabinDetails
                breakfastPrice={breakfastPrice!}
                cabinId={cabin.availableCabins?.[0]}
              />
            </Modal.Window>
          </Modal>
        </Container>

        <Flex align={FlexAlign.End} justify={FlexJustify.SpaceBetween}>
          <Price cabin={cabin} breakfastPrice={breakfastPrice!} />
          <Button padding={[Spacing.s8, Spacing.s12]} color={Color.grey0}>
            Reserve
          </Button>
        </Flex>
      </Container>
    </StyledCabinCard>
  );
}

export default CabinCard;
