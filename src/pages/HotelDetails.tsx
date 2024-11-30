import styled from "styled-components";

import Header from "../ui/Header";
import ImageGallery from "../ui/ImageGallery";
import Grid from "../ui/Grid";
import Heading, { HeadingElement } from "../ui/Heading";
import BorderBottom from "../ui/Border";
import { Color, Font, Spacing } from "../ui/cssConstants";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../ui/Flex";
import {
  IoCloseOutline,
  IoCloudyOutline,
  IoRestaurantOutline,
  IoStarSharp,
} from "react-icons/io5";

import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  PiBalloon,
  PiBathtub,
  PiCoffee,
  PiDog,
  PiDoor,
  PiFire,
  PiPoliceCar,
  PiShoppingBag,
  PiTShirt,
  PiWifiNoneFill,
} from "react-icons/pi";
import Button, { ButtonType } from "../ui/Button";

import React, { useEffect, useRef, useState } from "react";

import moment from "moment";
import Slider from "../ui/Slider";
import CabinCard from "../features/cabins/CabinCard";
import Image from "../ui/Image";
import SearchCard from "../features/hotels/components/SearchCard";
import HotelDetailsTopBar from "../features/hotels/components/HotelDetailsTopBar";
import { useQuery } from "react-query";
import { CabinStat, Hotel, getHotel } from "../services/hotelApi";
import { getCabins } from "../services/cabinApi";
import { useParams, useSearchParams } from "react-router-dom";
import { QueryParams } from "../features/hotels/components/queryParams";
import { PulseLoader } from "react-spinners";

import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import CabinShimmerCard from "../features/cabins/CabinShimmerCard";
import MyDatePicker from "../ui/DatePicker";
import Modal from "../ui/Modal";

import SearchBox from "../features/hotels/components/SearchBox";
import { SearchFormActionType } from "../context/GlobalContext";
import Container, { Length, Overflow } from "../ui/Container";
import Text, { FontWeight } from "../ui/Text";

import About from "../features/cabins/About";
import HotelRevieStat from "../features/hotels/components/Review/HotelReviewStat";
import HotelReviews from "../features/hotels/components/Review/hotelReviews";

import { FaAirbnb } from "react-icons/fa";
import { GoMoveToTop, GoScreenFull } from "react-icons/go";
import CabinDetails from "../features/cabins/CabinDetails";

const TopHeader = styled.div`
  position: relative;
`;
const HotelDetailBox = styled.div`
  padding: 2rem 18rem 4rem;
`;

const Details = styled.div`
  padding: 0rem 0 5rem;
`;

const SliderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Aside = styled.aside`
  position: relative;
`;

const DatepickerBox = styled.div`
  height: 40rem;

  & .DayPicker {
    box-shadow: none;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid ${Color.grey200};
  }

  & .DateInput_input {
    padding: 0.8rem 0;
  }
`;

const PopularFacilitiesIcons: { [key: string]: JSX.Element } = {
  "Free Parking": <PiPoliceCar />,

  Restaurant: <IoRestaurantOutline />,
  "Bar/lounge": <PiCoffee />,

  "Free Wi-Fi": <PiWifiNoneFill />,
  "Swimming Pool": <IoCloudyOutline />,

  Gym: <PiBalloon />,
  Spa: <PiBathtub />,
  "Pets allowed": <PiDog />,

  "Family rooms": <HiOutlineUserGroup />,

  "Air Conditioning": <FaAirbnb />,
  Heating: <PiFire />,

  Elevator: <PiDoor />,

  Balcony: <GoMoveToTop />,

  "Laundry Service": <PiTShirt />,

  "Business Center": <PiShoppingBag />,

  "Conference room": <GoScreenFull />,
};

