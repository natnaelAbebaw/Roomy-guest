import { IoRestaurantOutline } from "react-icons/io5";
import { IoBedOutline } from "react-icons/io5";
import { IoWifiOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoCarOutline } from "react-icons/io5";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

import styled from "styled-components";
import Icon from "../../../ui/Icon";

const Filters = styled.div`
  display: flex;
  gap: 3rem;
  width: min(80rem, 100%);
  overflow-x: hidden;
  align-items: center;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  flex-shrink: 0;
  gap: 5px;
  font-size: 1.4rem;
`;

function HotelsFilters() {
  return (
    <Filters>
      <Icon fontSize="30px">
        <CiCircleChevLeft />
      </Icon>
      <Filter>
        <Icon>
          <IoWifiOutline />
        </Icon>

        <div>Free wifi</div>
      </Filter>
      <Filter>
        <Icon>
          <IoRestaurantOutline />
        </Icon>
        <div>Restaurant</div>
      </Filter>
      <Filter>
        <Icon>
          <IoFastFoodOutline />
        </Icon>
        <div>Breakfast included</div>
      </Filter>
      <Filter>
        <Icon>
          <IoStarOutline />
        </Icon>
        <div> 8+ Rating</div>
      </Filter>
      <Filter>
        <Icon>
          <IoBedOutline />
        </Icon>
        <div>Single beds</div>
      </Filter>
      <Filter>
        <Icon>
          <IoBedOutline />
        </Icon>

        <div>Twin beds</div>
      </Filter>
      <Filter>
        <Icon>
          <IoCarOutline />
        </Icon>

        <div>Free parking</div>
      </Filter>
      <Icon fontSize="30px">
        <CiCircleChevRight />
      </Icon>
    </Filters>
  );
}

export default HotelsFilters;
