import styled from "styled-components";
import "rc-slider/assets/index.css";
import "./slider.css";
import RoomTypeFilter from "./RoomType";
import PriceRange from "./PriceRange";
import Rating from "./Rating";
import Aminities from "./Aminities";
import { useQuery } from "react-query";
import {
  HotelStats,
  PriceRangeType,
  getHotelPriceRanges,
  getHotelStats,
} from "../../../../services/hotelApi";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QueryParams } from "../queryParams";
import Heading, { HeadingElement } from "../../../../ui/Heading";
import Flex, { FlexAlign, FlexJustify } from "../../../../ui/Flex";
import { Length } from "../../../../ui/Container";
import { PulseLoader } from "react-spinners";
import { Color } from "../../../../ui/cssConstants";
const StyledFilter = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.4rem;
  & > h2 {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  & .bottomBar {
    display: flex;
    position: relative;
    padding: 1rem 4rem;
    gap: 1rem;
    border-top: 1px solid var(--color-grey-300);
    justify-content: space-between;
    & button:first-child {
      padding: 1rem;
      border: none;
      border-radius: 1rem;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: var(--color-grey-100);
      }
      &:active {
        background-color: var(--color-grey-100);
      }
    }

    & button:last-child {
      padding: 1rem 2rem;
      border: none;
      border-radius: 5px;
      color: var(--color-grey-0);
      background-color: var(--color-brand-700);
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 5px;
      &:hover {
        background-color: var(--color-brand-700);
      }
      &:active {
        background-color: var(--color-brand-700);
        color: var(--color-grey-0);
      }
    }
  }
`;

const Filters = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  height: 57rem;
  overflow-y: auto;
  & > div:not(:last-child) {
    padding: 2rem 0 4rem;
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

type PriceBarProps = {
  height: number;
  maxHeight: number;
};
const PriceBar = styled.div<PriceBarProps>`
  width: 100%;
  background-color: var(--color-brand-700);
  border-radius: 2px;
  transition: all 1s;
  height: calc(${(props) => (props.height / props.maxHeight) * 100}%);
