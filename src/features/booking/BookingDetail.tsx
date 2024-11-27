import { HiOutlineHomeModern } from "react-icons/hi2";
import Container from "../../ui/Container";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Flex, { FlexAlign, FlexJustify } from "../../ui/Flex";
import Text, { FontWeight, TextTransform } from "../../ui/Text";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Button, { ButtonType } from "../../ui/Button";
import {
  Booking,
  BookingStatus,
  PaymentStatus,
} from "../../services/BookingApi";
import { dateDiffrence, formatDateMdy } from "../../utils/dateFormater";
import Heading from "../../ui/Heading";
import { useEffect, useState } from "react";
import { useHotel } from "./useHotel";
import Modal from "../../ui/Modal";
import DeletePopup from "../../ui/DeletePopup";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Authentication/AuthProvider";

const BookingStatusMapBgColor: Record<BookingStatus, Color> = {
  [BookingStatus.UNCONFIRMED]: Color.blue100,
  [BookingStatus.CHECKIN]: Color.green100,
  [BookingStatus.CHECKEDOUT]: Color.silver100,
};

const BookingStatusMapColor: Record<BookingStatus, Color> = {
  [BookingStatus.UNCONFIRMED]: Color.blue700,
  [BookingStatus.CHECKIN]: Color.green700,
  [BookingStatus.CHECKEDOUT]: Color.silver700,
};

