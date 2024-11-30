import { Color, Font, Spacing } from "../../../../ui/cssConstants";

import Container, { Length } from "../../../../ui/Container";
import Flex, {
  FlexAlign,
  FlexDirection,
  FlexJustify,
} from "../../../../ui/Flex";
import Heading from "../../../../ui/Heading";
import Text, { FontWeight } from "../../../../ui/Text";
import Border, { BorderType } from "../../../../ui/Border";
import { HotelReviewStat } from "../../../../services/hotelApi";
import {
  CiBank,
  CiCalendarDate,
  CiLocationOn,
  CiMedal,
  CiMedicalClipboard,
  CiSun,
} from "react-icons/ci";

export enum HotelReviewGroupDirection {
  horizontal = "horizontal",
  vertical = "vertical",
}

function HotelReviewGroup({
  hotelReviewStat,
  direction = HotelReviewGroupDirection.horizontal,
}: {
  hotelReviewStat: HotelReviewStat;
  hotelRatingRanges: { _id: number; count: number }[];
  direction?: HotelReviewGroupDirection;
}) {
  const rates = [
    {
      name: "Cleanliness",
      rate: hotelReviewStat?.rates["comfort and cleanliness"].toFixed(2),
      icon: (
        <CiMedicalClipboard
          color={Color.grey900}
          fontSize={
            direction == HotelReviewGroupDirection.horizontal
              ? Font.fs36
              : Font.fs24
          }
        />
      ),
    },
    {
      name: "Facilities",
      rate: hotelReviewStat?.rates["facilities and aminities"].toFixed(2),
      icon: (
        <CiBank
          color={Color.grey900}
          fontSize={
            direction == HotelReviewGroupDirection.horizontal
              ? Font.fs36
              : Font.fs24
          }
        />
      ),
    },
    {
      name: "Services",
      rate: hotelReviewStat?.rates["services and staff"].toFixed(2),
      icon: (
        <CiSun
          color={Color.grey900}
          fontSize={
            direction == HotelReviewGroupDirection.horizontal
              ? Font.fs36
              : Font.fs24
          }
        />
      ),
    },
    {
      name: "Location",
      rate: hotelReviewStat?.rates.location.toFixed(2),
      icon: (
        <CiLocationOn
          color={Color.grey900}
          fontSize={
            direction == HotelReviewGroupDirection.horizontal
              ? Font.fs36
              : Font.fs24
          }
        />
      ),
    },
    {
      name: "Value",
      rate: hotelReviewStat?.rates["value for Money"].toFixed(2),
      icon: (
        <CiMedal
          color={Color.grey900}
          fontSize={
            direction == HotelReviewGroupDirection.horizontal
              ? Font.fs36
              : Font.fs24
          }
        />
      ),
    },
    {
      name: "Experience",
      rate: hotelReviewStat?.rates["Overall Experience"].toFixed(2),
      icon: (
        <CiCalendarDate
          color={Color.grey900}
          fontSize={
            direction == HotelReviewGroupDirection.horizontal
              ? Font.fs36
              : Font.fs24
          }
        />
      ),
    },
  ];

  return (
    <>
      {direction == HotelReviewGroupDirection.horizontal &&
        rates.map((rate, i) => {
          return (
            <>
              <Container key={i} padding={[Spacing.zero, Spacing.s16]}>
                <Flex gap={Spacing.s2} direction={FlexDirection.Column}>
                  <Heading mb={Spacing.zero} fs={Font.fs14}>
                    {rate.name}
                  </Heading>
                  <Flex
                    direction={FlexDirection.Column}
                    // align={FlexAlign.Center}
                    justify={FlexJustify.SpaceBetween}
                    gap={Spacing.s4}
                  >
                    <Text
                      mB={Spacing.s16}
                      fontSize={Font.fs18}
                      fontWeight={FontWeight.Bold}
                    >
                      {rate.rate}
                    </Text>
                    {rate.icon}
                  </Flex>
                </Flex>
              </Container>

              {i < rates.length - 1 && (
                <Border key={rate.name} borderType={BorderType.left} />
              )}
            </>
          );
        })}

      {direction == HotelReviewGroupDirection.vertical &&
        rates.map((rate, i) => {
          return (
            <>
              <Container key={i}>
                <Flex
                  justify={FlexJustify.SpaceBetween}
                  gap={Spacing.s24}
                  width={Length.Full}
                >
                  {rate.icon}

                  <Flex
                    width={Length.L30}
                    align={FlexAlign.Center}
                    justify={FlexJustify.SpaceBetween}
                    gap={Spacing.s32}
                  >
                    <Text
                      fontWeight={FontWeight.Medium}
                      mB={Spacing.zero}
                      fontSize={Font.fs14}
                    >
                      {rate.name}
                    </Text>
                    <Text
                      fontWeight={FontWeight.Medium}
                      mB={Spacing.zero}
                      fontSize={Font.fs14}
                    >
                      {rate.rate}
                    </Text>
                  </Flex>
                </Flex>
              </Container>

              {i < rates.length - 1 && (
                <Border
                  m={Spacing.s12}
                  key={rate.name}
                  borderType={BorderType.buttom}
                />
              )}
            </>
          );
        })}
    </>
  );
}

export default HotelReviewGroup;