`;

function Filter({ close }: { close?: () => void }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRoomType, setSelectedRoomType] = useState<string>(
    searchParams.get(QueryParams.cabinTypes) || "Any type"
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>(
    searchParams.has(QueryParams.minPriceRange) &&
      searchParams.has(QueryParams.maxPriceRange)
      ? [
          Number(searchParams.get(QueryParams.minPriceRange)),
          Number(searchParams.get(QueryParams.maxPriceRange)),
        ]
      : [0, 0]
  );

  const [selectedRatingAverage, setSelectedRatingAverage] = useState<string>(
    searchParams.get(QueryParams.ratingAverage)
      ? searchParams.get(QueryParams.ratingAverage) + "+"
      : "Any"
  );
  const [selectedStarRating, setSelectedStarRating] = useState<string>(
    searchParams.get(QueryParams.starRating)
      ? searchParams.get(QueryParams.starRating) + "+"
      : "Any"
  );
  const [selectedBookingLength, setSelectedBookingLength] = useState<string>(
    searchParams.get(QueryParams.maxBookingLength)
      ? searchParams.get(QueryParams.maxBookingLength) + "+"
      : "Any"
  );

  const [selectedPopularFacilties, setSelectedSelectedPopularFacilties] =
    useState<string[]>(parsePopularFacilities());
  const urlParmas = useMemo(() => {
    return {
      "cabinTypes[in]":
        searchParams.get(QueryParams.cabinTypes) || selectedRoomType,
      "priceRange.min[gte]": selectedPriceRange[0],
      "priceRange.max[lte]": selectedPriceRange[1],
      "ratingAverage[gte]": Number.parseInt(selectedRatingAverage),
      "starRating[gte]": Number.parseInt(selectedStarRating),
      "maxBookingLength[gte]": Number.parseInt(selectedBookingLength),
      "popularfacilities[all]": selectedPopularFacilties.join(","),
      city: searchParams.get(QueryParams.city) || "",
      country: searchParams.get(QueryParams.country) || "",
      checkinDate: searchParams.get(QueryParams.checkinDate) || "",
      checkoutDate: searchParams.get(QueryParams.checkoutDate) || "",
      numGuests: searchParams.get(QueryParams.numGuests) || "",
    };
  }, [
    searchParams,
    selectedBookingLength,
    selectedPopularFacilties,
    selectedPriceRange,
    selectedRatingAverage,
    selectedRoomType,
    selectedStarRating,
  ]);

  useEffect(() => {
    urlParmas["cabinTypes[in]"] = selectedRoomType;
    urlParmas["priceRange.min[gte]"] = selectedPriceRange[0];
    urlParmas["priceRange.max[lte]"] = selectedPriceRange[1];
    urlParmas["ratingAverage[gte]"] = Number.parseInt(selectedRatingAverage);
    urlParmas["starRating[gte]"] = Number.parseInt(selectedStarRating);
    urlParmas["maxBookingLength[gte]"] = Number.parseInt(selectedBookingLength);
    urlParmas["popularfacilities[all]"] = selectedPopularFacilties.join(",");
  }, [
    selectedRoomType,
    selectedPriceRange,
    selectedRatingAverage,
    selectedStarRating,
    selectedBookingLength,
    selectedPopularFacilties,
    urlParmas,
  ]);

  function parsePopularFacilities() {
    const popularFacilities = [];
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("popularfacilities")) {
        popularFacilities.push(...value.split(","));
      }
    }
    return popularFacilities;
  }

  const { data: hotelstats, isLoading: isHotelStatLoading } =
    useQuery<HotelStats>({
      queryKey: [
        "hotelStats",
        selectedRoomType,
        selectedPriceRange,
        selectedRatingAverage,
        selectedStarRating,
        selectedBookingLength,
        selectedPopularFacilties,
        urlParmas,
      ],
      queryFn: () => getHotelStats(urlParmas),
      keepPreviousData: true,
    });

  const { data: pricesStats, isLoading: isPriceStatLoading } =
    useQuery<PriceRangeType>({
      queryKey: ["hotelPriceRanges", selectedRoomType],
      queryFn: () => getHotelPriceRanges(selectedRoomType),
      keepPreviousData: true,
    });

  function reset() {
    if (!pricesStats) return;

    setSelectedRoomType("Any type");
    setSelectedPriceRange([pricesStats?.minPrice, pricesStats?.maxPrice]);
    setSelectedRatingAverage("Any");
    setSelectedStarRating("Any");
    setSelectedBookingLength("Any");
    setSelectedSelectedPopularFacilties([]);

    searchParams.delete(QueryParams.city);

    searchParams.delete(QueryParams.country);

    searchParams.delete(QueryParams.checkinDate);

    searchParams.delete(QueryParams.checkoutDate);

    searchParams.delete(QueryParams.numGuests);
    setSearchParams(searchParams);
  }

  function showFilterResults() {
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
    for (const key in urlParmas) {
      if (
        urlParmas[key as keyof typeof urlParmas] &&
        urlParmas[key as keyof typeof urlParmas] !== "Any type" &&
        urlParmas[key as keyof typeof urlParmas] !== "Any" &&
        urlParmas[key as keyof typeof urlParmas] !== ""
      )
        if (key === "popularfacilities[all]") {
          urlParmas[key]
            .toString()
            .split(",")
            .forEach((value) => newSearchParams.append(key, value));
        } else {
          newSearchParams.set(
            key,
            urlParmas[key as keyof typeof urlParmas].toString()
          );
        }
    }
    setSearchParams(newSearchParams);
    close?.();
  }

  if (isHotelStatLoading) {
    return (
      <Flex
        width={Length.Full}
        height={Length.L68}
        justify={FlexJustify.Center}
        align={FlexAlign.Center}
      >
        <PulseLoader color={Color.brand700} />
      </Flex>
    );
  }

  return (
    <StyledFilter>
      <Heading as={HeadingElement.H2}>Filter</Heading>
      <Filters>
        <RoomTypeFilter
          selectedRoomType={selectedRoomType}
          setSelectedRoomType={setSelectedRoomType}
        />

        <PriceRange
          minPrice={pricesStats?.minPrice}
          maxPrice={pricesStats?.maxPrice}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
        >
          <div>
            {pricesStats?.priceRanges.map((pricesStat, i) => (
              <PriceBar
                key={i}
                maxHeight={pricesStats.maxCount}
                height={pricesStat.count}
              />
            ))}
          </div>
        </PriceRange>

        <Rating
          selectedRatingAverage={selectedRatingAverage}
          setSelectedRatingAverage={setSelectedRatingAverage}
          selectedStarRating={selectedStarRating}
          setSelectedStarRating={setSelectedStarRating}
          selectedBookingLength={selectedBookingLength}
          setSelectedBookingLength={setSelectedBookingLength}
        />
        <Aminities
          selectedPopularFacilties={selectedPopularFacilties}
          setSelectedPopularFacilties={setSelectedSelectedPopularFacilties}
        />
      </Filters>
      <div className="bottomBar">
        <button onClick={reset}>Clear All</button>
        <button onClick={showFilterResults} disabled={isPriceStatLoading}>
          <span>Show</span>
          {hotelstats?.totalHotels ?? 0}
          <span>hotels</span>
        </button>
      </div>
    </StyledFilter>
  );
}

export default Filter;
