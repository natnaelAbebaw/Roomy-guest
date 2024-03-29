import { FaMapMarkerAlt } from "react-icons/fa";
import styled from "styled-components";
import PopupBox from "./PopupBox";

const StyledPopupBox = styled(PopupBox)`
  padding: 0;
`;
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
`;
const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 5px 1rem;
  border-radius: 3px;
  border-bottom: 1px solid var(--color-grey-100);
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const City = styled.div`
  font-size: 1.6rem;
`;

const Country = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

type Location = {
  id: number;
  city: string;
  country: string;
  address: string;
};

type SearchLocationResultProps = {
  onSelectLocation: (location: { city: string; country: string }) => void;
  onChangeQuery: (query: string) => void;
  locations: Location[];
  onShowResults: (value: boolean) => void;
  elementRef: React.RefObject<HTMLDivElement>;
};

function SearchLocationResult({
  locations,
  onSelectLocation,
  onChangeQuery,
  onShowResults,
  elementRef,
}: SearchLocationResultProps) {
  return (
    <StyledPopupBox ref={elementRef}>
      <StyledUl>
        {locations.map((location) => (
          <StyledLi
            key={location.id}
            onClick={() => {
              onSelectLocation(location);
              onChangeQuery(`${location.city},${location.country}`);
              onShowResults(false);
            }}
          >
            <FaMapMarkerAlt />
            <div>
              <City>{location.city}</City>
              <Country>{location.country}</Country>
            </div>
          </StyledLi>
        ))}
      </StyledUl>
    </StyledPopupBox>
  );
}

export default SearchLocationResult;
