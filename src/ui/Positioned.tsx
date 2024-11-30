import styled from "styled-components";
import { Spacing } from "./cssConstants";
import { Length, Position } from "./Container";

type positionProps = {
  top?: Spacing | Length;
  left?: Spacing | Length;
  right?: Spacing | Length;
  bottom?: Spacing | Length;
  transform?: [Spacing | Length, Spacing | Length];
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
  top?: Spacing | Length;
  left?: Spacing | Length;
  right?: Spacing | Length;
  bottom?: Spacing | Length;
  transform?: [Spacing | Length, Spacing | Length];
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
