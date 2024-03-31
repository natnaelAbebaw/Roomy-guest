import styled, { css } from "styled-components";
import HotelCard from "./HotelCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useQuery } from "react-query";
import { Hotel, getHotels, searchHotels } from "../../../services/hotelApi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HotelShimmerEffect from "./HotelShimmerEffect";
type HotelsBoxProps = {
  isSticky: boolean;
};

const HotelsBox = styled.div<HotelsBoxProps>`
  ${(props) =>
    props.isSticky
      ? css`
          margin-top: 20rem;
        `
      : css`
          margin-top: 30rem;
        `}

  padding: 3rem 10rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  justify-content: center;
  /* justify-items: center; */
  column-gap: 2rem;
  row-gap: 4rem;
  position: relative;
`;

function Hotels() {
  const { isSticky } = useSelector((state: RootState) => state.hotels);
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuerys] = useState({
    country: "",
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  useEffect(() => {
    setSearchQuerys({
      country: searchParams.get("country") || "",
      city: searchParams.get("city") || "",
      checkIn: searchParams.get("checkinDate") || "",
      checkOut: searchParams.get("checkoutDate") || "",
      guests: searchParams.get("numGuests") || "",
    });
    console.log("searchParams", searchParams.toString());
  }, [searchParams]);

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["hotels", searchQuery],
    queryFn: () =>
      searchQuery.checkIn === "" ||
      searchQuery.checkIn === "" ||
      searchQuery.city == "" ||
      searchQuery.country == "" ||
      searchQuery.guests == ""
        ? getHotels()
        : searchHotels(searchQuery),
  });

  if (isLoading) return <HotelShimmerEffect />;
  return (
    <HotelsBox isSticky={isSticky}>
      {hotels?.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </HotelsBox>
  );
}

export default Hotels;
