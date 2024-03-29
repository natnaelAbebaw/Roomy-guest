import axios from "axios";

type SearchParms = {
  country: string;
  city: string;
  checkIn: string;
  checkOut: string;
  guests: string;
};

export interface Hotel {
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
    zipcode: string;
    continent: string;
    coords: {
      lat: string;
      long: string;
    };
  };
  contacts: {
    email: string;
    phone: string;
    website: string;
  };
  currency: string;
  address: string;
  ratingAverage: number;
  regularPrice: number;
  countryISOCode: string;
  starRating: number;
  checkinTime: string;
  checkoutTime: string;
  discount: number;
  mainImage: string;
  albumImages: string[];
  facilities: string[];
  cabinTypes: string[];
  description: string;
  cancellationPolicy: string;
  cabinCount: number;
  priceRange: { min: number; max: number };
  additionalPolicies: string[];
  minBookingLength: number;
  maxBookingLength: number;
  popularfacilities: string[];
  breakFastPrice: number;
  hotelAccount: string;
  stripeAccountId: string;
  id: string;
}

export async function searchHotels(
  searchParams: SearchParms
): Promise<Hotel[]> {
  const { country, city, checkIn, checkOut, guests } = searchParams;

  const url = `http://127.0.0.1:8000/api/v1/hotels/q?city=${city}&country=${country}&checkinDate=${checkIn}&checkoutDate=${checkOut}&numGuests=${guests}`;

  const response = await axios.get(url);
  console.log("response", response.data.hotels, response.data.length);
  return response.data.hotels;
}

export async function getHotels(): Promise<Hotel[]> {
  console.log("ok");
  const url = "http://127.0.0.1:8000/api/v1/hotels";
  const response = await axios.get(url);
  console.log(response);
  return response.data.resourses;
}
