import { IoMdStar } from "react-icons/io";
import Flex, {
  FlexAlign,
  FlexDirection,
  FlexJustify,
} from "../../../../ui/Flex";
import Container, { Length } from "../../../../ui/Container";
import { Font, Spacing } from "../../../../ui/cssConstants";
import Text, { FontWeight } from "../../../../ui/Text";
import Heading from "../../../../ui/Heading";

import Bar from "../../../../ui/Bar";
import Border, { BorderType } from "../../../../ui/Border";

import { useHotelRatingRange, useHotelReviewStat } from "./hotelReviewHooks";
import HotelReviewGroup from "./HotelReviewGroup";

function HotelRevieStat({ hotelId }: { hotelId: string }) {
  const { hotelReviewStat, isHotelReviewStatLoading } =
    useHotelReviewStat(hotelId);

  const { hotelRatingRanges, isHotelRatingRangesLoading } =
    useHotelRatingRange(hotelId);

  console.log(hotelRatingRanges);

  const AvarageRating =
    hotelReviewStat &&
    Object.values(hotelReviewStat.rates).reduce((acc, cur) => acc + cur, 0) /
      Object.values(hotelReviewStat.rates).length;

  const totalRangeRatings = hotelRatingRanges?.reduce(
    (acc, cur) => acc + cur.count,
    0
  );

  if (isHotelReviewStatLoading || isHotelRatingRangesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container padding={[Spacing.zero, Length.L18, Spacing.s12]}>
      <Flex align={FlexAlign.Center} mb={Spacing.s32}>
        <IoMdStar fontSize={Font.fs24} />
        <Text fontWeight={FontWeight.Bold} fontSize={Font.fs20}>
          {AvarageRating?.toFixed(2)}
        </Text>
        <Text fontWeight={FontWeight.Bold} fontSize={Font.fs12}>
          &bull;
        </Text>
        <Text fontWeight={FontWeight.Bold} fontSize={Font.fs20}>
          {hotelReviewStat?.totalReviews} Reviews
        </Text>
      </Flex>

      <Flex
        height={"110px"}
        gap={Spacing.zero}
        justify={FlexJustify.SpaceBetween}
      >
        <Container padding={[Spacing.zero, Spacing.zero]}>
          <Flex gap={Spacing.zero} direction={FlexDirection.Column}>
            <Heading mb={Spacing.s2} fs={Font.fs14}>
              Overall rating
            </Heading>

            {Array.from({ length: 5 }).map((_, i, arr) => {
              return (
                <Flex gap={Spacing.s8} align={FlexAlign.Center} key={i}>
                  <Text fontWeight={FontWeight.Medium} fontSize={Font.fs12}>
                    {arr.length - i}
                  </Text>
                  {hotelRatingRanges && totalRangeRatings && (
                    <Bar
                      width={`${
                        hotelRatingRanges[arr.length - i - 1]
                          ? (hotelRatingRanges[arr.length - i - 1].count /
                              totalRangeRatings) *
                            100
                          : 0
                      }%`}
                    />
                  )}
                </Flex>
              );
            })}
          </Flex>
        </Container>

        <Border borderType={BorderType.left} />

        <HotelReviewGroup
          hotelRatingRanges={hotelRatingRanges!}
          hotelReviewStat={hotelReviewStat!}
        />
      </Flex>
    </Container>
  );
}

export default HotelRevieStat;
