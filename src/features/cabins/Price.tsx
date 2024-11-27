import { useSearchParams } from "react-router-dom";
import BorderBottom from "../../ui/Border";
import CheckBox from "../../ui/CheckBox";
import { Length } from "../../ui/Container";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../../ui/Flex";
import Heading, { HeadingElement } from "../../ui/Heading";
import Popup from "../../ui/Popup";
import Text from "../../ui/Text";
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
      <CheckBox>
        <label htmlFor={cabin?._id ? cabin._id : cabin?.cabinType}>
          <input
            checked={breakFast}
            onChange={(e) => {
              setBreakfast(e.target.checked);
            }}
            type="checkbox"
            id={cabin?._id ? cabin._id : cabin?.cabinType}
          />
          <span></span>
          <div>Breakfast</div>
        </label>
      </CheckBox>
      <Flex gap={Spacing.s4}>
        <Popup portal={false}>
          <Popup.Open>
            <Flex align={FlexAlign.Center}>
              <span>${cabin?.regularPrice?.toFixed(0)} Night</span>
              <Text fontSize={Font.fs10}>&bull;</Text>$
              {(
                (cabin?.regularPrice ? cabin.regularPrice : 1) * numberOfNight +
                (breakFast ? breakfastPrice! : 0)
              ).toFixed(0)}{" "}
              Total
            </Flex>
          </Popup.Open>
          <Popup.Window options={{ bottom: Spacing.s32, left: Spacing.zero }}>
            <Flex gap={Spacing.s4} direction={FlexDirection.Column}>
              <Heading fs={Font.fs16} mb={Spacing.zero} as={HeadingElement.H4}>
                Price details
              </Heading>
              <BorderBottom m={Spacing.s12} />
              <Flex direction={FlexDirection.Column} gap={Spacing.s8}>
                {new Array(numberOfNight).fill(0).map((_, i) => (
                  <Flex
                    key={i}
                    justify={FlexJustify.SpaceBetween}
                    gap={Spacing.s64}
                    width={Length.Full}
                  >
                    <span>
                      {searchParams.has(QueryParams.checkoutDate) &&
                        moment(searchParams.get(QueryParams.checkoutDate))
                          .add(i, "days")
                          .format("YYYY-MM-DD")}
                    </span>
                    <span>${cabin?.regularPrice?.toFixed(0)}</span>
                  </Flex>
                ))}
                {breakFast && (
                  <Flex
                    justify={FlexJustify.SpaceBetween}
                    gap={Spacing.s64}
                    width={Length.Full}
                  >
                    <span>Breakfast</span> <span>${breakfastPrice}</span>
                  </Flex>
                )}
              </Flex>
              <BorderBottom m={Spacing.s12} />
              <Flex
                width={Length.Full}
                justify={FlexJustify.SpaceBetween}
                gap={Spacing.s64}
              >
                <span>Total</span>
                <span>
                  $
                  {(
                    (cabin?.regularPrice ? cabin.regularPrice : 1) *
                      numberOfNight +
                    (breakFast ? breakfastPrice! : 0)
                  ).toFixed(0)}
                </span>
              </Flex>
            </Flex>
          </Popup.Window>
        </Popup>
      </Flex>
    </Flex>
  );
}

export default Price;
