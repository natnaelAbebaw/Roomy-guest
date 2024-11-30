import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent, getBooking } from "../../services/BookingApi";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import StripePaymentForm from "./StripePaymentForm";
import Grid from "../../ui/Grid";
import Container, { Length, Overflow } from "../../ui/Container";
import { Color, Font, Spacing } from "../../ui/cssConstants";
// import { getHotel } from "../../services/hotelApi";
import Text, { FontWeight, TextTransform } from "../../ui/Text";
import { MdOutlineSensorDoor } from "react-icons/md";
import Flex, { FlexAlign, FlexJustify } from "../../ui/Flex";
// import styled from "styled-components";
import {
  dateDiffrence,
  formatDateMdy,
  formatTimeAgo,
} from "../../utils/dateFormater";
import { PulseLoader } from "react-spinners";

const StripePublicationKey = import.meta.env.VITE_STRIPE_PUBLICATION_KEY;

const stripePromise = loadStripe(StripePublicationKey);

function StripePayment() {
  const { hotelId, bookingId } = useParams();

  const { data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(hotelId!, bookingId!),
  });

  const [clientSecret, setClientSecret] = useState("");
  const { mutate: CreatePaymentIntent, isLoading } = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      console.log("clientSecret", data);
      setClientSecret(data.clientSecret);
    },
  });

  useEffect(() => {
    if (!hotelId || !bookingId) return;

    CreatePaymentIntent({
      hotelId,
      bookingId,
    });
  }, [hotelId, bookingId, CreatePaymentIntent]);

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

  console.log("booking", booking);
  return (
    <>
      {clientSecret && (
        <Container height={Length.Vh100}>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Grid columns={2}>
              <Container
                height={Length.Full}
                bg={Color.brand700}
                padding={[Spacing.s128, Spacing.s64]}
              >
                <Flex
                  mb={Spacing.s32}
                  gap={Spacing.s4}
                  align={FlexAlign.Center}
                >
                  <MdOutlineSensorDoor
                    color={Color.grey0}
                    fontSize={Font.fs44}
                  />
                  <Text
                    color={Color.grey0}
                    fontWeight={FontWeight.Bold}
                    fontSize={Font.fs36}
                  >
                    Roomy
                  </Text>
                </Flex>

                <Text
                  fontWeight={FontWeight.Medium}
                  mB={Spacing.s24}
                  color={Color.grey0}
                  fontSize={Font.fs24}
                >
                  Hello {booking?.guest.userName}!
                </Text>
                <Text mB={Spacing.s16} color={Color.grey0}>
                  Your booking#{booking?._id} is confirmed at at a hotel#
                  {booking?.hotel}
                </Text>
                <Flex
                  mb={Spacing.s32}
                  align={FlexAlign.Center}
                  justify={FlexJustify.SpaceBetween}
                >
                  <Text
                    color={Color.grey0}
                    fontWeight={FontWeight.Medium}
                    fontSize={Font.fs16}
                    textTransform={TextTransform.Capitalize}
                  >
                    {formatTimeAgo(booking.checkInDate.toString())}
                    &nbsp;&rarr;&nbsp;
                    {dateDiffrence(
                      booking.checkInDate.toString(),
                      booking.checkOutDate.toString()
                    )}
                    &nbsp;night stay
                  </Text>
                  <Text color={Color.grey0} fontSize={Font.fs14}>
                    {formatDateMdy(booking.checkInDate.toString())} -
                    {formatDateMdy(booking.checkOutDate.toString())}
                  </Text>
                </Flex>

                <Container borderRadius={Spacing.s4}>
                  <Flex mb={Spacing.s2} justify={FlexJustify.SpaceBetween}>
                    <Text color={Color.grey0}>Room price</Text>
                    <Text color={Color.grey0}>
                      ${booking.cabinPrice.toFixed(2)}
                    </Text>
                  </Flex>
                  <Flex mb={Spacing.s8} justify={FlexJustify.SpaceBetween}>
                    <Text fontWeight={FontWeight.Regular} color={Color.grey0}>
                      Breakfast price
                    </Text>
                    <Text color={Color.grey0}>
                      ${booking.extrasPrice.toFixed(2)}
                    </Text>
                  </Flex>
                  <Container
                    pT={Spacing.s8}
                    color={Color.grey0}
                    bT={Spacing.s1}
                    borderColor={Color.brand500}
                    mB={Spacing.zero}
                  >
                    <Flex mb={Spacing.s8} justify={FlexJustify.SpaceBetween}>
                      <Text color={Color.grey0}>Total</Text>
                      <Text fontWeight={FontWeight.Bold} color={Color.grey0}>
                        ${booking.totalPrice.toFixed(2)}
                      </Text>
                    </Flex>
                  </Container>
                  <Flex justify={FlexJustify.End}></Flex>
                </Container>
              </Container>
              <Container overflow={Overflow.Auto} height={Length.Vh100}>
                <StripePaymentForm />
              </Container>
            </Grid>
          </Elements>
        </Container>
      )}
    </>
  );
}

export default StripePayment;
