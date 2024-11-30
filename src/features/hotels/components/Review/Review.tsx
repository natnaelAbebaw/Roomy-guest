import { IoMdStar } from "react-icons/io";
import Flex, { FlexAlign, FlexDirection } from "../../../../ui/Flex";
import Heading, { HeadingElement } from "../../../../ui/Heading";
import Text, { FontWeight } from "../../../../ui/Text";
import Image from "../../../../ui/Image";
import Container, { Length, Overflow } from "../../../../ui/Container";
import { Font, Spacing } from "../../../../ui/cssConstants";
import EllipsisParagraph from "../../../../ui/EllipsisParagraph";
import Button, { ButtonType } from "../../../../ui/Button";
import { hotelReview } from "../../../../services/hotelApi";
import { formatTimeAgo } from "../../../../utils/dateFormater";
import { LegacyRef, forwardRef } from "react";
import Modal from "../../../../ui/Modal";
import HotelReviewModel from "./HotelReviewModel";

const Review = forwardRef(function (
  props: { review: hotelReview; onModel?: boolean },
  ref?: LegacyRef<HTMLDivElement> | null
) {
  const { review } = props;
  return (
    <Container ref={ref ? ref : undefined} maxWidth={Length.L56}>
      <Flex mb={Spacing.s8}>
        <Container
          width={"4.5rem"}
          height={"4.5rem"}
          borderRadius={Spacing["s1/2"]}
          overflow={Overflow.Hidden}
        >
          <Image src={review.guest.avatarUrl} alt="" />
        </Container>
        <Flex gap={Spacing.s1} direction={FlexDirection.Column}>
          <Heading
            fontWeight={FontWeight.Bold}
            mb={Spacing.zero}
            as={HeadingElement.H4}
          >
            {review.guest.fullName}
          </Heading>
          <Text fontSize={Font.fs14} fontWeight={FontWeight.Medium100}>
            {review.guest.address.city}, {review.guest.address.country}
          </Text>
        </Flex>
      </Flex>

      <Flex mb={Spacing.s8} align={FlexAlign.Center}>
        <Flex gap={Spacing.s1}>
          {new Array(5).fill(0).map((_, i) => (
            <IoMdStar fontSize={Font.fs14} key={i} />
          ))}
        </Flex>
        <Text fontSize={Font.fs10}>&bull;</Text>
        <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
          {formatTimeAgo(review.createdAt)}
        </Text>
      </Flex>
      {props.onModel ? (
        <div>{review.review}</div>
      ) : (
        <EllipsisParagraph>{review.review}</EllipsisParagraph>
      )}

      {!props.onModel && (
        <Modal>
          <Modal.Open open="hotelReview">
            <Button buttonType={ButtonType.Normal}>Read more</Button>
          </Modal.Open>

          <Modal.Window
            maxWdith={Length.L108}
            maxHeight={Length.L76}
            name="hotelReview"
          >
            <HotelReviewModel hotelId={review.hotel} />
          </Modal.Window>
        </Modal>
      )}
    </Container>
  );
});

export default Review;
