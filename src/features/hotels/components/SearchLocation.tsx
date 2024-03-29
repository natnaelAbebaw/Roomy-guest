import SearchLocationResult from "../../../ui/SearchLocationResult";
import { geocodeStartingWith } from "../../../services/golocationApi";
import { useState } from "react";
import Input from "../../../ui/Input";
import { useClickOutside } from "../CustomHooks/useClickOutside";

type SearchLocationProps = {
  selectedLocation: {
    city: string;
    country: string;
  };
  setSelectedLocation: (location: { city: string; country: string }) => void;
  locationQuery: string;
  setLocationQuery: (query: string) => void;
};
function SearchLocation({
  selectedLocation,
  setSelectedLocation,
  locationQuery,
  setLocationQuery,
}: SearchLocationProps) {
  const [locations, setLocations] = useState([]);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setLocationQuery(e.target.value);
    const locations = await geocodeStartingWith(e.target.value);
    console.log("city", selectedLocation);
    setLocations(locations);
    setSelectedLocation({
      city: "",
      country: "",
    });
  }
  const {
    clickState: showResults,
    setClickState: setShowResults,
    ref,
  } = useClickOutside<HTMLDivElement>();
  return (
    <>
      <Input
        type="text"
        id="Locations"
        placeholder="Where are you going?"
        autoComplete="off"
        value={locationQuery}
        onChange={handleSearch}
        onFocus={() => setShowResults(true)}
        onClick={() => setShowResults(true)}
      />
      {showResults && (
        <SearchLocationResult
          onShowResults={setShowResults}
          locations={locations}
          onSelectLocation={setSelectedLocation}
          onChangeQuery={setLocationQuery}
          elementRef={ref}
        />
      )}
    </>
  );
}

export default SearchLocation;
