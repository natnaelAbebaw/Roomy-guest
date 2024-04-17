import styled, { css } from "styled-components";
import FilterBox from "../../../../ui/FilterBox";

const rating = ["Any", "2+", "3+", "4+", "5+", "6+", "7+", "8+", "9+"];

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2rem;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  & h3 {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;
const TapBox = styled.div`
  display: flex;
  gap: 1rem;
`;

type TabValueProps = {
  active: string | undefined;
};

const TabValue = styled.div<TabValueProps>`
  padding: 8px 2.4rem;
  border-radius: 2rem;

  border: 1px solid var(--color-brand-200);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border: 1px solid var(--color-brand-700);
  }
  &:active {
    background-color: var(--color-brand-700);
    color: var(--color-grey-0);
  }
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-700);
      color: var(--color-grey-0);
    `}
`;

type RatingProps = {
  selectedRatingAverage: string;
  setSelectedRatingAverage: (value: string) => void;
  selectedStarRating: string;
  setSelectedStarRating: (value: string) => void;
  selectedBookingLength: string;
  setSelectedBookingLength: (value: string) => void;
};

function Rating({
  selectedRatingAverage,
  setSelectedRatingAverage,
  selectedStarRating,
  setSelectedStarRating,
  selectedBookingLength,
  setSelectedBookingLength,
}: RatingProps) {
  return (
    <FilterBox>
      <h2>Rating and booking length</h2>

      <Tabs>
        <Tab>
          <h3>Avarage rating</h3>
          <TapBox>
            {rating.map((rate) => (
              <TabValue
                key={rate}
                active={
                  selectedRatingAverage === rate
                    ? `${selectedRatingAverage}`
                    : undefined
                }
                onClick={() => setSelectedRatingAverage(rate)}
              >
                {rate}
              </TabValue>
            ))}
          </TapBox>
        </Tab>
        <Tab>
          <h3>Star rating</h3>
          <TapBox>
            {rating.map((rate) => (
              <TabValue
                key={rate}
                active={
                  selectedStarRating === rate
                    ? `${selectedStarRating}`
                    : undefined
                }
                onClick={() => setSelectedStarRating(rate)}
              >
                {rate}
              </TabValue>
            ))}
          </TapBox>
        </Tab>

        <Tab>
          <h3>Booking length</h3>
          <TapBox>
            {rating.map((rate) => (
              <TabValue
                key={rate}
                active={
                  selectedBookingLength === rate
                    ? `${selectedBookingLength}`
                    : undefined
                }
                onClick={() => setSelectedBookingLength(rate)}
              >
                {rate}
              </TabValue>
            ))}
          </TapBox>
        </Tab>
      </Tabs>
    </FilterBox>
  );
}

export default Rating;
