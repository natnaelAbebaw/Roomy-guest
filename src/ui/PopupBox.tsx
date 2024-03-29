import React from "react";
import styled from "styled-components";
type PopupBoxProps = React.ComponentPropsWithRef<"div">;
const PopupBox = styled.div<PopupBoxProps>`
  position: absolute;
  width: 130%;
  z-index: 100;
  /* min-height: 15rem; */
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  background-color: var(--color-grey-0);
  top: 120%;
  border-radius: 5px;
  padding: 2rem;
`;

export default PopupBox;
