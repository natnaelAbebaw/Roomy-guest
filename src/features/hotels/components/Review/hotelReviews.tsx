import Container, { Length } from "../../../../ui/Container";
import Grid from "../../../../ui/Grid";
import { Color, Spacing } from "../../../../ui/cssConstants";
import Review from "./Review";
import Button, { ButtonType } from "../../../../ui/Button";
import Text, { FontWeight } from "../../../../ui/Text";
import Modal from "../../../../ui/Modal";
import HotelReviewModel from "./HotelReviewModel";
import { useHotelReviews } from "./hotelReviewHooks";

function HotelReviews({ hotelId }: { hotelId: string }) {
  const { hotelReviews, isHotelReviewsLoading } = useHotelReviews(hotelId);

  if (isHotelReviewsLoading) return <div>Loading...</div>;

  return (
    <Container padding={[Spacing.zero, Length.L18]}>
      <Grid
        RowGap={Spacing.s64}
        columGap={Spacing.s128}
        columns={2}
        mb={Spacing.s32}
      >
        {hotelReviews?.map((review, i) => (
          <Review key={i} review={review} />
        ))}
      </Grid>

      <Modal>
        <Modal.Open open="hotelReview">
          <Button
            buttonType={ButtonType.Outline}
            padding={[Spacing.s8, Spacing.s24]}
            borderColor={Color.grey200}
          >
            <Text fontWeight={FontWeight.Medium}>Show all 167 reviews</Text>
          </Button>
        </Modal.Open>

        <Modal.Window
          maxWdith={Length.L108}
          maxHeight={Length.L76}
          name="hotelReview"
        >
          <HotelReviewModel hotelId={hotelId} />
        </Modal.Window>
      </Modal>
    </Container>
  );
}

export default HotelReviews;