function HotelDetails() {
  const [serachParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState<moment.Moment>(
    serachParams.has(QueryParams.checkinDate)
      ? moment(serachParams.get(QueryParams.checkinDate))
      : moment()
  );
  const [endDate, setEndDate] = useState<moment.Moment>(
    serachParams.has(QueryParams.checkoutDate)
      ? moment(serachParams.get(QueryParams.checkoutDate))
      : moment().add(2, "day")
  );
  const [numOfGuests, setNumOfGuests] = useState(
    serachParams.has(QueryParams.numGuests)
      ? Number(serachParams.get(QueryParams.numGuests))
      : 1
  );
  const { hotelId } = useParams();

  const [stickTop, setStickTop] = useState(false);
  const { data: hotel, isLoading: isHotelLoading } = useQuery<Hotel>({
    queryKey: ["hotel", hotelId],
    queryFn: () => getHotel(hotelId!),
  });

  const { data: cabins, isLoading: isCabinLoading } = useQuery<CabinStat[]>({
    queryKey: ["cabins", hotelId, startDate, endDate, numOfGuests],
    queryFn: () => getCabins(hotelId!, startDate, endDate, numOfGuests),
  });

  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickTop(!entry.isIntersecting);
      },
      { threshold: [0], root: null, rootMargin: "-60px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isHotelLoading, isCabinLoading]);

  useEffect(() => {
    if (serachParams.has(QueryParams.checkoutDate))
      setEndDate(moment(serachParams.get(QueryParams.checkoutDate)));
    if (serachParams.has(QueryParams.checkinDate))
      setStartDate(moment(serachParams.get(QueryParams.checkinDate)));
    if (serachParams.has(QueryParams.numGuests))
      setNumOfGuests(Number(serachParams.get(QueryParams.numGuests)));
  }, [serachParams, setSearchParams]);

  if (isHotelLoading && isCabinLoading)
    return (
      <Flex
        width={Length.Full}
        height={Length.Vh100}
        justify={FlexJustify.Center}
        align={FlexAlign.Center}
      >
        <PulseLoader color={Color.brand700} />
      </Flex>
    );

  return (
    <div>
      <TopHeader>
        <Header
          onDetailPage={true}
          padding={[Length.L2, Length.L18, Length.L2]}
        />
        <SearchBox
          fixed={false}
          defaultState={SearchFormActionType.stickyOnTop}
        />
      </TopHeader>

      <HotelDetailsTopBar sticktop={stickTop} />
      <HotelDetailBox>
        <Heading
          fontWeight={FontWeight.Bold}
          fs={Font.fs24}
          as={HeadingElement.H1}
          color={Color.grey900}
        >
          {hotel?.name}
        </Heading>

        <ImageGallery
          rowSpan={[[1, 2]]}
          columnSpan={[[1, 2]]}
          ref={sentinelRef}
          height={Length.L40}
          id="hotel-image-gallery"
        >
          {new Array(5).fill(5).map((_, index) => (
            <Image src={hotel?.albumImages[index]} alt="hotel image" />
          ))}
        </ImageGallery>

        <Grid columns={"3fr 2fr"}>
          <Details>
            <Flex justify={FlexJustify.SpaceBetween}>
              <Flex direction={FlexDirection.Column} gap={Spacing.s2}>
                <Heading
                  fontWeight={FontWeight.Bold}
                  fs={Font.fs20}
                  mb={Spacing.zero}
                  as={HeadingElement.H2}
                  color={Color.grey900}
                >
                  A hotel in {hotel?.address}
                </Heading>
                <Flex gap={Spacing.s8} align={FlexAlign.Center}>
                  <Text fontWeight={FontWeight.Medium100}>
                    {hotel?.location.city}
                  </Text>
                  <Text fontWeight={FontWeight.Medium100} fontSize={Font.fs10}>
                    &bull;
                  </Text>
                  <Text fontWeight={FontWeight.Medium100}>
                    {hotel?.location.country}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                justify={FlexJustify.End}
                align={FlexAlign.Center}
                gap={Spacing.s8}
              >
                <IoStarSharp />
                <Text fontWeight={FontWeight.Medium100}>
                  {hotel?.ratingAverage} Rating
                </Text>
                <Text fontWeight={FontWeight.Medium100} fontSize={Font.fs10}>
                  {" "}
                  &bull;
                </Text>
                <Text fontWeight={FontWeight.Medium100}>147 Reviews</Text>
              </Flex>
            </Flex>
            <BorderBottom m={Spacing.s32} />
            <Flex direction={FlexDirection.Column}>
              <Flex align={FlexAlign.Center}>
                <Container
                  borderColor={Color.grey700}
                  padding={[Spacing.s2, Spacing.s2]}
                  border={"1.5px"}
                  borderRadius={Spacing.s6}
                >
                  <Flex justify={FlexJustify.Center} align={FlexAlign.Center}>
                    <IoIosArrowRoundForward
                      color={Color.grey900}
                      fontSize={Font.fs20}
                    />
                  </Flex>
                </Container>

                <Flex gap={Spacing.zero} direction={FlexDirection.Column}>
                  <Text fontWeight={FontWeight.Medium}>Self Check in</Text>
                  <Text
                    color={Color.grey600}
                    fontWeight={FontWeight.Medium100}
                    fontSize={Font.fs14}
                  >
                    Check-in time is {hotel?.checkinTime}.
                  </Text>
                </Flex>
              </Flex>

              <Flex align={FlexAlign.Center}>
                <Container
                  borderColor={Color.grey700}
                  padding={[Spacing.s2, Spacing.s2]}
                  border={"1.5px"}
                  borderRadius={Spacing.s6}
                >
                  <Flex justify={FlexJustify.Center} align={FlexAlign.Center}>
                    <IoIosArrowRoundBack
                      color={Color.grey900}
                      fontSize={Font.fs20}
                    />
                  </Flex>
                </Container>
                <Flex gap={Spacing.zero} direction={FlexDirection.Column}>
                  <Text fontWeight={FontWeight.Medium}>Self Check out</Text>
                  <Text
                    color={Color.grey600}
                    fontWeight={FontWeight.Medium100}
                    fontSize={Font.fs14}
                  >
                    Check-out time is {hotel?.checkoutTime}.
                  </Text>
                </Flex>
              </Flex>

              <Flex gap={"20px"} align={FlexAlign.Center}>
                <Container
                  borderColor={Color.grey700}
                  padding={[Spacing.s2, Spacing.s2]}
                  border={"1.5px"}
                  borderRadius={Spacing.s6}
                >
                  <Flex justify={FlexJustify.Center} align={FlexAlign.Center}>
                    <IoCloseOutline
                      color={Color.grey900}
                      fontSize={Font.fs20}
                    />
                  </Flex>
                </Container>
                <Flex gap={Spacing.zero} direction={FlexDirection.Column}>
                  <Text fontWeight={FontWeight.Medium}>Free cancellation</Text>
                  <Text
                    color={Color.grey600}
                    fontWeight={FontWeight.Medium100}
                    fontSize={Font.fs14}
                  >
                    {hotel?.cancellationPolicy}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <BorderBottom m={Spacing.s32} />
            <About title="hotel" description={hotel?.description} />
            <BorderBottom m={Spacing.s32} />
            <div id="Facilities">
              <Heading fs={Font.fs16} mb={Spacing.s2} as={HeadingElement.H2}>
                Popular Facilities
              </Heading>
              <Text
                fontWeight={FontWeight.Medium100}
                fontSize={Font.fs14}
                mB={Spacing.s32}
              >
                Enhancing Your Stay with Exceptional Amenities.
              </Text>
              <Grid
                columns={"repeat(auto-fit, minmax(30rem, 1fr))"}
                RowGap={Spacing.s24}
                mb={Spacing.s32}
              >
                {hotel?.popularfacilities.map((facility) => (
                  <Flex align={FlexAlign.Center}>
                    {facility in PopularFacilitiesIcons ? (
                      React.cloneElement(PopularFacilitiesIcons[facility], {
                        fontSize: Font.fs24,
                        color: Color.grey900,
                      })
                    ) : (
                      <IoIosCheckmarkCircleOutline
                        color={Color.grey900}
                        fontSize={Font.fs24}
                      />
                    )}
                    <Text
                      color={Color.grey900}
                      fontWeight={FontWeight.Medium100}
                    >
                      {facility}
                    </Text>
                  </Flex>
                ))}
              </Grid>
              <Modal>
                <Modal.Open open="facilities">
                  <Button
                    buttonType={ButtonType.Outline}
                    padding={[Spacing.s6, Spacing.s12]}
                    borderColor={Color.grey700}
                  >
                    <Text fontSize={Font.fs14} fontWeight={FontWeight.Medium}>
                      see All Facilities
                    </Text>
                  </Button>
                </Modal.Open>
                <Modal.Window name="facilities">
                  <Container
                    padding={[Spacing.s12, Spacing.s32]}
                    height={Length.L56}
                    overflow={Overflow.Auto}
                  >
                    <Flex width={Length.Full} direction={FlexDirection.Column}>
                      <Flex
                        direction={FlexDirection.Column}
                        gap={Spacing.s12}
                        mb={Spacing.s48}
                        width={Length.Full}
                      >
                        <Heading fs={Font.fs18}>Popular Facilities</Heading>
                        <Flex
                          width={Length.Full}
                          direction={FlexDirection.Column}
                        >
                          {hotel?.popularfacilities.map((facility) => (
                            <Flex
                              width={Length.Full}
                              direction={FlexDirection.Column}
                            >
                              <Flex
                                width={Length.Full}
                                align={FlexAlign.Center}
                              >
                                {facility in PopularFacilitiesIcons ? (
                                  React.cloneElement(
                                    PopularFacilitiesIcons[facility],
                                    {
                                      fontSize: Font.fs24,
                                    }
                                  )
                                ) : (
                                  <IoIosCheckmarkCircleOutline
                                    fontSize={Font.fs24}
                                  />
                                )}
                                <span>{facility}</span>
                              </Flex>
                              <BorderBottom m={Spacing.s8} />
                            </Flex>
                          ))}
                        </Flex>
                      </Flex>

                      <Flex
                        direction={FlexDirection.Column}
                        gap={Spacing.s12}
                        width={Length.Full}
                      >
                        <Heading fs={Font.fs18}>Others Facilities</Heading>
                        <Flex
                          width={Length.Full}
                          direction={FlexDirection.Column}
                        >
                          {hotel?.facilities.map((facility) => (
                            <Flex
                              width={Length.Full}
                              direction={FlexDirection.Column}
                            >
                              <Flex align={FlexAlign.Center}>
                                {
                                  <IoIosCheckmarkCircleOutline
                                    fontSize={Font.fs24}
                                  />
                                }
                                <span>{facility}</span>
                              </Flex>
                              <BorderBottom m={Spacing.s8} />
                            </Flex>
                          ))}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Container>
                </Modal.Window>
              </Modal>
            </div>
            <BorderBottom m={Spacing.s32} />
            <div>
              <Heading fs={Font.fs16} mb={Spacing.s4} as={HeadingElement.H2}>
                Select check-in date
              </Heading>
              <Text
                fontWeight={FontWeight.Medium100}
                fontSize={Font.fs14}
                mB={Spacing.s1}
              >
                Add your travel dates for exact pricing.
              </Text>

              <DatepickerBox>
                <form
                  className="front-Date-picker"
                  action=""
                  onSubmit={(e) => e.preventDefault()}
                >
                  <MyDatePicker
                    startDate={startDate || moment()}
                    endDate={endDate || moment().add(2, "day")}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    popup={false}
                    startDateId="start_id"
                    endDateId="end_id"
                    setParms={true}
                  />
                </form>
              </DatepickerBox>
            </div>
          </Details>
          <Aside>
            <SearchCard />
          </Aside>
        </Grid>
        <BorderBottom m={Spacing.s32} />
        <div id="rooms">
          <Heading
            fontWeight={FontWeight.Bold}
            fs={Font.fs18}
            mb={Spacing.s4}
            as={HeadingElement.H2}
          >
            Select Rooms
          </Heading>

          <Text
            fontWeight={FontWeight.Medium100}
            fontSize={Font.fs14}
            mB={Spacing.s32}
          >
            Choose from a variety of rooms available at the hotel.
          </Text>

          <SliderBox>
            <Slider
              IconsFont={Font.fs52}
              maxWidth={"100%"}
              isLoading={isCabinLoading}
            >
              {isCabinLoading
                ? new Array(4)
                    .fill(4)
                    .map((_, index) => <CabinShimmerCard key={index} />)
                : cabins?.map((cabin, i) => (
                    <Modal>
                      <Modal.Open open={`cabin${i}`}>
                        <div style={{ cursor: "pointer" }}>
                          <CabinCard
                            key={i}
                            cabin={cabin}
                            hotelId={hotelId!}
                            startDate={startDate.toISOString()}
                            endDate={endDate.toISOString()}
                            breakfastPrice={hotel?.breakFastPrice}
                          />
                        </div>
                      </Modal.Open>
                      <Modal.Window
                        padding={[Spacing.s12, Spacing.s32]}
                        maxWdith={"90%"}
                        maxHeight={"95vh"}
                        name={`cabin${i}`}
                      >
                        <CabinDetails
                          key={i}
                          cabinId={cabin.availableCabins[0]}
                          cabin={cabin}
                          hotelId={hotelId!}
                          startDate={startDate.toISOString()}
                          endDate={endDate.toISOString()}
                          breakfastPrice={hotel?.breakFastPrice || 0}
                        />
                      </Modal.Window>
                    </Modal>
                  ))}
            </Slider>
          </SliderBox>
        </div>
      </HotelDetailBox>

      <Container padding={[Spacing.zero, Length.L18]}>
        <BorderBottom m={Spacing.s32} />
      </Container>

      <Container mB={Spacing.s64}>
        {hotel && <HotelRevieStat hotelId={hotel.id} />}
      </Container>
      <div id="review">{hotel && <HotelReviews hotelId={hotel.id} />}</div>
    </div>
  );
}

export default HotelDetails;
