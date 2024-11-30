import { useClickOutside } from "../CustomHooks/useClickOutside";
import Input from "./Input";
import PopupBox from "./PopupBox";
import styled from "styled-components";
import GuestPickerDialog from "./GuestPickerDialog";
import { Color, Font, Spacing } from "./cssConstants";
import Flex from "./Flex";

import {
  SearchFormActionType,
  useGlobalContext,
} from "../context/GlobalContext";
import { Length } from "./Container";
import { useEffect } from "react";
import { FontWeight } from "./Text";

type GuestPickerProps = {
  numOfGuests: number;
  onChangeNumOfGuests: (guest: number | ((s: number) => number)) => void;
  setOnFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledGuestPicker = styled.div`
  position: relative;
  width: 100%;
`;

const StylePopupBox = styled(PopupBox)`
  border-radius: 2.4rem;
  top: 116%;
  width: 100%;
`;

function GuestPicker({
  onChangeNumOfGuests,
  numOfGuests,
  setOnFocus,
}: GuestPickerProps) {
  const {
    clickState: showGuestPicker,
    setClickState: setShowGuestPicker,
    ref,
  } = useClickOutside<HTMLDivElement>();
  const { searchFormState } = useGlobalContext();

  useEffect(() => {
    if (showGuestPicker) {
      setOnFocus?.(true);
    } else {
      setOnFocus?.(false);
    }
  }, [showGuestPicker, setOnFocus]);
  return (
    <StyledGuestPicker>
      <Flex
        onClick={() => setShowGuestPicker(true)}
        onFocus={() => setShowGuestPicker(true)}
      >
        <Input
          width={Length.Full}
          type="text"
          borderRadius={Spacing.s48}
          value={`${numOfGuests} Guests`}
          readOnly
          id="guests"
          bg={Color.transparent}
          padding={[Spacing.s32, Spacing.s64, Spacing.s12, Spacing.s32]}
          fontSize={
            searchFormState === SearchFormActionType.stickyOnTop
              ? Font.fs14
              : Font.fs14
          }
          fontWeight={FontWeight.Medium100}
        />
        {/* <StyledFaAngleDown className="down" /> */}
      </Flex>
      {showGuestPicker && (
        <StylePopupBox ref={ref}>
          <GuestPickerDialog
            numOfGuests={numOfGuests}
            onChangeNumOfGuests={onChangeNumOfGuests}
          />
        </StylePopupBox>
      )}
    </StyledGuestPicker>
  );
}

export default GuestPicker;
