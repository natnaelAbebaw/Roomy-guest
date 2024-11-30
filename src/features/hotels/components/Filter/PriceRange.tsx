import styled from "styled-components";
import FilterBox from "../../../../ui/FilterBox";
import { GoDash } from "react-icons/go";
import Slider from "rc-slider";

const PriceBars = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-end;
  & > div:first-child {
    width: 100%;
    display: flex;
    height: 10rem;
    gap: 3px;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const PriceRangeBox = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding: 6rem 0 3rem;
  & .slider {
    position: relative;
    top: -0.7rem;
  }
`;

const PriceRangeUpperBox = styled.div`
  padding: 0 6rem;
`;

const PriceInputs = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  & input {
    padding: 1.5rem 1.5rem 0.7rem;
    border: none;
    border-radius: 5px;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 0;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);
    &:focus {
      outline: none;
      background-color: var(--color-grey-0);
    }
  }

  & label {
    position: absolute;
    top: 0;
    left: 1rem;
    padding: 0 0.5rem;
    font-size: 1.2rem;
    color: var(--color-grey-400);
  }
`;

type DivProps = {
  width: number;
};

const LeftDiv = styled.div<DivProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% * (${(props) => props.width}));
  height: 100%;
  background-color: var(--color-grey-0);
  opacity: 0.8;
`;

const RightDiv = styled.div<DivProps>`
  position: absolute;
  right: 0;
  top: 0;
  width: calc(100% * (${(props) => props.width}));
  height: 100%;
  background-color: var(--color-grey-0);
  opacity: 0.8;
`;

type PriceRangeProps = {
  children: React.ReactNode;
  minPrice?: number;
  maxPrice?: number;
  selectedPriceRange: number[];
  setSelectedPriceRange: (priceRange: number[]) => void;
};
function PriceRange({
  children,
  minPrice = 0,
  maxPrice = 500,
  selectedPriceRange,
  setSelectedPriceRange,
}: PriceRangeProps) {
  let [min, max] = [minPrice, maxPrice];

  if (selectedPriceRange[0] && selectedPriceRange[1]) {
    [min, max] = selectedPriceRange;
  }

  return (
    <FilterBox>
      <h2>Price Range</h2>
      <p>Nightly prices before fees and taxes</p>
      <PriceRangeUpperBox>
        <PriceRangeBox>
          <PriceBars>
            {children}

            <LeftDiv width={(min - minPrice) / (maxPrice - 100)} />
            <RightDiv width={(maxPrice - max) / (maxPrice - 100)} />
          </PriceBars>

          <Slider
            range
            className="slider"
            value={[min, max]}
            max={maxPrice}
            min={minPrice}
            defaultValue={[min, max]}
            onChange={(value: number[] | number) => {
              if (Array.isArray(value)) {
                setSelectedPriceRange(value);
              }
            }}
          />
        </PriceRangeBox>
        <PriceInputs>
          <InputBox>
            <label htmlFor="min">Minimum</label>
            <input
              type="number"
              id="min"
              value={min}
              onChange={(e) =>
                setSelectedPriceRange([
                  Number(e.target.value) < minPrice
                    ? minPrice
                    : Number(e.target.value),
                  max,
                ])
              }
            />
          </InputBox>

          <GoDash fontSize={"5rem"} color="var(--color-grey-400)" />
          <InputBox>
            <label htmlFor="max">Maximum</label>
            <input
              value={max}
              id="max"
              type="number"
              onChange={(e) =>
                setSelectedPriceRange([
                  min,
                  Number(e.target.value) > maxPrice
                    ? maxPrice
                    : Number(e.target.value),
                ])
              }
            />
          </InputBox>
        </PriceInputs>
      </PriceRangeUpperBox>
    </FilterBox>
  );
}

export default PriceRange;
