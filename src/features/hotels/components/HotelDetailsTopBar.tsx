import Flex from "../../../ui/Flex";

import styled from "styled-components";
import { Color } from "../../../ui/cssConstants";

const TopBar = styled.div`
  padding: 2rem 18rem 0;
  border-bottom: 1px solid ${Color.grey300};
  position: Fixed;
  z-index: 3000;
  background-color: ${Color.grey0};
  width: 100%;
  top: 0;
`;
const Link = styled.a`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0 0 2rem;
  color: ${Color.grey700};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    left: 0;
    transition: width 0.3s;
  }
  &:hover:after {
    background-color: ${Color.grey700};
  }
  &:hover {
    color: ${Color.grey900};
  }
`;

function HotelDetailsTopBar({ sticktop }: { sticktop: boolean }) {
  return (
    <>
      {sticktop && (
        <TopBar>
          <Flex>
            <Link href="#hotel-image-gallery">Photos</Link>
            <Link href="#Facilities">Aminities</Link>
            <Link href="#review">Review</Link>
            <Link href="#">Map</Link>
          </Flex>
        </TopBar>
      )}
    </>
  );
}

export default HotelDetailsTopBar;
