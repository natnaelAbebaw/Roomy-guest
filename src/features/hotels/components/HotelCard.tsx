import { IoMdStar } from "react-icons/io";
import styled from "styled-components";
import { Hotel } from "../../../services/hotelApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QueryParams } from "./queryParams";
import moment from "moment";
import { LegacyRef, forwardRef } from "react";
import ImageCarousel from "../../../ui/ImageCarousel";
import Text, { FontWeight } from "../../../ui/Text";
import { Font } from "../../../ui/cssConstants";
import Flex, { FlexAlign } from "../../../ui/Flex";

const StyledHotelCard = styled.div`
  width: 30rem;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
  & h2 {
    font-size: 1.6rem;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & address {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 1rem;
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
  & > .imgBox {
    height: 28rem;
    border-radius: 1rem;
    object-fit: cover;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  & > .HeadingBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > .HeadingBox > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  & .price {
    font-size: 1.6rem;
    color: var(--color-grey-700);
    font-weight: 500;
  }
`;

const HotelCard = forwardRef(function HotelCard(
  props: { hotel: Hotel },
  ref?: LegacyRef<HTMLDivElement> | null
) {
  const hotel: Hotel = props.hotel;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  function handleLinkToHotelDetails() {
    let query = "?";
    if (searchParams.has(QueryParams.city)) {
      query += `${QueryParams.city}=${searchParams.get(QueryParams.city)}&`;
    }
    if (searchParams.has(QueryParams.country)) {
      query += `${QueryParams.country}=${searchParams.get(
        QueryParams.country
      )}&`;
    }
    if (searchParams.has(QueryParams.checkinDate)) {
      query += `${QueryParams.checkinDate}=${searchParams.get(
        QueryParams.checkinDate
      )}&`;
    } else {
      query += `${QueryParams.checkinDate}=${moment().format("YYYY-MM-DD")}&`;
    }
    if (searchParams.has(QueryParams.checkoutDate)) {
      query += `${QueryParams.checkoutDate}=${searchParams.get(
        QueryParams.checkoutDate
      )}&`;
    } else {
      query += `${QueryParams.checkoutDate}=${moment()
        .add(2, "days")
        .format("YYYY-MM-DD")}&`;
    }
    if (searchParams.has(QueryParams.numGuests)) {
      query += `${QueryParams.numGuests}=${searchParams.get(
        QueryParams.numGuests
      )}&`;
    } else {
      query += `${QueryParams.numGuests}=${1}&`;
    }

    navigate(`/hotels/${hotel.id}${query}`, { replace: true });
    window.scrollTo(0, 0);
  }

  return (
    <StyledHotelCard
      onClick={handleLinkToHotelDetails}
      ref={ref ? ref : undefined}
    >
      {/* <div className="imgBox">
        <img src={hotel.mainImage} />
      </div> */}

      <ImageCarousel images={hotel.albumImages} />

      <div className="HeadingBox">
        <h2>{hotel.name}</h2>
        <Flex align={FlexAlign.Center}>
          <IoMdStar fontSize={Font.fs18} />{" "}
          <Text fontWeight={FontWeight.Medium}>{hotel.ratingAverage}</Text>
        </Flex>
      </div>
      <Text fontSize={Font.fs14}>{hotel.address}</Text>
      <Text fontSize={Font.fs16} fontWeight={FontWeight.Medium}>
        ${hotel.priceRange.min} night-$480 total
      </Text>
    </StyledHotelCard>
  );
});

export default HotelCard;
