import styled from "styled-components";
import { Spacing } from "./cssConstants";
import { Length, Position } from "./Container";

type positionProps = {
  top?: Spacing | Length | string;
  left?: Spacing | Length | string;
  right?: Spacing | Length | string;
  bottom?: Spacing | Length | string;
  transform?: [Spacing | Length | string, Spacing | Length | string];
  zIndex?: number;
  position?: Position;
};

const StyledPositioned = styled.div<positionProps>`
  position: ${({ position }) => position || "absolute"};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  transform: ${({ transform }) => `translate(${transform?.join(",")})`};
  z-index: ${({ zIndex }) => zIndex};
  display: grid;

  place-items: center;
`;

StyledPositioned.defaultProps = {};

function Positioned({
  children,
  top,
  left,
  right,
  bottom,
  transform,
  zIndex,
  position,
}: {
  children: React.ReactNode;
  top?: Spacing | Length | string;
  left?: Spacing | Length | string;
  right?: Spacing | Length | string;
  bottom?: Spacing | Length | string;
  transform?: [Spacing | Length | string, Spacing | Length | string];
  zIndex?: number;
  position?: Position;
}) {
  return (
    <StyledPositioned
      transform={transform}
      bottom={bottom}
      right={right}
      left={left}
      top={top}
      zIndex={zIndex}
      position={position}
    >
      {children}
    </StyledPositioned>
  );
}

export default Positioned;
