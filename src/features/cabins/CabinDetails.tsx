import { IoStarSharp } from "react-icons/io5";
import Container, { Length, Overflow } from "../../ui/Container";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../../ui/Flex";
import Grid from "../../ui/Grid";
import Heading, { HeadingElement } from "../../ui/Heading";
import Text from "../../ui/Text";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import { IoMdCheckmark } from "react-icons/io";
import About from "./About";
import Price from "./Price";
import { useMutation, useQuery } from "react-query";
import { getCabin } from "../../services/cabinApi";
import { PulseLoader } from "react-spinners";
import Button from "../../ui/Button";
import ImageGallery from "../../ui/ImageGallery";
import Image from "../../ui/Image";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthProvider";
import {
  BookingStatus,
  createBooking,
  PaymentStatus,
} from "../../services/BookingApi";
import { useState } from "react";
import LoginForm from "../Authentication/LoginForm";

function CabinDetails({
  breakfastPrice,
  hotelId,
  startDate,
  endDate,
  cabinId,
}: {
  cabinId: string;
  breakfastPrice: number | undefined;
  hotelId: string;
  startDate: string;
  endDate: string;
}) {
  const { data: cabin, isLoading } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => getCabin(cabinId),
  });

  const navigate = useNavigate();

  const { mutate, isLoading: isReserveLoading } = useMutation({
    mutationFn: createBooking,
    onSuccess(data) {
      console.log(data);
      navigate(`/payment/hotel/${cabin?.hotel}/booking/${data._id}`);
    },
  });

  const { isAuthenticated, guest } = useAuth();

  const [breakFast, setBreakfast] = useState<boolean>(false);

  function reserveCabin() {
    mutate({
      hotelId,
      bookingObj: {
        checkInDate: startDate,
        checkOutDate: endDate,
        guest: guest?._id,
        hotel: hotelId,
        cabin: cabin?._id?.[0],
        cabinPrice: cabin?.regularPrice,
        extrasPrice: breakFast ? breakfastPrice : 0,
        totalPrice:
          (cabin?.regularPrice || 0) + (breakFast ? breakfastPrice! : 0),
        hasBreakfast: breakFast,
        status: BookingStatus.UNCONFIRMED,
        paymentStatus: PaymentStatus.PENDING,
      },
    });
  }

  if (isLoading)
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
    <Container padding={[Spacing.s24]} overflow={Overflow.Auto}>
      <Grid columGap={Spacing.s64} columns={2}>
        <Container
          overflow={Overflow.Auto}
          padding={[Spacing.s48, Spacing.s16]}
        >
          <Flex
            direction={FlexDirection.Column}
            gap={Spacing.s4}
            mb={Spacing.s16}
          >
            <Heading
              as={HeadingElement.H3}
              color={Color.brand800}
              mb={Spacing.zero}
            >
              {cabin?.cabinType}
            </Heading>
            <Flex
              width={Length.Full}
              align={FlexAlign.Center}
              justify={FlexJustify.SpaceBetween}
              gap={Spacing.s24}
            >
              <Heading as={HeadingElement.H2} fs={Font.fs24} mb={Spacing.zero}>
                {cabin?.name}
              </Heading>
              <Flex align={FlexAlign.Center}>
                <IoStarSharp color={Color.grey500} />
                <Text>4.6 Rating</Text>
              </Flex>
            </Flex>
            <Flex align={FlexAlign.Center}>
              <Text fontSize={Font.fs14}>
                {cabin?.floor} <sup>th</sup> Floor
              </Text>
              <Text fontSize={Font.fs10}>&bull;</Text>
              <Text fontSize={Font.fs14}>Upto {cabin?.maxCapacity} guests</Text>
              <Text fontSize={Font.fs10}>&bull;</Text>
              <Text fontSize={Font.fs14}>{cabin?.numBeds} Beds</Text>
            </Flex>
          </Flex>

          <Flex mb={Spacing.s32}>
            {cabin?.bedConfigurations?.map((bedConfig) => (
              <Container
                borderRadius={Spacing.s4}
                padding={[Spacing.s8, Spacing.s16]}
                bg={Color.grey100}
              >
                <Text fontSize={Font.fs14} color={Color.grey600}>
                  {bedConfig}
                </Text>
              </Container>
            ))}

            <Container
              borderRadius={Spacing.s4}
              padding={[Spacing.s8, Spacing.s16]}
              bg={Color.grey100}
            >
              <Text fontSize={Font.fs14} color={Color.grey600}>
                {cabin?.viewType}
              </Text>
            </Container>
          </Flex>
          <Container mB={Spacing.s24}>
            <About title="Cabin" description={cabin?.description} />
          </Container>

          <Container mB={Spacing.s48}>
            <Heading as={HeadingElement.H3}>Amenities</Heading>
            <Grid
              columns={"repeat(auto-fit, minmax(20rem, 1fr))"}
              RowGap={Spacing.s16}
            >
              {cabin?.amenities?.map((aminity, i) => (
                <Flex key={i} align={FlexAlign.Center}>
                  <IoMdCheckmark color={Color.grey600} />{" "}
                  <Text color={Color.grey600} fontSize={Font.fs14}>
                    {aminity}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Container>
          <Flex align={FlexAlign.End} justify={FlexJustify.SpaceBetween}>
            <Price
              setBreakfast={setBreakfast}
              breakFast={breakFast}
              breakfastPrice={breakfastPrice}
              cabin={cabin}
            />

            {!isAuthenticated ? (
              <Modal>
                <Modal.Open open="delete room">
                  <Button
                    padding={[Spacing.s8, Spacing.s24]}
                    color={Color.grey0}
                    disabled={isReserveLoading}
                  >
                    <Text color={Color.grey0} fontSize={Font.fs20}>
                      Reserve
                    </Text>
                  </Button>
                </Modal.Open>
                <Modal.Window
                  name="delete room"
                  maxWdith="32%"
                  maxHeight="90vh"
                >
                  <LoginForm />
                </Modal.Window>
              </Modal>
            ) : (
              <Button
                onClick={reserveCabin}
                padding={[Spacing.s8, Spacing.s24]}
                color={Color.grey0}
                disabled={isReserveLoading}
              >
                <Text color={Color.grey0} fontSize={Font.fs20}>
                  Reserve
                </Text>
              </Button>
            )}
          </Flex>
        </Container>

        <Container padding={[Spacing.s32, Spacing.s16]}>
          <ImageGallery
            column={2}
            row={4}
            rowSpan={[
              [3, 2],
              [1, 2],
            ]}
            columnSpan={[[1, 2]]}
            height={Length.L60}
          >
            {new Array(4).fill(0).map((_, i) => (
              <Image
                key={i}
                src={cabin?.albumImages?.[i]}
                alt={`cabin image `}
              />
            ))}
            {/* {cabin?.albumImages.map((image, i) => (
              <Image key={i} src={image} alt={`cabin image `} />
            ))} */}
          </ImageGallery>
        </Container>
      </Grid>
    </Container>
  );
}

export default CabinDetails;
