import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 1.2rem 0;
  color: var(--color-grey-500);
  &::placeholder {
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid var(--color-brand-700);
  }
`;

export default Input;
