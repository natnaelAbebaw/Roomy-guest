import SearchLocationResult from "../../../ui/SearchLocationResult";
import { geocodeStartingWith } from "../../../services/golocationApi";
import { useState } from "react";
import Input from "../../../ui/Input";
import { useClickOutside } from "../../../CustomHooks/useClickOutside";
import { Color, Font, Spacing } from "../../../ui/cssConstants";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../../../context/GlobalContext";
import { FontWeight } from "../../../ui/Text";
import { Length } from "../../../ui/Container";

type SearchLocationProps = {
  selectedLocation: {
    city: string;
    country: string;
  };
  setSelectedLocation: (location: { city: string; country: string }) => void;
  locationQuery: string;
  setLocationQuery: (query: string) => void;
  setOnFocus: React.Dispatch<React.SetStateAction<boolean>>;
};
function SearchLocation({
  setOnFocus,
  selectedLocation,
  setSelectedLocation,
  locationQuery,
  setLocationQuery,
}: SearchLocationProps) {
  const [locations, setLocations] = useState([]);
  const { searchFormState } = useGlobalContext();

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
        onFocusCapture={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        type="text"
        width={Length.fitContent}
        id="Locations"
        placeholder={"Search destinations"}
        autoComplete="off"
        value={locationQuery}
        onChange={handleSearch}
        bg={Color.transparent}
        fontSize={
          searchFormState === SearchFormActionType.stickyOnTop
            ? Font.fs14
            : Font.fs14
        }
        fontWeight={FontWeight.Medium100}
        onFocus={() => setShowResults(true)}
        onClick={() => setShowResults(true)}
        padding={[Spacing.s32, Spacing.s32, Spacing.s12]}
        borderRadius={Spacing.s48}
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
