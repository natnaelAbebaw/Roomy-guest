import Flex, { FlexAlign, FlexDirection } from "../../ui/Flex";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Heading from "../../ui/Heading";
import EllipsisParagraph from "../../ui/EllipsisParagraph";
import Modal from "../../ui/Modal";
import Button, { ButtonType } from "../../ui/Button";
import { FaAngleRight } from "react-icons/fa";
import Container from "../../ui/Container";

function About({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Flex mb={Spacing.s24} gap={Spacing.s8} direction={FlexDirection.Column}>
      <EllipsisParagraph>{description}</EllipsisParagraph>

      <Modal>
        <Modal.Open open="about">
          <Button buttonType={ButtonType.Normal} color={Color.grey800}>
            <Flex align={FlexAlign.Center}>
              <span>Read More </span>
              <FaAngleRight />
            </Flex>
          </Button>
        </Modal.Open>
        <Modal.Window name="about">
          <Container padding={[Spacing.s8, Spacing.s32]}>
            <Flex gap={Spacing.s12} direction={FlexDirection.Column}>
              <Heading fs={Font.fs18} mb={Spacing.s1}>
                About this {title}
              </Heading>
              <p>{description}</p>
            </Flex>
          </Container>
        </Modal.Window>
      </Modal>
    </Flex>
  );
}

export default About;
