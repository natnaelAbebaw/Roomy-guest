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
import { Cabin } from "../../services/hotelApi";
import { useSearchParams } from "react-router-dom";
import { QueryParams } from "../hotels/components/queryParams";
import moment from "moment";
import { useEffect, useState } from "react";
import Popup from "../../ui/Popup";
import BorderBottom from "../../ui/BorderBottom";
import Text, { FontWeight } from "../../ui/Text";
import Container, { Length } from "../../ui/Container";

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
  cabin: Cabin;
  breakfastPrice: number | undefined;
}) {
  const [searchParams] = useSearchParams();
  const [numberOfNight, setNumberOfNight] = useState(
    searchParams.has(QueryParams.checkoutDate) &&
      searchParams.has(QueryParams.checkinDate)
      ? moment(searchParams.get(QueryParams.checkoutDate)).diff(
          moment(searchParams.get(QueryParams.checkinDate)),
          "days"
        )
      : 2
  );
  const [breakFast, setBreakfast] = useState<boolean>(false);
  useEffect(() => {
    if (
      searchParams.has(QueryParams.checkoutDate) &&
      searchParams.has(QueryParams.checkinDate)
    ) {
      setNumberOfNight(
        moment(searchParams.get(QueryParams.checkoutDate)).diff(
          moment(searchParams.get(QueryParams.checkinDate)),
          "days"
        )
      );
    }
  }, [searchParams]);

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
          <Button type={ButtonType.Normal} mb={Spacing.s16}>
            <Flex align={FlexAlign.Center}>
              <span>See More </span>
              <FaAngleRight />
            </Flex>
          </Button>
        </Container>

        <Flex align={FlexAlign.End} justify={FlexJustify.SpaceBetween}>
          <Flex gap={Spacing.s4} direction={FlexDirection.Column}>
            <CheckBox>
              <label htmlFor={cabin.cabinType}>
                <input
                  checked={breakFast}
                  onChange={(e) => {
                    setBreakfast(e.target.checked);
                  }}
                  type="checkbox"
                  id={cabin.cabinType}
                />
                <span></span>
                <div>Breakfast</div>
              </label>
            </CheckBox>
            <Flex gap={Spacing.s4}>
              <Popup portal={false}>
                <Popup.Open>
                  <Flex align={FlexAlign.Center}>
                    <span>${cabin.regularPrice.toFixed(0)} Night</span>
                    <Text fontSize={Font.fs10}>&bull;</Text>$
                    {(
                      cabin.regularPrice * numberOfNight +
                      (breakFast ? breakfastPrice! : 0)
                    ).toFixed(0)}{" "}
                    Total
                  </Flex>
                </Popup.Open>
                <Popup.Window>
                  <Flex gap={Spacing.s4} direction={FlexDirection.Column}>
                    <Heading
                      fs={Font.fs16}
                      mb={Spacing.zero}
                      as={HeadingElement.H4}
                    >
                      Price details
                    </Heading>
                    <BorderBottom m={Spacing.s12} />
                    <Flex direction={FlexDirection.Column} gap={Spacing.s8}>
                      {new Array(numberOfNight).fill(0).map((_, i) => (
                        <Flex
                          key={i}
                          justify={FlexJustify.SpaceBetween}
                          gap={Spacing.s64}
                          width={Length.Full}
                        >
                          <span>
                            {searchParams.has(QueryParams.checkoutDate) &&
                              moment(searchParams.get(QueryParams.checkoutDate))
                                .add(i, "days")
                                .format("YYYY-MM-DD")}
                          </span>
                          <span>${cabin.regularPrice.toFixed(0)}</span>
                        </Flex>
                      ))}
                      {breakFast && (
                        <Flex
                          justify={FlexJustify.SpaceBetween}
                          gap={Spacing.s64}
                          width={Length.Full}
                        >
                          <span>Breakfast</span> <span>${breakfastPrice}</span>
                        </Flex>
                      )}
                    </Flex>
                    <BorderBottom m={Spacing.s12} />
                    <Flex
                      width={Length.Full}
                      justify={FlexJustify.SpaceBetween}
                      gap={Spacing.s64}
                    >
                      <span>Total</span>
                      <span>
                        $
                        {(
                          cabin.regularPrice * numberOfNight +
                          (breakFast ? breakfastPrice! : 0)
                        ).toFixed(0)}
                      </span>
                    </Flex>
                  </Flex>
                </Popup.Window>
              </Popup>
            </Flex>
          </Flex>
          <Button padding={[Spacing.s8, Spacing.s12]} color={Color.grey0}>
            Reserve
          </Button>
        </Flex>
      </Container>
    </StyledCabinCard>
  );
}

export default CabinCard;
