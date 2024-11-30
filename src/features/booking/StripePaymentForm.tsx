import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Container, { Length } from "../../ui/Container";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Heading from "../../ui/Heading";
import Button, { ButtonType } from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  let isLoading = false;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    isLoading = true;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/paymentSucess",
      },
    });

    if (error) {
      console.error("Payment error:", error);
    }

    isLoading = false;
  };

  return (
    <Container padding={[Spacing.s128, Spacing.s64]}>
      <form onSubmit={handleSubmit}>
        <Heading mb={Spacing.s48} fs={Font.fs30} as="h2">
          Add Your Payment Details
        </Heading>
        <Container mB={Spacing.s48}>
          <PaymentElement />
        </Container>

        <Button
          width={Length.Full}
          padding={[Spacing.s16]}
          type="submit"
          disabled={isLoading}
          color={Color.grey0}
          mb={Spacing.s24}
        >
          Pay Now
        </Button>
        <Button
          buttonType={ButtonType.Outline}
          width={Length.Full}
          padding={[Spacing.s16]}
          borderColor={Color.grey200}
          disabled={isLoading}
          onClick={() => navigate(-1)}
        >
          I will Pay at property
        </Button>
      </form>
    </Container>
  );
}

export default StripePaymentForm;
