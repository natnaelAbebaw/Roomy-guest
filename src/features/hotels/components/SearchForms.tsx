import styled, { css } from "styled-components";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import SearchLocation from "./SearchLocation";

import GuestPicker from "../../../ui/GuestPicker";
import Button from "../../../ui/Button";
import CustomDatePicker from "../../../ui/DatePicker";

import { Color, Font, Spacing } from "../../../ui/cssConstants";
import { QueryParams } from "./queryParams";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../../../ui/Flex";
import Container, { BoxShadow, Length, Position } from "../../../ui/Container";
import Text, { DisplayType, FontWeight } from "../../../ui/Text";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../../../context/GlobalContext";
import Positioned from "../../../ui/Positioned";
import { IoSearch } from "react-icons/io5";

type SearchFormProps = {
  formState: SearchFormActionType;
};

const StyledForm = styled.form<SearchFormProps>`
  ${(props) =>
    props.formState === SearchFormActionType.stickyOnTop &&
    css`
      & .DateInput_input,
      & .DateInput_input::placeholder {
        font-size: 1.4rem;
      }
      & .DateInput {
        width: 8rem;
      }
    `}/* border: 1px solid var(--color-grey-300); */
  /* border-radius: 1rem; */
`;

function SearchForm({
  // formState,
  setWdith,
}: {
  // formState: SearchFormActionType;
  setWdith: (width: number) => void;
}) {
  const [numOfGuests, setNumOfGuests] = useState(1);
  const { searchFormState: formState, dispatch } = useGlobalContext();

  const [locationQuery, setLocationQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    city: "",
    country: "",
  });
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLButtonElement>(null);

  const [onFocus, setOnFocus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    searchParams.has(QueryParams.city) && searchParams.has(QueryParams.country)
      ? setLocationQuery(
          `${searchParams.get(QueryParams.city)},${searchParams.get(
            QueryParams.country
          )}`
        )
      : setLocationQuery("");
    searchParams.has("checkinDate")
      ? setStartDate(moment(searchParams.get("checkinDate")))
      : setStartDate(null);

    searchParams.has("checkoutDate")
      ? setEndDate(moment(searchParams.get("checkoutDate")))
      : setEndDate(null);

    searchParams.has("numGuests")
      ? setNumOfGuests(parseInt(searchParams.get("numGuests")!))
      : setNumOfGuests(1);
  }, [searchParams]);

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    navigate("/", { replace: true });
    dispatch?.(SearchFormActionType.stickyOnTop);
    // window.scrollTo(0, 520);

    if (!locationQuery) {
      alert("Please enter a location");
      return;
    }

    if (!selectedLocation.city || !selectedLocation.country) {
      setSelectedLocation({
        city: locationQuery.split(",")[0],
        country: locationQuery.split(",")[1],
      });
    }

    if (!startDate) {
      console.log("startDate", startDate);
      setStartDate(moment());
    }
    if (!endDate) {
      setEndDate(moment().add(2, "day"));
    }

    const newSearchParams = new URLSearchParams();

    newSearchParams.set("city", locationQuery.split(",")[0]);
    newSearchParams.set("country", locationQuery.split(",")[1]);
    newSearchParams.set("checkinDate", startDate!.format("YYYY-MM-DD"));
    newSearchParams.set("checkoutDate", endDate!.format("YYYY-MM-DD"));
    newSearchParams.set("numGuests", numOfGuests.toString());

    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    if (ref1.current && ref2.current && ref3.current && ref4.current) {
      setWdith(
        ref1.current.offsetWidth +
          ref2.current.offsetWidth +
          ref3.current.offsetWidth +
          ref4.current.offsetWidth +
          107
      );
    }
  }, [formState, setWdith, ref1, ref2, ref3, ref4]);

  return (
    <StyledForm formState={formState} action="" onSubmit={onSubmit}>
      <Container
        onClick={() => {
          if (formState !== SearchFormActionType.normal) {
            dispatch?.(SearchFormActionType.hangOnTop);
          }
        }}
        ref={ref}
        boxShadow={
          !(formState === SearchFormActionType.normal)
            ? BoxShadow.Normal
            : BoxShadow.Default
        }
        borderRadius={Spacing.s48}
        border={
          formState === SearchFormActionType.normal ? Spacing.s1 : Spacing.s1
        }
        borderColor={Color.grey200}
        width={Length.Full}
        padding={
          formState === SearchFormActionType.stickyOnTop
            ? [Spacing.s8, Spacing.s24]
            : [Spacing.s4, Spacing.s6]
        }
        // padding={[Spacing.s4, Spacing.s4]}
        position={Position.relative}
        zIndex={6}
        bg={
          onFocus && formState !== SearchFormActionType.stickyOnTop
            ? Color.grey100
            : Color.grey0
        }
      >
        <Flex
          align={FlexAlign.Center}
          gap={Spacing.s24}
          justify={
            formState === SearchFormActionType.stickyOnTop
              ? FlexJustify.SpaceBetween
              : FlexJustify.SpaceBetween
          }
        >
          <Container position={Position.relative} width={Length.fitContent}>
            <Flex
              direction={FlexDirection.Column}
              gap={Spacing.zero}
              width={
                formState === SearchFormActionType.stickyOnTop
                  ? Length.Auto
                  : Length.Full
              }
            >
              <Positioned
                position={
                  formState === SearchFormActionType.stickyOnTop
                    ? Position.static
                    : Position.absolute
                }
                top={Spacing.s12}
                left={Spacing.s32}
              >
                <Container
                  bR={
                    formState === SearchFormActionType.stickyOnTop
                      ? Spacing.s1
                      : Spacing.zero
                  }
                  padding={
                    formState === SearchFormActionType.stickyOnTop
                      ? [Spacing.zero, Spacing.s24, Spacing.zero, Spacing.zero]
                      : [Spacing.zero]
                  }
                  ref={ref1}
                >
                  <label htmlFor="Locations">
                    <Text
                      fontWeight={FontWeight.Medium}
                      fontSize={Font.fs14}
                      width={Length.maxContent}
                    >
                      {formState === SearchFormActionType.stickyOnTop &&
                      searchParams.has(QueryParams.city)
                        ? searchParams.get(QueryParams.city)
                        : formState === SearchFormActionType.stickyOnTop
                        ? "Anywhere"
                        : "Where"}
                    </Text>
                  </label>
                </Container>
              </Positioned>
              {!(formState === SearchFormActionType.stickyOnTop) && (
                <SearchLocation
                  setOnFocus={setOnFocus}
                  setSelectedLocation={setSelectedLocation}
                  locationQuery={locationQuery}
                  setLocationQuery={setLocationQuery}
                  selectedLocation={selectedLocation}
                />
              )}
            </Flex>
          </Container>

          {formState !== SearchFormActionType.stickyOnTop && (
            <Container
              style={{ flexShrink: "0" }}
              bg={Color.grey200}
              width={"0.7px"}
              height={Spacing.s48}
            />
          )}
          <Container position={Position.relative}>
            <Flex
              direction={FlexDirection.Column}
              gap={Spacing.zero}
              width={
                !(formState === SearchFormActionType.stickyOnTop)
                  ? Length.Full
                  : Length.Auto
              }
            >
              <Positioned zIndex={2} top={Spacing.s10} left={Length.L16}>
                {formState !== SearchFormActionType.stickyOnTop && (
                  <Container
                    bg={Color.grey200}
                    width={"0.4px"}
                    height={Spacing.s48}
                  />
                )}
              </Positioned>
              <Positioned
                position={
                  formState === SearchFormActionType.stickyOnTop
                    ? Position.static
                    : Position.absolute
                }
                zIndex={2}
                top={Spacing.s12}
                left={Spacing.s32}
              >
                <label htmlFor="startDate">
                  <Container
                    bR={
                      formState === SearchFormActionType.stickyOnTop
                        ? Spacing.s1
                        : Spacing.zero
                    }
                    padding={
                      formState === SearchFormActionType.stickyOnTop
                        ? [
                            Spacing.zero,
                            Spacing.s24,
                            Spacing.zero,
                            Spacing.zero,
                          ]
                        : [Spacing.zero]
                    }
                    ref={ref2}
                  >
                    <Text
                      fontWeight={FontWeight.Medium}
                      fontSize={Font.fs14}
                      width={Length.maxContent}
                    >
                      {formState === SearchFormActionType.stickyOnTop &&
                      searchParams.has(QueryParams.checkinDate) &&
                      searchParams.has(QueryParams.checkinDate)
                        ? moment(
                            searchParams.get(QueryParams.checkinDate)
                          ).format("MMM") ===
                          moment(
                            searchParams.get(QueryParams.checkoutDate)
                          ).format("MMM")
                          ? `${moment(
                              searchParams.get(QueryParams.checkinDate)
                            ).format("MMM")} ${moment(
                              searchParams.get(QueryParams.checkinDate)
                            ).format("DD")} - ${moment(
                              searchParams.get(QueryParams.checkoutDate)
                            ).format("DD")}`
                          : `${moment(
                              searchParams.get(QueryParams.checkinDate)
                            ).format("MMM")} ${moment(
                              searchParams.get(QueryParams.checkinDate)
                            ).format("DD")} - ${moment(
                              searchParams.get(QueryParams.checkoutDate)
                            ).format("MMM")} ${moment(
                              searchParams.get(QueryParams.checkoutDate)
                            ).format("DD")}`
                        : formState === SearchFormActionType.stickyOnTop
                        ? "Any Week"
                        : "Check in"}
                    </Text>
                  </Container>
                </label>
              </Positioned>
              {formState !== SearchFormActionType.stickyOnTop && (
                <Positioned zIndex={2} top={Spacing.s12} left={"20.2rem"}>
                  <label htmlFor="endDate">
                    <Container bR={Spacing.zero} padding={[Spacing.zero]}>
                      <Text
                        fontWeight={FontWeight.Medium}
                        fontSize={Font.fs14}
                        width={Length.maxContent}
                      >
                        Check out
                      </Text>
                    </Container>
                  </label>
                </Positioned>
              )}

              {!(formState === SearchFormActionType.stickyOnTop) && (
                <CustomDatePicker
                  setOnFocus={setOnFocus}
                  startDate={startDate!}
                  setStartDate={setStartDate}
                  endDate={endDate!}
                  setEndDate={setEndDate}
                />
              )}
            </Flex>
          </Container>
          {formState !== SearchFormActionType.stickyOnTop && (
            <Container
              style={{ flexShrink: "0" }}
              bg={Color.grey200}
              width={"0.7px"}
              height={Spacing.s48}
            />
          )}

          <Container position={Position.relative}>
            <Flex
              direction={FlexDirection.Column}
              gap={Spacing.zero}
              width={
                !(formState === SearchFormActionType.stickyOnTop)
                  ? Length.Full
                  : Length.Auto
              }
            >
              <Positioned
                position={
                  formState === SearchFormActionType.stickyOnTop
                    ? Position.static
                    : Position.absolute
                }
                zIndex={2}
                top={Spacing.s12}
                left={Spacing.s32}
              >
                <Container
                  ref={ref3}
                  padding={
                    formState === SearchFormActionType.stickyOnTop
                      ? [Spacing.zero]
                      : [Spacing.zero]
                  }
                >
                  <label htmlFor="guests">
                    <Text
                      fontWeight={FontWeight.Medium}
                      fontSize={Font.fs14}
                      width={Length.maxContent}
                    >
                      {formState === SearchFormActionType.stickyOnTop &&
                      searchParams.has(QueryParams.numGuests)
                        ? `${searchParams.get(QueryParams.numGuests)} Guests`
                        : "Who"}
                    </Text>
                  </label>
                </Container>
              </Positioned>

              {!(formState === SearchFormActionType.stickyOnTop) && (
                <GuestPicker
                  setOnFocus={setOnFocus}
                  onChangeNumOfGuests={setNumOfGuests}
                  numOfGuests={numOfGuests}
                />
              )}
            </Flex>
          </Container>

          <Positioned
            position={
              formState == SearchFormActionType.stickyOnTop
                ? Position.static
                : Position.absolute
            }
            right={Spacing.s12}
          >
            <Button
              type="submit"
              ref={ref4}
              fontSize={
                formState === SearchFormActionType.stickyOnTop
                  ? Font.fs14
                  : Font.fs16
              }
              color={Color.grey0}
              onFocus={() => setOnFocus(true)}
              borderRadius={
                onFocus && formState !== SearchFormActionType.stickyOnTop
                  ? Spacing.s48
                  : Spacing["s1/2"]
              }
              padding={
                formState == SearchFormActionType.stickyOnTop
                  ? [Spacing.s8]
                  : [Spacing.s16]
              }
            >
              <Flex gap={Spacing.s8} align={FlexAlign.Center}>
                <IoSearch
                  fontSize={
                    formState == SearchFormActionType.stickyOnTop
                      ? Font.fs16
                      : Font.fs20
                  }
                />

                <Text
                  fontSize={Font.fs18}
                  fontWeight={FontWeight.Medium}
                  color={Color.grey0}
                  display={
                    onFocus && formState !== SearchFormActionType.stickyOnTop
                      ? DisplayType.Block
                      : DisplayType.None
                  }
                >
                  Search
                </Text>
              </Flex>
            </Button>
          </Positioned>
        </Flex>
      </Container>
    </StyledForm>
  );
}

export default SearchForm;
