import styled from "styled-components";
import Container, { BoxShadow, Length } from "../../ui/Container";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Button from "../../ui/Button";
import Flex, { FlexAlign, FlexDirection } from "../../ui/Flex";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Heading from "../../ui/Heading";
import Text, { FontWeight, TextAlign } from "../../ui/Text";
import { useNavigate } from "react-router-dom";

const StyledPaymentSucess = styled(Container)`
  display: grid;
  place-items: center;
  min-height: 100vh;
`;
function PaymentSucess() {
  const navigate = useNavigate();
  return (
    <StyledPaymentSucess>
      <Container
        boxShadow={BoxShadow.Default}
        bg={Color.grey0}
        width={Length.L44}
        padding={[Spacing.s96, Spacing.s32]}
        borderRadius={Spacing.s32}
      >
        <Flex direction={FlexDirection.Column} align={FlexAlign.Center}>
          <IoIosCheckmarkCircle fontSize={Font.fs74} color={Color.brand700} />
          <Heading
            mb={Spacing.zero}
            fs={Font.fs36}
            fontWeight={FontWeight.Bold}
          >
            Payment succeeded!
          </Heading>
          <Text textAlign={TextAlign.Center} mB={Spacing.s16}>
            Thank you for booking with us. Your booking is confirmed.
          </Text>
          <Button
            padding={[Spacing.s8, Spacing.s24]}
            onClick={() => navigate("/bookings")}
          >
            <Text
              fontWeight={FontWeight.Medium}
              color={Color.grey0}
              fontSize={Font.fs14}
            >
              Go to Your bookings
            </Text>
          </Button>
        </Flex>
      </Container>
    </StyledPaymentSucess>
  );
}

export default PaymentSucess;
