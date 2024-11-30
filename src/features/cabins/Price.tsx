import { useSearchParams } from "react-router-dom";
import CheckBox from "../../ui/CheckBox";
import Flex, { FlexAlign, FlexDirection } from "../../ui/Flex";
import Text, { FontWeight } from "../../ui/Text";
import { Font, Spacing } from "../../ui/cssConstants";
import { useEffect, useState } from "react";
import { QueryParams } from "../hotels/components/queryParams";
import moment from "moment";
import { Cabin } from "../../services/cabinApi";

function Price({
  cabin,
  breakfastPrice,
  breakFast,
  setBreakfast,
}: {
  cabin?: Cabin;
  breakfastPrice?: number;
  breakFast: boolean;
  setBreakfast: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchParams] = useSearchParams();
  const [numberOfNight, setNumberOfNight] = useState(
    searchParams.has(QueryParams.checkoutDate) &&
      searchParams.has(QueryParams.checkinDate)
      ? moment(searchParams.get(QueryParams.checkoutDate)).diff(
          moment(searchParams.get(QueryParams.checkinDate)),
          "days"
        )
      : 2
  );

  useEffect(() => {
    if (
      searchParams.has(QueryParams.checkoutDate) &&
      searchParams.has(QueryParams.checkinDate)
    ) {
      setNumberOfNight(
        moment(searchParams.get(QueryParams.checkoutDate)).diff(
          moment(searchParams.get(QueryParams.checkinDate)),
          "days"
        )
      );
    }
  }, [searchParams]);

  return (
    <Flex gap={Spacing.s4} direction={FlexDirection.Column}>
      <CheckBox onClick={(e) => e.stopPropagation()}>
        <label htmlFor={cabin?._id ? cabin._id : cabin?.cabinType}>
          <input
            checked={breakFast}
            onChange={(e) => {
              e.stopPropagation();
              setBreakfast(e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            id={cabin?._id ? cabin._id : cabin?.cabinType}
          />
          <span></span>
          <Text fontWeight={FontWeight.Medium} fontSize={Font.fs14}>
            Breakfast included
          </Text>
        </label>
      </CheckBox>
      <Flex gap={Spacing.s4}>
        <Flex align={FlexAlign.Center}>
          <Text fontWeight={FontWeight.Medium}>
            ${cabin?.regularPrice?.toFixed(0)} Night
          </Text>
          <Text fontWeight={FontWeight.Medium} fontSize={Font.fs10}>
            &bull;
          </Text>
          <Text fontWeight={FontWeight.Medium}>
            $
            {(
              (cabin?.regularPrice ? cabin.regularPrice : 1) * numberOfNight +
              (breakFast ? breakfastPrice! : 0)
            ).toFixed(0)}{" "}
            Total{" "}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Price;
