import styled from "styled-components";
import { HiChevronDown } from "react-icons/hi2";
import { useClickOutside } from "../features/hotels/CustomHooks/useClickOutside";
import PopupBox from "./PopupBox";

type DropDownProps = {
  dropDownList: { label: string; value: number | string }[];
  selected: { label: string; value: number | string };
  onSelected: (slected: { label: string; value: number | string }) => void;
};

const StyleDownDrop = styled.div`
  position: relative;
`;

const SelectButton = styled.div`
  display: flex;
  padding: 0 1.6rem;
  gap: 3rem;
  align-items: center;
`;
const StyleList = styled.div`
  padding: 8px 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledPopupBox = styled(PopupBox)`
  width: fit-content;
  padding: 5px;
  top: 110%;
`;
export default function DropDown({
  dropDownList,
  selected,
  onSelected,
}: DropDownProps) {
  const {
    clickState: showDropdown,
    setClickState: setShowDropdown,
    ref,
  } = useClickOutside<HTMLDivElement>();
  return (
    <StyleDownDrop>
      <SelectButton onClick={() => setShowDropdown(!showDropdown)}>
        <span>{selected.label}</span>
        <HiChevronDown />
      </SelectButton>
      {showDropdown && (
        <StyledPopupBox ref={ref}>
          {dropDownList.map((item, index) => (
            <StyleList
              key={index}
              onClick={() => {
                onSelected(item);
                setShowDropdown(false);
              }}
            >
              {item.label}
            </StyleList>
          ))}
        </StyledPopupBox>
      )}
    </StyleDownDrop>
  );
}
