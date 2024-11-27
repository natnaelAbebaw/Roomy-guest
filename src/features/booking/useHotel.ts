import { useQuery } from "react-query";

import { getHotel } from "../../services/hotelApi";
// import { useAuth } from "../Authentication/AuthProvider";

export function useHotel(hotelId: string) {
  const { data: hotel, isLoading: isHotelLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getHotel(hotelId),
    onSuccess: () => {
      // toast.success("Room deleted successfully");
    },
  });

  return {
    hotel,
    isHotelLoading,
  };
}
