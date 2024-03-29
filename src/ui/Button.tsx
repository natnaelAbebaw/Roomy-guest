import styled, { css } from "styled-components";

const buttonTypes = {
  primary: css`
    background-color: var(--color-brand-700);
    color: white;
    border: none;
  `,
  secondary: css`
    background-color: var(--color-grey-0);
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--color-grey-300);
    color: var(--color-grey-600);
  `,
  outline: css`
    border: 1px solid var(--color-brand-700);
    background-color: var(--color-grey-0);
    color: var(--color-brand-700);
  `,
};

type ButtonProps = {
  type?: "primary" | "secondary" | "outline";
};

const Button = styled.button<ButtonProps>`
  ${({ type }) => buttonTypes[type!]}
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: capitalize;
  padding: 5px 1rem;
  border-radius: 1rem;
`;

Button.defaultProps = {
  type: "primary",
};

export default Button;
