import styled, { css } from "styled-components";
import HotelCard from "./HotelCard";
import { useInfiniteQuery } from "react-query";
import { searchHotels } from "../../../services/hotelApi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HotelShimmer from "./HotelShimmerEffect";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../../../context/GlobalContext";
import { useInView } from "react-intersection-observer";
type HotelsProps = {
  searchFormState: SearchFormActionType | undefined;
};

const HotelsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(30rem, 1fr));
  justify-content: center;
  column-gap: 2rem;
  row-gap: 4rem;
  position: relative;
  margin-bottom: 4rem;
`;

const StyledHotel = styled.div<HotelsProps>`
  padding: 3rem 10rem 7rem;

  ${(props) =>
    props.searchFormState === SearchFormActionType.stickyOnTop
      ? css`
          /* margin-top: 25rem; */
          padding-top: 20rem;
        `
      : css`
          margin-top: 10rem;
        `}
`;

function Hotels() {
  const { searchFormState } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const { ref, inView } = useInView();
  const hotelsBoxRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuerys] = useState<{
    [key: string]: string | number;
  }>({});

  useEffect(() => {
    const query: { [key: string]: string | number } = {};
    if (searchFormState === SearchFormActionType.stickyOnTop)
      window.scrollTo(0, 5);

    for (const [key, value] of searchParams.entries()) {
      if (query[key]) {
        query[key] = `${query[key]},${value}`;
      } else {
        query[key] = value;
      }
    }
    setSearchQuerys(query);
  }, [searchParams]);

  const {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isLoading,
    data: hotels,
  } = useInfiniteQuery({
    queryKey: ["hotels", searchQuery],
    queryFn: ({ pageParam = 1 }) => searchHotels(searchQuery, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("ok");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) return <div>Something went wrong</div>;

  return (
    <StyledHotel searchFormState={searchFormState}>
      <HotelsBox ref={hotelsBoxRef}>
        {isLoading
          ? new Array(12)
              .fill(12)
              .map((_, index) => <HotelShimmer key={index} />)
          : hotels?.pages?.map((hotel, i) => {
              if (i === hotels.pages.length - 1) {
                return hotel.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} ref={ref} />
                ));
              }
              return hotel.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ));
            })}
        {isFetchingNextPage &&
          new Array(20).fill(20).map((_, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <HotelShimmer />
                </div>
              );
            }

            return <HotelShimmer key={index} />;
          })}
      </HotelsBox>
    </StyledHotel>
  );
}

export default Hotels;
