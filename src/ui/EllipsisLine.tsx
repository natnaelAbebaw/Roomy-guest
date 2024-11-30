import styled from "styled-components";
import { Spacing } from "./cssConstants";
import { Length } from "./Container";
type StyledParagraphProps = {
  width?: Spacing | Length | string;
};

const EllipsisLine = styled.p<StyledParagraphProps>`
  font-size: 1.6rem;
  font-size: 1.6rem;
  width: ${({ width }) => width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default EllipsisLine;
