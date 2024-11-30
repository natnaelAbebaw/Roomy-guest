import { IoStarSharp } from "react-icons/io5";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../../ui/Flex";
import Heading, { HeadingElement } from "../../ui/Heading";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import { IoMdCheckmark } from "react-icons/io";
import Button from "../../ui/Button";

import Image from "../../ui/Image";

import styled from "styled-components";

import Text, { FontWeight, TextAlign } from "../../ui/Text";
import Container, { Length } from "../../ui/Container";

import Price from "./Price";
import { CabinStat } from "../../services/hotelApi";
import { useMutation } from "react-query";
import {
  BookingStatus,
  createBooking,
  PaymentStatus,
} from "../../services/BookingApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthProvider";
import Modal from "../../ui/Modal";
import LoginForm from "../Authentication/LoginForm";

const ImageBox = styled.div`
  width: 100%;
  height: 22rem;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
`;

const StyledCabinCard = styled.div`
  width: 37rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.09);
`;

const StyledButton = styled(Button)`
  transition: background-image 0.3s, color 0.3s;
  &:hover {
    background-image: linear-gradient(
      90deg,
      ${Color.brand500} 0%,
      ${Color.brand900} 100%
    );
    & div {
      color: ${Color.grey0};
    }
  }

  &:active {
    background-color: ${Color.brand200};
  }
`;

function CabinCard({
  cabin,
  breakfastPrice,
  hotelId,
  startDate,
  endDate,
}: {
  cabin: CabinStat;
  breakfastPrice: number | undefined;
  hotelId: string;
  startDate: string;
  endDate: string;
}) {
  const [breakFast, setBreakfast] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: createBooking,
    onSuccess(data) {
      console.log(data);
      navigate(`/payment/hotel/${hotelId}/booking/${data._id}`);
    },
  });
  const { isAuthenticated, guest } = useAuth();

  function reserveCabin() {
    mutate({
      hotelId,
      bookingObj: {
        checkInDate: startDate,
        checkOutDate: endDate,
        guest: guest?._id,
        hotel: hotelId,
        cabin: cabin.availableCabins?.[0],
        cabinPrice: cabin.regularPrice,
        extrasPrice: breakFast ? breakfastPrice : 0,
        totalPrice: cabin.regularPrice + (breakFast ? breakfastPrice! : 0),
        hasBreakfast: breakFast,
        status: BookingStatus.UNCONFIRMED,
        paymentStatus: PaymentStatus.PENDING,
      },
    });
  }

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
              <Text
                fontWeight={FontWeight.Medium100}
                color={Color.grey600}
                fontSize={Font.fs14}
              >
                4.6 Rating
              </Text>
            </Flex>
          </Flex>
          <Flex align={FlexAlign.Center} justify={FlexJustify.End}>
            <Text
              fontWeight={FontWeight.Medium100}
              color={Color.grey600}
              fontSize={Font.fs14}
            >
              {cabin.numCabinsAvailable} Available
            </Text>
          </Flex>
        </Flex>

        <Container mB={Spacing.s16}>
          <Heading
            fontWeight={FontWeight.Medium}
            fs={Font.fs14}
            mb={Spacing.s8}
          >
            Amenities
          </Heading>
          <Flex direction={FlexDirection.Column} gap={Spacing.s8}>
            {new Array(2).fill(0).map((_, i) => (
              <Flex key={i} align={FlexAlign.Center}>
                <IoMdCheckmark color={Color.grey600} />{" "}
                <Text
                  fontWeight={FontWeight.Medium100}
                  color={Color.grey600}
                  fontSize={Font.fs14}
                >
                  {cabin.amenities[i]}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Container>

        <Flex
          direction={FlexDirection.Column}
          justify={FlexJustify.SpaceBetween}
        >
          <Price
            cabin={cabin}
            breakFast={breakFast}
            setBreakfast={setBreakfast}
            breakfastPrice={breakfastPrice!}
          />
          <Container
            width={Length.Full}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!isAuthenticated ? (
              <Modal>
                <Modal.Open open="delete room">
                  <StyledButton
                    disabled={isLoading}
                    width={Length.Full}
                    backgroundColor={Color.grey50}
                    padding={[Spacing.s8, Spacing.s12]}
                  >
                    <Text
                      textAlign={TextAlign.Center}
                      color={Color.grey600}
                      fontWeight={FontWeight.Medium}
                    >
                      Reserve
                    </Text>
                  </StyledButton>
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
              <StyledButton
                onClick={(e) => {
                  e.stopPropagation();
                  reserveCabin();
                }}
                disabled={isLoading}
                width={Length.Full}
                backgroundColor={Color.brand50}
                padding={[Spacing.s8, Spacing.s12]}
              >
                <Text
                  textAlign={TextAlign.Center}
                  color={Color.grey600}
                  fontWeight={FontWeight.Medium}
                >
                  Reserve
                </Text>
              </StyledButton>
            )}
          </Container>
        </Flex>
      </Container>
    </StyledCabinCard>
  );
}

export default CabinCard;
