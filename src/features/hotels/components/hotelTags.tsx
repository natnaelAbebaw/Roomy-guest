import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCloudyOutline, IoRestaurantOutline } from "react-icons/io5";

import {
  PiBalloon,
  PiBathtub,
  PiCoffee,
  PiDog,
  PiDoor,
  PiFire,
  PiPoliceCar,
  PiShoppingBag,
  PiTShirt,
  PiWifiNoneFill,
} from "react-icons/pi";
import Tag from "./Tag";
import Slider from "../../../ui/Slider";
import { FaAirbnb } from "react-icons/fa";
import { GoMoveToTop, GoScreenFull } from "react-icons/go";

const tags = [
  {
    id: 4,
    icon: <PiPoliceCar />,
    name: "Free parking",
    key: "popularfacilities",
    operator: "all",
    value: "Free Parking",
  },
  {
    id: 14,
    icon: <FaAirbnb />,
    name: "Air conditioning",
    key: "popularfacilities",
    operator: "all",
    value: "Air Conditioning",
  },

  {
    id: 15,
    icon: <PiFire />,
    name: "Heating",
    key: "popularfacilities",
    operator: "all",
    value: "Heating",
  },
  {
    id: 16,
    icon: <PiDoor />,
    name: "Elevator",
    key: "popularfacilities",
    operator: "all",
    value: "Elevator",
  },
  {
    id: 17,
    icon: <GoMoveToTop />,
    name: "Balcony",
    key: "popularfacilities",
    operator: "all",
    value: "Balcony",
  },
  {
    id: 18,
    icon: <PiTShirt />,
    name: "Laundry Service",
    key: "popularfacilities",
    operator: "all",
    value: "Laundry Service",
  },
  {
    id: 19,
    icon: <PiShoppingBag />,
    name: "Business Center",
    key: "popularfacilities",
    operator: "all",
    value: "Business Center",
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
    icon: <PiCoffee />,
    name: "Bar",
    key: "popularfacilities",
    operator: "all",
    value: "Bar/lounge",
  },
  {
    id: 8,
    icon: <PiWifiNoneFill />,
    name: "Free wifi",
    key: "popularfacilities",
    operator: "all",
    value: "Free Wi-Fi",
  },
  {
    id: 9,
    icon: <IoCloudyOutline />,
    name: "Pool",
    key: "popularfacilities",
    operator: "all",
    value: "Swimming Pool",
  },
  {
    id: 10,
    icon: <PiBalloon />,
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
    id: 19,
    icon: <PiShoppingBag />,
    name: "Business Center",
    key: "popularfacilities",
    operator: "all",
    value: "Business Center",
  },
  {
    id: 20,
    icon: <GoScreenFull />,
    name: "Conference room",
    key: "popularfacilities",
    operator: "all",
    value: "Conference room",
  },
];

function HotelsTags() {
  return (
    <Slider maxWidth="110rem">
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </Slider>
  );
}

export default HotelsTags;
