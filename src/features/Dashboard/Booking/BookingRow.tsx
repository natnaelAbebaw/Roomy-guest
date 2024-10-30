import { Td, TableRow } from "../../../ui/Dashboard/Table";
import styled from "styled-components";
import {
  Booking,
  BookingStatus,
  PaymentStatus,
} from "../../../services/BookingApi";
import Text, { FontWeight, TextAlign, TextTransform } from "../../../ui/Text";
import { Color, Font, Spacing } from "../../../ui/cssConstants";
import {
  dateDiffrence,
  formatDateMdy,
  formatTimeAgo,
} from "../../../utils/dateFormater";
import Container, { Length } from "../../../ui/Container";
import Popup from "../../../ui/Popup";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Flex, { FlexAlign, FlexDirection } from "../../../ui/Flex";
import Button, { ButtonType } from "../../../ui/Button";

import { HiOutlineCheckCircle } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";

import Modal, { PlacedModel } from "../../../ui/Modal";
import BookingDetail from "./BookingDetail";
import { useUpdateBooking } from "./useUpdateBooking";
import { MdOutlineLogout } from "react-icons/md";
import { useDeleteBooking } from "./useDeleteBooking";
import { AiOutlineDelete } from "react-icons/ai";
import DeletePopup from "../../../ui/Dashboard/DeletePopup";
import { Cabin } from "../../../services/cabinApi";

const Room = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  img {
    width: 4rem;
    aspect-ratio: 1;
    border-radius: 5px;
    border: 1px solid var(--color-grey-200);
  }
`;

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

function BookingRow({
  booking,
  setBulkSelectItems,
  setDestroyBulk,
  bulkSelectItems,
}: {
  booking: Booking;
  setDestroyBulk: React.Dispatch<React.SetStateAction<boolean>>;
  setBulkSelectItems: React.Dispatch<React.SetStateAction<Cabin[] | Booking[]>>;
  bulkSelectItems: Cabin[] | Booking[];
}) {
  const { UpdateBooking, isUpdateBookingLoading } = useUpdateBooking();
  const { DeleteBooking, isDeleteBookingLoading } = useDeleteBooking();

  function handleCheckin() {
    UpdateBooking({
      bookingId: booking._id,
      hotelId: "6617a3dac51520bf4181ba50",
      updatedData: {
        status: BookingStatus.CHECKIN,
        paymentStatus: PaymentStatus.PAID,
      },
    });
  }

  function handleCheckout() {
    UpdateBooking({
      bookingId: booking._id,
      hotelId: "6617a3dac51520bf4181ba50",
      updatedData: {
        status: BookingStatus.CHECKEDOUT,
      },
    });
  }

  function handleDeleteBooking() {
    DeleteBooking({
      bookingId: booking._id,
      hotelId: "6617a3dac51520bf4181ba50",
    });
  }

  return (
    <TableRow>
      <Td>
        <input
          type="checkbox"
          checked={bulkSelectItems.includes(booking)}
          onChange={(e) => {
            if (e.target.checked) {
              setBulkSelectItems((s) => [...s, booking]);
              setDestroyBulk(false);
            } else {
              if (bulkSelectItems.length === 1) {
                setDestroyBulk(true);
                setTimeout(() => {
                  setBulkSelectItems((s) =>
                    s.filter((r) => r._id !== booking._id)
                  );
                }, 300);
              } else {
                setDestroyBulk(false);
                setBulkSelectItems((s) =>
                  s.filter((r) => r._id !== booking._id)
                );
              }
            }
          }}
        />
      </Td>
      <Td>
        <Room>
          <span>{booking.cabin.name}</span>
        </Room>
      </Td>
      <Td>
        <Text fontWeight={FontWeight.Medium} fontSize={Font.fs16}>
          {booking.guest.fullName}
        </Text>
        <Text fontSize={Font.fs14} color={Color.grey500}>
          {booking.guest.email}
        </Text>
      </Td>
      <Td>
        <Text fontWeight={FontWeight.Medium} fontSize={Font.fs16}>
          {formatTimeAgo(booking.checkInDate.toString())}&nbsp;&rarr;&nbsp;
          {dateDiffrence(
            booking.checkInDate.toString(),
            booking.checkOutDate.toString()
          )}
          &nbsp;night stay
        </Text>
        <Text fontSize={Font.fs14} color={Color.grey500}>
          {formatDateMdy(booking.checkInDate.toString())} -
          {formatDateMdy(booking.checkOutDate.toString())}
        </Text>
      </Td>
      <Td>
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
      </Td>
      <Td>${booking.totalPrice}</Td>
      <Td>
        <Popup>
          <Popup.Open>
            <Button buttonType={ButtonType.Default}>
              <PiDotsThreeOutlineVerticalFill />
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
              {booking.status === BookingStatus.UNCONFIRMED ? (
                booking.paymentStatus === PaymentStatus.PAID ? (
                  <Button
                    padding={[Spacing.s8, Spacing.s12]}
                    width={Length.Full}
                    buttonType={ButtonType.Default}
                    onClick={handleCheckin}
                    disabled={isUpdateBookingLoading}
                  >
                    <Flex align={FlexAlign.Center}>
                      <HiOutlineCheckCircle fontSize={Font.fs18} />
                      <Text>Check in</Text>
                    </Flex>
                  </Button>
                ) : (
                  <Modal>
                    <Modal.Open open="New Room">
                      <Button
                        padding={[Spacing.s8, Spacing.s12]}
                        width={Length.Full}
                        buttonType={ButtonType.Default}
                      >
                        <Flex align={FlexAlign.Center}>
                          <HiOutlineCheckCircle fontSize={Font.fs18} />
                          <Text>Check in</Text>
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
                )
              ) : (
                ""
              )}
              {booking.status === BookingStatus.CHECKIN && (
                <Button
                  padding={[Spacing.s8, Spacing.s12]}
                  width={Length.Full}
                  buttonType={ButtonType.Default}
                  onClick={handleCheckout}
                  disabled={isUpdateBookingLoading}
                >
                  <Flex align={FlexAlign.Center}>
                    <MdOutlineLogout fontSize={Font.fs18} />

                    <Text>Check out</Text>
                  </Flex>
                </Button>
              )}

              <Modal>
                <Modal.Open open="delete room">
                  <Button
                    padding={[Spacing.s8, Spacing.s12]}
                    width={Length.Full}
                    buttonType={ButtonType.Default}
                    disabled={isDeleteBookingLoading}
                  >
                    <Flex align={FlexAlign.Center}>
                      <AiOutlineDelete fontSize={Font.fs18} />
                      <Text>Delete booking</Text>
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
                    onDelete={handleDeleteBooking}
                    disabled={isDeleteBookingLoading}
                  />
                </Modal.Window>
              </Modal>
            </Flex>
          </Popup.Window>
        </Popup>
      </Td>
    </TableRow>
  );
}

export default BookingRow;
