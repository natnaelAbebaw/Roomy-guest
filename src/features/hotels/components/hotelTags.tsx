import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { CgGym } from "react-icons/cg";
import { GiHeatHaze, GiVideoConference } from "react-icons/gi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  IoBeerOutline,
  IoCarOutline,
  IoRestaurantOutline,
  IoWifiOutline,
} from "react-icons/io5";
import {
  MdBalcony,
  MdOutlineBusinessCenter,
  MdOutlineLocalLaundryService,
} from "react-icons/md";
import { PiBathtub, PiDog, PiElevator, PiSwimmingPool } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import styled from "styled-components";
import Icon from "../../../ui/Icon";
import { useEffect, useRef, useState } from "react";
import Tag from "./Tag";

const TagLimit = styled.div`
  width: min(80rem, 100%);
  position: relative;
  overflow-x: hidden;
  height: 9rem;
  display: flex;
  align-items: center;
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

const tags = [
  {
    id: 4,
    icon: <IoCarOutline />,
    name: "Free parking",
    key: "popularfacilities",
    operator: "all",
    value: "Free Parking",
  },

  {
    id: 6,
    icon: <IoRestaurantOutline />,
    name: "Restaurant",
    key: "popularfacilities",
    operator: "all",
    value: "Restaurant",
  },
  {
    id: 7,
    icon: <IoBeerOutline />,
    name: "Bar",
    key: "popularfacilities",
    operator: "all",
    value: "Bar/lounge",
  },
  {
    id: 8,
    icon: <IoWifiOutline />,
    name: "Free wifi",
    key: "popularfacilities",
    operator: "all",
    value: "Free Wi-Fi",
  },
  {
    id: 9,
    icon: <PiSwimmingPool />,
    name: "Pool",
    key: "popularfacilities",
    operator: "all",
    value: "Swimming Pool",
  },
  {
    id: 10,
    icon: <CgGym />,
    name: "Gym",
    key: "popularfacilities",
    operator: "all",
    value: "Gym",
  },
  {
    id: 11,
    icon: <PiBathtub />,
    name: "Spa",
    key: "popularfacilities",
    operator: "all",
    value: "Spa",
  },

  {
    id: 12,
    icon: <PiDog />,
    name: "Pets allowed",
    key: "popularfacilities",
    operator: "all",
    value: "Pets allowed",
  },
  {
    id: 13,
    icon: <HiOutlineUserGroup />,
    name: "Family rooms",
    key: "popularfacilities",
    operator: "all",
    value: "Family rooms",
  },
  {
    id: 14,
    icon: <TbAirConditioning />,
    name: "Air conditioning",
    key: "popularfacilities",
    operator: "all",
    value: "Air Conditioning",
  },

  {
    id: 15,
    icon: <GiHeatHaze />,
    name: "Heating",
    key: "popularfacilities",
    operator: "all",
    value: "Heating",
  },
  {
    id: 16,
    icon: <PiElevator />,
    name: "Elevator",
    key: "popularfacilities",
    operator: "all",
    value: "Elevator",
  },
  {
    id: 17,
    icon: <MdBalcony />,
    name: "Balcony",
    key: "popularfacilities",
    operator: "all",
    value: "Balcony",
  },
  {
    id: 18,
    icon: <MdOutlineLocalLaundryService />,
    name: "Laundry Service",
    key: "popularfacilities",
    operator: "all",
    value: "Laundry Service",
  },
  {
    id: 19,
    icon: <MdOutlineBusinessCenter />,
    name: "Business Center",
    key: "popularfacilities",
    operator: "all",
    value: "Business Center",
  },
  {
    id: 20,
    icon: <GiVideoConference />,
    name: "Conference room",
    key: "popularfacilities",
    operator: "all",
    value: "Conference room",
  },
];

type TagsProps = {
  translatewidth: number;
};
const Tags = styled.div<TagsProps>`
  display: flex;
  gap: 3rem;
  width: max-content;
  align-items: center;
  transform: translateX(calc(-${(props) => props.translatewidth}px));
  transition: transform 0.6s ease-in-out;
`;

function HotelsTags() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const tagRef = useRef<HTMLDivElement>(null);
  const tagLimitRef = useRef<HTMLDivElement>(null);
  const [translateWidth, setTranslateWidth] = useState(0);

  useEffect(() => {
    const tag = tagRef.current;
    const tagLimit = tagLimitRef.current;
    if (!tag || !tagLimit) return;
    const tagWidth = tag.offsetWidth;
    const tagLimitWidth = tagLimit.offsetWidth * 0.7;
    setMaxPage(Math.ceil(tagWidth / tagLimitWidth));

    if (tagLimitWidth < tagWidth - (page - 1) * tagLimitWidth) {
      setTranslateWidth(tagLimitWidth * (page - 1));
    } else {
      setTranslateWidth(
        tagLimitWidth * (page - 2) +
          tagWidth -
          (page - 1) * tagLimitWidth -
          (tagLimit.offsetWidth - tagLimitWidth)
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
    <TagLimit ref={tagLimitRef}>
      {page > 1 && (
        <div className="iconBox">
          <Icon className="icon" fontSize="30px" onClick={handlePrev}>
            <CiCircleChevLeft />
          </Icon>
        </div>
      )}
      <Tags translatewidth={translateWidth} ref={tagRef}>
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </Tags>
      {page < maxPage && (
        <div className="iconBox">
          <Icon className="icon" fontSize="30px" onClick={handleNext}>
            <CiCircleChevRight />
          </Icon>
        </div>
      )}
    </TagLimit>
  );
}

export default HotelsTags;
