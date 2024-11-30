import styled, { css } from "styled-components";

import Button, { ButtonType } from "./Button";
import { Color, Font, Spacing } from "./cssConstants";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../context/GlobalContext";
import Container, { Length } from "./Container";
import { MdOutlineSensorDoor } from "react-icons/md";
import Flex, { FlexAlign, FlexDirection } from "./Flex";
import Text, { FontWeight } from "./Text";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Popup from "./Popup";
import Border, { BorderType } from "./Border";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import LoginForm from "../features/Authentication/LoginForm";
import { useAuth } from "../features/Authentication/AuthProvider";

type StyleHeaderProps = {
  searchFormState?: SearchFormActionType;
  isFixed?: string | undefined;
  mb?: string;
  padding?: (Spacing | Length)[];
  onDetailPage?: string;
};

const StyleHeader = styled.header<StyleHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--color-grey-0);
  position: relative;
  z-index: 20;

  z-index: 7;
  padding: ${({ padding }) => padding?.join(" ")};

  ${(props) =>
    props.isFixed &&
    css<StyleHeaderProps>`
      position: fixed;
      top: 0;
      padding: ${({ padding }) =>
        padding?.join(" ") || "2rem 10rem 0rem 10rem"};
      z-index: 7;
    `}
  ${(props) =>
    props.onDetailPage &&
    css<StyleHeaderProps>`
      padding: ${({ padding }) =>
        padding?.join(" ") || "2rem 10rem 3rem 10rem"};
      border-bottom: 1px solid var(--color-grey-200);
    `}

  ${(props) =>
    props.searchFormState === SearchFormActionType.hangOnTop &&
    css<StyleHeaderProps>`
      padding: 2rem 10rem 12rem 10rem;
      z-index: 6;
    `}
    ${(props) =>
    props.searchFormState === SearchFormActionType.stickyOnTop &&
    props.isFixed &&
    css<StyleHeaderProps>`
      padding: ${({ padding }) =>
        padding?.join(" ") || "2rem 10rem 3rem 10rem"};
      border-bottom: 1px solid var(--color-grey-200);
    `}
`;

function Header({
  isFixed = false,
  onDetailPage = false,
  mb = Spacing.s4,
  padding,
}: {
  isFixed?: boolean;
  mb?: string;
  padding?: (Spacing | Length)[];
  onDetailPage?: boolean;
}) {
  const { searchFormState } = useGlobalContext();
  const navigate = useNavigate();
  const { isAuthenticated, logout, guest } = useAuth();
  console.log("guest", guest);
  return (
    <StyleHeader
      padding={padding}
      isFixed={isFixed ? `${isFixed}` : undefined}
      onDetailPage={onDetailPage ? `${onDetailPage}` : undefined}
      searchFormState={searchFormState}
      mb={mb}
    >
      <Link to="/">
        <Flex color={Color.brand700} gap={Spacing.s4} align={FlexAlign.Center}>
          <MdOutlineSensorDoor fontSize={Font.fs30} />
          <Text
            color={Color.brand700}
            fontWeight={FontWeight.Bold}
            fontSize={Font.fs24}
          >
            Roomy
          </Text>
        </Flex>
      </Link>

      <Flex align={FlexAlign.Center}>
        {!isAuthenticated ? (
          <Modal>
            <Modal.Open open="delete room">
              <Button buttonType={ButtonType.Normal}>
                <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
                  Your bookings
                </Text>
              </Button>
            </Modal.Open>
            <Modal.Window name="delete room" maxWdith="32%" maxHeight="90vh">
              <LoginForm />
            </Modal.Window>
          </Modal>
        ) : (
          <Button
            buttonType={ButtonType.Normal}
            onClick={() => {
              navigate("/bookings");
            }}
          >
            <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
              Your bookings
            </Text>
          </Button>
        )}
        <Popup>
          <Popup.Open>
            <Container
              borderRadius={Spacing.s24}
              border={Spacing.s1}
              padding={[Spacing.s8]}
            >
              <Flex align={FlexAlign.Center}>
                <IoReorderThreeOutline fontSize={Font.fs24} />
                {isAuthenticated ? (
                  <Container
                    padding={[Spacing.s6, Spacing.s12]}
                    bg={Color.grey700}
                    borderRadius={Spacing["s1/2"]}
                  >
                    <Text
                      color={Color.grey0}
                      fontWeight={FontWeight.Medium}
                      fontSize={Font.fs12}
                    >
                      {guest?.userName?.[0].toUpperCase()}
                    </Text>
                  </Container>
                ) : (
                  <FaUserCircle fontSize={Font.fs24} />
                )}
              </Flex>
            </Container>
          </Popup.Open>
          <Popup.Window options={{ right: Spacing.s1, top: Spacing.s48 }}>
            <Flex gap={Spacing.s1} direction={FlexDirection.Column}>
              {!isAuthenticated && (
                <>
                  <Modal>
                    <Modal.Open open="delete room">
                      <Button
                        padding={[Spacing.s8, Spacing.s24]}
                        buttonType={ButtonType.Default}
                        width={Length.Full}
                      >
                        <Text
                          fontWeight={FontWeight.Medium}
                          fontSize={Font.fs14}
                        >
                          Signup
                        </Text>
                      </Button>
                    </Modal.Open>
                    <Modal.Window
                      name="delete room"
                      maxWdith="32%"
                      maxHeight="90vh"
                    >
                      <LoginForm isSignup={true} />
                    </Modal.Window>
                  </Modal>

                  <Modal>
                    <Modal.Open open="delete room">
                      <Button
                        padding={[Spacing.s8, Spacing.s24]}
                        buttonType={ButtonType.Default}
                        width={Length.Full}
                      >
                        <Text
                          fontWeight={FontWeight.Medium}
                          fontSize={Font.fs14}
                        >
                          Login
                        </Text>
                      </Button>
                    </Modal.Open>
                    <Modal.Window
                      name="delete room"
                      maxWdith="32%"
                      maxHeight="90vh"
                    >
                      <LoginForm />
                    </Modal.Window>
                  </Modal>
                  <Border borderType={BorderType.buttom} m={Spacing.zero} />
                </>
              )}

              {!isAuthenticated ? (
                <Modal>
                  <Modal.Open open="delete room">
                    <Button
                      padding={[Spacing.s8, Spacing.s24]}
                      buttonType={ButtonType.Default}
                      width={Length.Full}
                    >
                      <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
                        Your Bookings
                      </Text>
                    </Button>
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
                <Button
                  padding={[Spacing.s8, Spacing.s24]}
                  buttonType={ButtonType.Default}
                  width={Length.Full}
                  onClick={() => {
                    navigate("/bookings");
                  }}
                >
                  <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
                    Your Bookings
                  </Text>
                </Button>
              )}

              {isAuthenticated && (
                <>
                  <Border borderType={BorderType.buttom} m={Spacing.zero} />

                  <Button
                    padding={[Spacing.s8, Spacing.s24]}
                    buttonType={ButtonType.Default}
                    width={Length.Full}
                    onClick={() => {
                      logout();
                    }}
                  >
                    <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
                      Log out
                    </Text>
                  </Button>
                </>
              )}
            </Flex>
          </Popup.Window>
        </Popup>
      </Flex>
    </StyleHeader>
  );
}

export default Header;
