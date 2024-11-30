import styled from "styled-components";
import Container, { Length } from "../../ui/Container";
import Flex, { FlexDirection, FlexJustify } from "../../ui/Flex";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Button, { ButtonType } from "../../ui/Button";
import Text, { FontWeight, TextAlign } from "../../ui/Text";
import { MdAlternateEmail, MdOutlineLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";

const StyledLoginForm = styled.div`
  width: 100%;
`;

const Brand = styled(Flex)`
  font-size: 3.6rem;
  font-weight: 600;
  align-items: center;
  color: var(--color-brand-700);
  font-family: "Quicksand", sans-serif;
  margin-bottom: 1.4rem;
  justify-content: center;
  &:hover + div {
    visibility: visible;
  }
`;

const InputBox = styled(Flex)`
  position: relative;
  label {
    font-size: 1.4rem;
    color: ${Color.grey400};
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
    transition: all 0.3s;
    padding: 0 3px;
    pointer-events: none;
    background-color: ${Color.grey0};
  }
  svg {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    color: ${Color.grey400};
  }

  input {
    font-size: 1.6rem;
    padding: 1rem 2rem;
    border: 1.5px solid ${Color.grey100};
    border-radius: 6px;
    width: 100%;
    color: ${Color.grey700};
    /* background-color: ${Color.grey50}; */
    &:focus {
      background-color: ${Color.grey0};
      border: 1.5px solid ${Color.brand500};
    }
    &:focus + label {
      top: 8.9px;
      left: 2rem;
      color: ${Color.brand500};
      transform: translateY(-100%);
      font-size: 1.2rem;
    }

    &:focus ~ svg {
      color: ${Color.brand500};
    }

    &::placeholder {
      visibility: hidden;
    }

    &:not(&:placeholder-shown) + label {
      top: 8.9px;
      left: 2rem;
      color: ${Color.grey400};
      transform: translateY(-100%);
      font-size: 1.2rem;
    }
  }
`;

function LoginForm({ isSignup = false }: { isSignup?: boolean }) {
  const [type, setType] = useState(isSignup ? "signup" : "login");

  const { register, handleSubmit, formState, reset, getValues } = useForm<{
    email: string;
    password: string;
    userName: string;
    confirmPassword: string;
  }>();
  const { login, isLoginLoading, signup, isSignupLoading } = useAuth();
  const { errors } = formState;
  function onSubmit(data: {
    email: string;
    password: string;
    userName: string;
  }) {
    if (type == "signup") {
      signup(data);
    } else {
      login(data);
    }
  }

  useEffect(() => {
    reset();
  }, [type, reset]);

  console.log(errors);
  return (
    <StyledLoginForm>
      <Container>
        <Container
          borderRadius={Spacing.s8}
          padding={[Spacing.s32, Spacing.s24, Spacing.s48, Spacing.s24]}
          width={Length.Full}
        >
          <Brand>
            <span>Roomy</span>
          </Brand>
          <Flex mb={Spacing.s8} justify={FlexJustify.Center}>
            <Heading mb={Spacing.zero} fs={Font.fs20}>
              Hello again!
            </Heading>
          </Flex>
          <Flex mb={Spacing.s32} justify={FlexJustify.Center}>
            <Text color={Color.grey500} fontSize={Font.fs16}>
              {type == "signup"
                ? "Create an account"
                : "Log in to your Account"}
            </Text>
          </Flex>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {type == "signup" && (
              <div>
                <InputBox
                  gap={Spacing.s4}
                  direction={FlexDirection.Column}
                  mb={Spacing.s2}
                >
                  <Input
                    padding={[Spacing.s8, Spacing.s16]}
                    border={Spacing.s1}
                    borderRadius={Spacing.s2}
                    type="text"
                    width={Length.Full}
                    placeholder="Username"
                    disabled={isSignupLoading}
                    {...register("userName", {
                      required: "This Field Required",
                    })}
                  />
                  <label>Username</label>
                  <MdAlternateEmail />
                </InputBox>

                <Text mB={Spacing.s8} fontSize={Font.fs12} color={Color.red700}>
                  {errors.userName ? (
                    errors.userName.message
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </Text>
              </div>
            )}
            <div>
              <InputBox
                mb={Spacing.s2}
                gap={Spacing.s4}
                direction={FlexDirection.Column}
              >
                <Input
                  padding={[Spacing.s8, Spacing.s16]}
                  border={Spacing.s1}
                  borderRadius={Spacing.s2}
                  type="email"
                  width={Length.Full}
                  placeholder="Email"
                  disabled={isLoginLoading || isSignupLoading}
                  {...register("email", {
                    required: "This Field Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <label>Email</label>
                <MdAlternateEmail />
              </InputBox>
              <Text mB={Spacing.s8} fontSize={Font.fs12} color={Color.red700}>
                {errors.email ? errors.email.message : <span>&nbsp;</span>}
              </Text>
            </div>

            <div>
              <InputBox
                gap={Spacing.s4}
                direction={FlexDirection.Column}
                mb={Spacing.s2}
              >
                <Input
                  padding={[Spacing.s8, Spacing.s16]}
                  border={Spacing.s1}
                  borderRadius={Spacing.s2}
                  width={Length.Full}
                  type="password"
                  placeholder="Password"
                  disabled={isLoginLoading || isSignupLoading}
                  {...register("password", {
                    required: "This Field Required ",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <label>Password</label>
                <MdOutlineLock />
              </InputBox>
              <Text mB={Spacing.s8} fontSize={Font.fs12} color={Color.red700}>
                {errors.password ? (
                  errors.password.message
                ) : (
                  <span>&nbsp;</span>
                )}
              </Text>
            </div>
            {type == "signup" && (
              <div>
                <InputBox
                  gap={Spacing.s4}
                  direction={FlexDirection.Column}
                  mb={Spacing.s2}
                >
                  <Input
                    padding={[Spacing.s8, Spacing.s16]}
                    border={Spacing.s1}
                    borderRadius={Spacing.s2}
                    width={Length.Full}
                    type="password"
                    disabled={isSignupLoading}
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "This Field Required ",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  <label>Confirm password</label>
                  <MdOutlineLock />
                </InputBox>
                <Text
                  mB={Spacing.s32}
                  fontSize={Font.fs12}
                  color={Color.red700}
                >
                  {errors.confirmPassword ? (
                    errors.confirmPassword.message
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </Text>
              </div>
            )}
            {type == "login" && (
              <Text mB={Spacing.s32}>
                Don't have an account?
                <Button
                  buttonType={ButtonType.Default}
                  onClick={() => setType("signup")}
                >
                  <Text fontWeight={FontWeight.Medium}>Sign up</Text>
                </Button>
              </Text>
            )}

            <Button
              padding={[Spacing.s12]}
              color={Color.grey0}
              width={Length.Full}
              type="submit"
              disabled={isLoginLoading || isSignupLoading}
            >
              <div>
                {isLoginLoading || isSignupLoading ? (
                  <ClipLoader color={Color.blue100} size={24} />
                ) : (
                  <Text
                    color={Color.brand100}
                    fontSize={Font.fs18}
                    textAlign={TextAlign.Center}
                  >
                    {type == "signup" ? "Signup" : "Login"}
                  </Text>
                )}
              </div>
            </Button>
          </form>
        </Container>
      </Container>
    </StyledLoginForm>
  );
}

export default LoginForm;