function BookingDetail({ booking }: { booking: Booking }) {
  // const { hotel: authHotel } = useAuth();
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const { hotel } = useHotel(booking.hotel);
  const { DeleteBooking, isDeleteBookingLoading } = useDeleteBooking();

  function handleDeleteBooking(booking: Booking) {
    DeleteBooking({
      bookingId: booking._id,
      hotelId: booking.hotel,
    });
  }

  useEffect(() => {
    if (booking.paymentStatus === PaymentStatus.PAID) {
      setConfirm(true);
    }
  }, [booking.paymentStatus]);
  return (
    <Container padding={[Spacing.zero, Spacing.s96, Spacing.zero, Spacing.s32]}>
      <Container padding={[Spacing.s8, Spacing.zero]}>
        <Flex
          justify={FlexJustify.SpaceBetween}
          mb={Spacing.s32}
          align={FlexAlign.Center}
        >
          <Flex align={FlexAlign.Center}>
            <Heading fs={Font.fs20} mb={Spacing.zero}>
              Book
            </Heading>
            <Text fontSize={Font.fs20}>#{booking._id}</Text>
          </Flex>
          <Container
            borderRadius={Spacing.s16}
            padding={[Spacing.s6, Spacing.s12]}
            bg={BookingStatusMapBgColor[booking.status]}
          >
            <Text
              fontWeight={FontWeight.Medium}
              fontSize={Font.fs14}
              textTransform={TextTransform.Uppercase}
              color={BookingStatusMapColor[booking.status]}
            >
              {booking.status}
            </Text>
          </Container>
        </Flex>
      </Container>

      <Container>
        <Container
          border={Spacing.s1}
          borderRadius={Spacing.s4}
          borderColor={Color.grey200}
          padding={[Spacing.s12, Spacing.s16]}
          mB={Spacing.s32}
        >
          <Flex align={FlexAlign.Center}>
            <HiOutlineHomeModern fontSize={Font.fs24} />
            <Text fontWeight={FontWeight.Medium} fontSize={Font.fs16}>
              {dateDiffrence(booking.checkInDate, booking.checkOutDate)} Nights
              in Room{" "}
              {
                (
                  booking.cabin as {
                    name: string;
                  }
                ).name
              }
            </Text>
            <Text style={{ marginLeft: "auto" }}>
              {formatDateMdy(booking.checkInDate)} -{" "}
              {formatDateMdy(booking.checkOutDate)}
            </Text>
          </Flex>
        </Container>
        <Container>
          <Flex mb={Spacing.s24}>
            <Text fontWeight={FontWeight.Medium}>
              {
                (
                  booking.guest as {
                    fullName: string;
                  }
                ).fullName
              }
            </Text>
            <span>&#183;</span>
            <Text>
              {
                (
                  booking.guest as {
                    email: string;
                  }
                ).email
              }
            </Text>
            <span>&#183;</span>
            <Text>
              National ID{" "}
              {
                (
                  booking.guest as {
                    nationalID: string;
                  }
                ).nationalID
              }
            </Text>
          </Flex>

          <Flex mb={Spacing.s48} align={FlexAlign.Center}>
            <IoCheckmarkCircleOutline fontSize={Font.fs20} />
            <Text fontWeight={FontWeight.Medium}>Breakfast Included?</Text>
            <Text>{booking.hasBreakfast ? "Yes" : "No"}</Text>
          </Flex>

          <Container
            mB={Spacing.s16}
            bg={
              booking.paymentStatus == PaymentStatus.PAID
                ? Color.green100
                : Color.yellow100
            }
            borderRadius={Spacing.s4}
            padding={[Spacing.s16, Spacing.s24]}
          >
            <Flex mb={Spacing.s2} justify={FlexJustify.SpaceBetween}>
              <Text
                style={{ fontStyle: "italic" }}
                color={
                  booking.paymentStatus == PaymentStatus.PAID
                    ? Color.green700
                    : Color.red800
                }
              >
                Room price
              </Text>
              <Text
                color={
                  booking.paymentStatus == PaymentStatus.PAID
                    ? Color.green700
                    : Color.red800
                }
              >
                ${Number(booking.cabinPrice).toFixed(2)}
              </Text>
            </Flex>
            <Flex mb={Spacing.s16} justify={FlexJustify.SpaceBetween}>
              <Text
                fontWeight={FontWeight.Regular}
                style={{ fontStyle: "italic" }}
                color={
                  booking.paymentStatus == PaymentStatus.PAID
                    ? Color.green700
                    : Color.red800
                }
              >
                Breakfast price
              </Text>
              <Text
                color={
                  booking.paymentStatus == PaymentStatus.PAID
                    ? Color.green700
                    : Color.red800
                }
              >
                $
                {Number(
                  hasBreakfast
                    ? booking.numNights *
                        (hotel?.breakFastPrice ? hotel?.breakFastPrice : 0)
                    : booking.extrasPrice
                ).toFixed(2)}
              </Text>
            </Flex>
            <Container
              pT={Spacing.s16}
              borderColor={
                booking.paymentStatus == PaymentStatus.PAID
                  ? Color.green700
                  : Color.red700
              }
              bT={Spacing.s1}
              mB={Spacing.zero}
            >
              <Flex mb={Spacing.s8} justify={FlexJustify.SpaceBetween}>
                <Text
                  style={{ fontStyle: "italic" }}
                  color={
                    booking.paymentStatus == PaymentStatus.PAID
                      ? Color.green700
                      : Color.red800
                  }
                >
                  Total
                </Text>
                <Text
                  fontWeight={FontWeight.Bold}
                  color={
                    booking.paymentStatus == PaymentStatus.PAID
                      ? Color.green700
                      : Color.red800
                  }
                >
                  $
                  {Number(
                    hasBreakfast
                      ? booking.totalPrice +
                          (booking.numNights as number) *
                            (hotel?.breakFastPrice ? hotel?.breakFastPrice : 0)
                      : booking.totalPrice
                  ).toFixed(2)}
                </Text>
              </Flex>
            </Container>
            <Flex justify={FlexJustify.End}>
              <Text
                style={{ marginLeft: "auto" }}
                color={
                  booking.paymentStatus == PaymentStatus.PAID
                    ? Color.green700
                    : Color.red700
                }
                textTransform={TextTransform.Uppercase}
              >
                {booking.paymentStatus == PaymentStatus.PAID
                  ? "Paid"
                  : "Will pay at Property"}
              </Text>
            </Flex>
          </Container>

          <Flex
            justify={FlexJustify.End}
            mb={
              booking.status === BookingStatus.UNCONFIRMED
                ? Spacing.s12
                : Spacing.s32
            }
          >
            <Text>Booked at {formatDateMdy(booking.createdAt)}</Text>
          </Flex>
        </Container>

        <Flex justify={FlexJustify.End}>
          {booking.paymentStatus === PaymentStatus.PENDING && (
            <Button
              padding={[Spacing.s12, Spacing.s24]}
              buttonType={ButtonType.Primary}
              border={Spacing.s1}
              borderColor={Color.grey200}
              color={Color.grey0}
              onClick={() => {
                navigate(
                  `/payment/hotel/${booking.hotel}/booking/${booking._id}`
                );
              }}
            >
              Pay
            </Button>
          )}

          {Date.now() < new Date(booking.checkInDate).getTime() && (
            <Modal>
              <Modal.Open open="delete room">
                <Button
                  padding={[Spacing.s12, Spacing.s24]}
                  buttonType={ButtonType.Primary}
                  disabled={isDeleteBookingLoading}
                  backgroundColor={Color.red700}
                >
                  <Flex align={FlexAlign.Center}>
                    <Text color={Color.grey0}>Cancel</Text>
                  </Flex>
                </Button>
              </Modal.Open>
              <Modal.Window name="delete room" maxWdith="40%" maxHeight="90vh">
                <DeletePopup
                  deletedItem={booking._id}
                  onDelete={() => handleDeleteBooking(booking)}
                  disabled={isDeleteBookingLoading}
                />
              </Modal.Window>
            </Modal>
          )}
        </Flex>
      </Container>
    </Container>
  );
}

export default BookingDetail;
