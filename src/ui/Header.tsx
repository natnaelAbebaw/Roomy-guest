import styled, { css } from "styled-components";
import BrandLogo from "./BrandLogo";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../store";
type StyleHeaderProps = {
  isSticky: boolean;
};

const StyleHeader = styled.header<StyleHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  ${(props) =>
    props.isSticky
      ? css`
          padding: 2rem 10rem 18rem 10rem;
          background-color: var(--color-grey-0);
        `
      : css`
          padding: 2rem 10rem;
          background-color: rgba(255, 255, 255, 0.3);
        `}
`;

function Header() {
  const { isSticky } = useSelector((state: RootState) => state.hotels);

  return (
    <StyleHeader isSticky={isSticky}>
      <BrandLogo />
      <Button type="outline">login</Button>
    </StyleHeader>
  );
}

export default Header;
