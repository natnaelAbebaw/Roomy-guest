import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { CgGym } from "react-icons/cg";
import { GiHeatHaze } from "react-icons/gi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  IoBedOutline,
  IoBeerOutline,
  IoCarOutline,
  IoFastFoodOutline,
  IoRestaurantOutline,
  IoStarOutline,
  IoWifiOutline,
} from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { MdBalcony, MdOutlineRoomService } from "react-icons/md";
import {
  PiBathtub,
  PiDog,
  PiElevator,
  PiMountains,
  PiSwimmingPool,
} from "react-icons/pi";
import { TbAirConditioning, TbBeach, TbToolsKitchen2 } from "react-icons/tb";

import styled from "styled-components";
import Icon from "../../../ui/Icon";
import { useEffect, useRef, useState } from "react";
import Filter from "./Filter";

const FilterLimit = styled.div`
  width: min(80rem, 100%);
  overflow: hidden;
  position: relative;

  & > .iconBox {
    z-index: 100;
    position: absolute;
    top: 50%;
    width: 5rem;
    height: 5rem;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > .iconBox:first-child {
    left: 0;
    background-image: linear-gradient(
      to right,
      white,
      rgba(255, 255, 255, 0.3)
    );
  }
  & > .iconBox:last-child {
    right: 0;
    background-image: linear-gradient(to left, white, rgba(255, 255, 255, 0.3));
  }

  & .icon {
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 50%;
    background-color: white;
    &:hover {
      box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

const filters = [
  { icon: <IoStarOutline />, name: "8+ Rating" },
  { icon: <IoBedOutline />, name: "Single beds" },
  { icon: <IoBedOutline />, name: "Twin beds" },
  { icon: <IoCarOutline />, name: "Free parking" },
  { icon: <IoFastFoodOutline />, name: "Breakfast included" },
  { icon: <IoRestaurantOutline />, name: "Restaurant" },
  { icon: <IoBeerOutline />, name: "Bar" },
  { icon: <MdOutlineRoomService />, name: "Room service" },
  { icon: <TbToolsKitchen2 />, name: "Kitchen" },
  { icon: <IoWifiOutline />, name: "Free wifi" },
  { icon: <PiSwimmingPool />, name: "Pool" },
  { icon: <CgGym />, name: "Gym" },
  { icon: <PiBathtub />, name: "Spa" },
  { icon: <PiDog />, name: "Pets allowed" },
  { icon: <HiOutlineUserGroup />, name: "Family rooms" },
  { icon: <TbAirConditioning />, name: "Air conditioning" },
  { icon: <GiHeatHaze />, name: "Heating" },
  { icon: <PiElevator />, name: "Elevator" },
  { icon: <MdBalcony />, name: "Balcony" },
  { icon: <TbBeach />, name: "Beachfront" },
  { icon: <LiaCitySolid />, name: "City view" },
  { icon: <PiMountains />, name: "Mountain view" },
];

type filtersProps = {
  translateWidth: number;
};
const Filters = styled.div<filtersProps>`
  display: flex;
  gap: 3rem;
  width: max-content;
  align-items: center;
  transform: translateX(calc(-${(props) => props.translateWidth}px));
  transition: transform 0.6s ease-in-out;
`;

function HotelsFilters() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterLimitRef = useRef<HTMLDivElement>(null);
  const [translateWidth, setTranslateWidth] = useState(0);

  useEffect(() => {
    const filter = filterRef.current;
    const filterLimit = filterLimitRef.current;
    if (!filter || !filterLimit) return;
    const filterWidth = filter.offsetWidth;
    const filterLimitWidth = filterLimit.offsetWidth * 0.7;
    setMaxPage(Math.ceil(filterWidth / filterLimitWidth));

    if (filterLimitWidth < filterWidth - (page - 1) * filterLimitWidth) {
      setTranslateWidth(filterLimitWidth * (page - 1));
    } else {
      setTranslateWidth(
        filterLimitWidth * (page - 2) +
          filterWidth -
          (page - 1) * filterLimitWidth -
          (filterLimit.offsetWidth - filterLimitWidth)
      );
    }
  }, [maxPage, page]);

  const handleNext = () => {
    setPage((page) => Math.min(page + 1, maxPage));
  };

  const handlePrev = () => {
    setPage((page) => Math.max(page - 1, 1));
  };

  return (
    <FilterLimit ref={filterLimitRef}>
      {page > 1 && (
        <div className="iconBox">
          <Icon className="icon" fontSize="30px" onClick={handlePrev}>
            <CiCircleChevLeft />
          </Icon>
        </div>
      )}
      <Filters translateWidth={translateWidth} ref={filterRef}>
        {filters.map((filter, index) => (
          <Filter key={index} filter={filter} />
        ))}
      </Filters>
      {page < maxPage && (
        <div className="iconBox">
          <Icon className="icon" fontSize="30px" onClick={handleNext}>
            <CiCircleChevRight />
          </Icon>
        </div>
      )}
    </FilterLimit>
  );
}

export default HotelsFilters;
