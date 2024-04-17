import CheckBox from "../../../../ui/CheckBox";
import FilterBox from "../../../../ui/FilterBox";
import styled from "styled-components";

const amenities = [
  "Free Wi-Fi",
  "Free Parking",
  "Swimming Pool",
  "Gym",
  "Bar/lounge",
  "Restaurant",
  "Spa",
  "Air Conditioning",
  "Conference room",
  "Business Center",
  "Laundry Service",
  "Balcony",
  "Elevator",
  "Heating",
  "Family rooms",
  "Pets allowed",
];

const AminitiesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  gap: 1rem;
  margin-top: 3rem;
  & div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

type AminitiesProps = {
  selectedPopularFacilties: string[];
  setSelectedPopularFacilties: (value: string[]) => void;
};

function Aminities({
  selectedPopularFacilties,
  setSelectedPopularFacilties,
}: AminitiesProps) {
  return (
    <FilterBox>
      <h2>Aminities</h2>

      <AminitiesBox>
        {amenities.map((amenity) => (
          <CheckBox key={amenity}>
            <label htmlFor={amenity}>
              <input
                type="checkbox"
                id={amenity}
                name={amenity}
                checked={selectedPopularFacilties.includes(amenity)}
                onChange={(value) => {
                  if (!value.target.checked) {
                    setSelectedPopularFacilties(
                      selectedPopularFacilties.filter(
                        (item) => item !== amenity
                      )
                    );
                  } else {
                    setSelectedPopularFacilties([
                      ...selectedPopularFacilties,
                      amenity,
                    ]);
                  }
                }}
              />
              <span></span>
              <div>{amenity}</div>
            </label>{" "}
          </CheckBox>
        ))}
      </AminitiesBox>
    </FilterBox>
  );
}

export default Aminities;
