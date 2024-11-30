import { IoIosSearch } from "react-icons/io";
import Bar from "../../../../ui/Bar";
import Container, {
  Length,
  Overflow,
  Position,
} from "../../../../ui/Container";
import DropDown from "../../../../ui/DropDown";
import Flex, {
  FlexAlign,
  FlexDirection,
  FlexJustify,
} from "../../../../ui/Flex";
import Grid from "../../../../ui/Grid";
import Heading, { HeadingElement } from "../../../../ui/Heading";
import Input from "../../../../ui/Input";
import Positioned from "../../../../ui/Positioned";
import Text, { FontWeight } from "../../../../ui/Text";
import { Color, Font, Spacing } from "../../../../ui/cssConstants";
import HotelReviewGroup, {
  HotelReviewGroupDirection,
} from "./HotelReviewGroup";
import {
  useHotelRatingRange,
  useHotelReviewStat,
  useInfiniteHotelReview,
} from "./hotelReviewHooks";
import Border from "../../../../ui/Border";
import Review from "./Review";
import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";

function HotelReviewModel({ hotelId }: { hotelId: string }) {
  const { hotelReviewStat, isHotelReviewStatLoading } =
    useHotelReviewStat(hotelId);

  const { hotelRatingRanges, isHotelRatingRangesLoading } =
    useHotelRatingRange(hotelId);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState({
    value: "createdAt",
    label: "Most recent",
  });

  // const { hotelReviews, isHotelReviewsLoading } = useHotelReviews(hotelId);
  const reviewRef = useRef<HTMLDivElement>(null);
  // const lastReviewRef = useRef<HTMLDivElement>(null);

  const queryParams = {
    searchQuery,
    sortBy,
    hotelId,
  };

  const {
    hotelReviews,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isLoading,
  } = useInfiniteHotelReview(queryParams);

  const { ref, inView } = useInView({
    threshold: 0.5,
    root: reviewRef.current,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // console.log(hotelRatingRanges);

  const totalRangeRatings = hotelRatingRanges?.reduce(
    (acc, cur) => acc + cur.count,
    0
  );

  if (isHotelRatingRangesLoading && isHotelReviewStatLoading) {
    return <div>loading...</div>;
  }

  const AvarageRating =
    hotelReviewStat &&
    Object.values(hotelReviewStat.rates).reduce((acc, cur) => acc + cur, 0) /
      Object.values(hotelReviewStat.rates).length;

  return (
    <Container padding={[Spacing.zero, Spacing.s32]}>
      <Grid columns={"2fr 5fr"} columGap={Spacing.s64}>
        <Flex direction={FlexDirection.Column} gap={Spacing.zero}>
          <Heading fs={Font.fs24} as={HeadingElement.H2}>
            {AvarageRating?.toFixed(2)} Rating
          </Heading>

          <Text fontWeight={FontWeight.Medium} mB={Spacing.s12}>
            Guest favorite
          </Text>

          <Text
            fontWeight={FontWeight.Medium100}
            fontSize={Font.fs14}
            mB={Spacing.s24}
          >
            One of the most loved homes on ReserveOn based on ratings, reviews,
            and reliability
          </Text>

          <Heading>Overall Rating</Heading>
          <Flex
            width={Length.Full}
            direction={FlexDirection.Column}
            gap={Spacing.zero}
          >
            {Array.from({ length: 5 }).map((_, i, arr) => {
              return (
                <Flex width={Length.Full} align={FlexAlign.Center} key={i}>
                  <Text fontSize={Font.fs14}>{arr.length - i}</Text>
                  {hotelRatingRanges && totalRangeRatings && (
                    <Bar
                      maxwidth={Length.Full}
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

          <Container width={Length.Full} padding={[Spacing.s24, Spacing.zero]}>
            <HotelReviewGroup
              hotelRatingRanges={hotelRatingRanges!}
              hotelReviewStat={hotelReviewStat!}
              direction={HotelReviewGroupDirection.vertical}
            />
          </Container>
        </Flex>

        <Flex width={Length.Full} direction={FlexDirection.Column}>
          <Flex
            width={Length.Full}
            justify={FlexJustify.SpaceBetween}
            // align={FlexAlign.Center}
          >
            <Heading fs={Font.fs24} as={HeadingElement.H2}>
              {hotelReviewStat?.totalReviews} reviews
            </Heading>
            <Container
              padding={[Spacing.s4, Spacing.s8]}
              borderRadius={Spacing.s24}
              border={Spacing.s1}
              borderColor={Color.grey400}
            >
              <DropDown
                toRight={true}
                dropDownList={[
                  { label: "Most recent", value: "createdAt" },
                  { label: "Highest rated", value: "-avarageRating" },
                  { label: "Lowest rated", value: "avarageRating" },
                ]}
                onSelected={function (value) {
                  setSortBy({
                    value: value.value.toString(),
                    label: value.label,
                  });
                }}
                selected={sortBy}
              />
            </Container>
          </Flex>

          <Container width={Length.Full} position={Position.relative}>
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              padding={[Spacing.s12, Spacing.s64]}
              borderRadius={Spacing.s32}
              border={Spacing.s1}
              placeholder="Search Reviews"
            ></Input>

            <Positioned
              transform={[Spacing.zero, Length["L-1/2"]]}
              top={Length["L1/2"]}
              left={Spacing.s16}
            >
              <IoIosSearch fontSize={Font.fs24} />
            </Positioned>
          </Container>

          <Border m={Spacing.s12} color={Color.grey200} />
          <Container
            width={Length.Full}
            maxHeight={Length.L44}
            overflow={Overflow.Auto}
            ref={reviewRef}
          >
            <Flex width={Length.Full} direction={FlexDirection.Column}>
              {isLoading ? (
                <Flex width={Length.Full} justify={FlexJustify.Center}>
                  <ClipLoader />
                </Flex>
              ) : error ? (
                <div>something is wrong</div>
              ) : (
                hotelReviews?.pages?.map((hotelReview, i) => {
                  if (i === hotelReviews.pages.length - 1) {
                    return hotelReview.map((review, i, arr) => {
                      if (i === arr.length - 1) {
                        return (
                          <Review
                            onModel={true}
                            key={review.id}
                            review={review}
                            ref={ref}
                          />
                        );
                      }
                      return (
                        <Review
                          onModel={true}
                          key={review.id}
                          review={review}
                        />
                      );
                    });
                  }

                  return hotelReview.map((review) => (
                    <Review onModel={true} key={review.id} review={review} />
                  ));
                })
              )}

              {isFetchingNextPage && (
                <Flex width={Length.Full} justify={FlexJustify.Center}>
                  <ClipLoader />
                </Flex>
              )}
            </Flex>
          </Container>
        </Flex>
      </Grid>
    </Container>
  );
}

export default HotelReviewModel;
