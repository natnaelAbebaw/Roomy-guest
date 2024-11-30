import { baseUrl } from "../constant";

type Location = {
  id: number;
  address: string;
  city: string;
  country: string;
};

export async function geocodeStartingWith(query: string) {
  const url = `${baseUrl}/searchLocation?q="${query}"`;

  try {
    const response = await fetch(url);
    const locations = await response.json();
    return locations["results"].map((location: Location) => ({
      id: location.id,
      address: location.address,
      city: location.city,
      country: location.country,
    }));
  } catch (error) {
    console.error("Error:", error);
    console.log("error");
    return [];
  }
}
