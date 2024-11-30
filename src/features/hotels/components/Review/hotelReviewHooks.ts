import { useInfiniteQuery, useQuery } from "react-query";
import {
  HotelReviewStat,
  getHotelRatingRanges,
  getHotelReview,
  gethotelReviewStat,
} from "../../../../services/hotelApi";

export function useHotelReviewStat(hotelId: string) {
  const {
    data: hotelReviewStat,
    isLoading: isHotelReviewStatLoading,
    ...rest
  } = useQuery<HotelReviewStat>({
    queryKey: ["hotelReviewStat", hotelId],
    queryFn: () => gethotelReviewStat(hotelId),
  });

  return { hotelReviewStat, isHotelReviewStatLoading, ...rest };
}

export function useHotelRatingRange(hotelId: string) {
  const {
    data: hotelRatingRanges,
    isLoading: isHotelRatingRangesLoading,
    ...rest
  } = useQuery<{ _id: number; count: number }[]>({
    queryKey: ["hotelRatingRanges", hotelId],
    queryFn: () => getHotelRatingRanges(hotelId),
  });
  return { hotelRatingRanges, isHotelRatingRangesLoading, ...rest };
}

export function useHotelReviews(hotelId: string) {
  const {
    data: hotelReviews,
    isLoading: isHotelReviewsLoading,
    ...rest
  } = useQuery({
    queryKey: ["hotelReviews", hotelId],
    queryFn: () => getHotelReview(hotelId, 1),
  });

  return { hotelReviews, isHotelReviewsLoading, ...rest };
}

export function useInfiniteHotelReview(searchQuery: {
  searchQuery: string;
  sortBy: { label: string; value: string };
  hotelId: string;
}) {
  const { data: hotelReviews, ...rest } = useInfiniteQuery({
    queryKey: ["infinityHotelReviews", searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getHotelReview(
        searchQuery.hotelId,
        pageParam,
        searchQuery.searchQuery,
        searchQuery.sortBy.value
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  return { hotelReviews, ...rest };
}
