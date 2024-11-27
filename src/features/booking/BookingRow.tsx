import { PiDotsThreeOutlineFill } from "react-icons/pi";
import {
  Booking,
  BookingStatus,
  PaymentStatus,
} from "../../services/BookingApi";
import Button, { ButtonType } from "../../ui/Button";
import Container, { Length } from "../../ui/Container";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Flex, { FlexAlign, FlexDirection } from "../../ui/Flex";
import Text, { FontWeight, TextAlign, TextTransform } from "../../ui/Text";
import {
  dateDiffrence,
  formatDateMdy,
  formatTimeAgo,
} from "../../utils/dateFormater";
import { format } from "date-fns";
import { TableRow, Td } from "../../ui/Table";
import EllipsisLine from "../../ui/EllipsisLine";
import Modal, { PlacedModel } from "../../ui/Modal";
import Popup from "../../ui/Popup";
import DeletePopup from "../../ui/DeletePopup";
import { useNavigate } from "react-router-dom";
import { CiMoneyCheck1, CiSquareRemove } from "react-icons/ci";
import { useDeleteBooking } from "./useDeleteBooking";
import { IoEyeOutline } from "react-icons/io5";
import BookingDetail from "./BookingDetail";

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

const PaymentStatusMapper: Record<PaymentStatus, Color> = {
  [PaymentStatus.PENDING]: Color.yellow100,
  [PaymentStatus.PAID]: Color.green100,
};

const PaymentStatusBgMapper: Record<PaymentStatus, Color> = {
  [PaymentStatus.PENDING]: Color.yellow700,
  [PaymentStatus.PAID]: Color.green700,
};

function BookingRow({ booking }: { booking: Booking }) {
  const navigate = useNavigate();
  const { DeleteBooking, isDeleteBookingLoading } = useDeleteBooking();

  function handleDeleteBooking(booking: Booking) {
    DeleteBooking({
      bookingId: booking._id,
      hotelId: booking.hotel,
    });
  }

  return (
    <TableRow>
      <Td>
        <Container bR={Spacing.s1}>
          <Flex
            align={FlexAlign.Center}
            gap={Spacing.zero}
            direction={FlexDirection.Column}
            width={Length.L8}
          >
            <Text fontWeight={FontWeight.Medium} fontSize={Font.fs16}>
              {format(new Date(booking.createdAt), "EEE")}
            </Text>
            <Text fontWeight={FontWeight.Bold} fontSize={Font.fs24}>
              {format(new Date(booking.createdAt), "d")}
            </Text>
          </Flex>
        </Container>
      </Td>

      <Td>
        <Container>
          <EllipsisLine width={Spacing.s96}>
            {
              (
                booking.cabin as {
                  _id: string;
                }
              )._id
            }
          </EllipsisLine>
        </Container>
      </Td>
      <Td>
        <Container>
          <Text
            mB={Spacing.s6}
            fontWeight={FontWeight.Medium}
            fontSize={Font.fs16}
          >
            {
              (
                booking.guest as {
                  fullName: string;
                }
              ).fullName
            }
          </Text>
          <Text fontSize={Font.fs14} color={Color.grey500}>
            {
              (
                booking.guest as {
                  email: string;
                }
              ).email
            }
          </Text>
        </Container>
      </Td>
      <Td>
        <Container>
          <Text
            mB={Spacing.s6}
            fontWeight={FontWeight.Medium}
            fontSize={Font.fs16}
          >
            {formatTimeAgo(booking.checkInDate)}&nbsp;&rarr;&nbsp;
            {dateDiffrence(booking.checkInDate, booking.checkOutDate)}
            &nbsp;night stay
          </Text>
          <Text fontSize={Font.fs14} color={Color.grey500}>
            {formatDateMdy(booking.checkInDate)} -
            {formatDateMdy(booking.checkOutDate)}
          </Text>
        </Container>
      </Td>
      <Td>
        <Container>
          <Container
            padding={[Spacing.s4, Spacing.s8]}
            borderRadius={Spacing.s16}
            bg={BookingStatusMapBgColor[booking.status]}
            width={Length.fitContent}
          >
            <Text
              textAlign={TextAlign.Center}
              fontWeight={FontWeight.Medium}
              fontSize={Font.fs12}
              textTransform={TextTransform.Uppercase}
              color={BookingStatusMapColor[booking.status]}
            >
              {booking.status}
            </Text>
          </Container>
        </Container>
      </Td>
      <Td>
        <Container
          padding={[Spacing.s4, Spacing.s8]}
          borderRadius={Spacing.s16}
          bg={PaymentStatusMapper[booking.paymentStatus]}
          width={Length.fitContent}
        >
          <Text
            textAlign={TextAlign.Center}
            fontWeight={FontWeight.Medium}
            fontSize={Font.fs12}
            textTransform={TextTransform.Uppercase}
            color={PaymentStatusBgMapper[booking.paymentStatus]}
          >
            {booking.paymentStatus}
          </Text>
        </Container>
      </Td>
      <Td>
        <Popup>
          <Popup.Open>
            <Button buttonType={ButtonType.Default}>
              <PiDotsThreeOutlineFill />
            </Button>
          </Popup.Open>
          <Popup.Window
            options={{
              right: Spacing.s48,
              top: Spacing.zero,
              minWidth: Length.L16,
            }}
          >
            <Flex direction={FlexDirection.Column} gap={Spacing.s8}>
              <Modal>
                <Modal.Open open="New Room">
                  <Button
                    padding={[Spacing.s8, Spacing.s12]}
                    width={Length.Full}
                    buttonType={ButtonType.Default}
                  >
                    <Flex align={FlexAlign.Center}>
                      <IoEyeOutline fontSize={Font.fs18} />
                      <Text>Overview</Text>
                    </Flex>
                  </Button>
                </Modal.Open>
                <Modal.Window
                  name="New Room"
                  width="50%"
                  placed={PlacedModel.end}
                  height={Length.Vh100}
                >
                  <BookingDetail booking={booking} />
                </Modal.Window>
              </Modal>
              {booking.paymentStatus === PaymentStatus.PENDING && (
                <Button
                  padding={[Spacing.s8, Spacing.s12]}
                  width={Length.Full}
                  buttonType={ButtonType.Default}
                  onClick={() =>
                    navigate(
                      `/payment/hotel/${booking.hotel}/booking/${booking._id}`
                    )
                  }
                >
                  <Flex align={FlexAlign.Center}>
                    <CiMoneyCheck1 fontSize={Font.fs24} />
                    <Text>Pay</Text>
                  </Flex>
                </Button>
              )}

              {Date.now() < new Date(booking.checkInDate).getTime() && (
                <Modal>
                  <Modal.Open open="delete room">
                    <Button
                      padding={[Spacing.s8, Spacing.s12]}
                      width={Length.Full}
                      buttonType={ButtonType.Default}
                      // disabled={isDeleteBookingLoading}
                    >
                      <Flex align={FlexAlign.Center}>
                        <CiSquareRemove fontSize={Font.fs24} />
                        <Text>Cancel</Text>
                      </Flex>
                    </Button>
                  </Modal.Open>
                  <Modal.Window
                    name="delete room"
                    maxWdith="40%"
                    maxHeight="90vh"
                  >
                    <DeletePopup
                      deletedItem={booking._id}
                      onDelete={() => handleDeleteBooking(booking)}
                      disabled={isDeleteBookingLoading}
                    />
                  </Modal.Window>
                </Modal>
              )}
            </Flex>
          </Popup.Window>
        </Popup>
      </Td>
    </TableRow>
  );
}

export default BookingRow;
