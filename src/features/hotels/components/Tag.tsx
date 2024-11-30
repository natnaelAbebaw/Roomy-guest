import styled, { css } from "styled-components";
import Icon from "../../../ui/Icon";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Color, Font } from "../../../ui/cssConstants";
import Text, { FontWeight } from "../../../ui/Text";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../../../context/GlobalContext";
type TagProps = {
  id: number;
  icon: React.ReactElement;
  name: string;
  key: string;
  operator: string;
  value: string | number;
};

type StyledTagProps = {
  active: string | undefined;
  searchFormState?: string | undefined;
};

const StyledTag = styled.div<StyledTagProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: max-content;
  color: var(--color-grey-500);
  flex-shrink: 0;
  gap: 8px;
  height: 8rem;
  position: relative;
  cursor: pointer;

  & > div {
    font-size: 1.4rem;
  }
  &:hover {
    color: var(--color-grey-900);
  }
  &:hover::after {
    background-color: var(--color-grey-400);
  }

  &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: var(--color-grey-0);
    position: absolute;
    bottom: 0;
    transition: all 0.3s;
    left: 0;
    z-index: 500;
  }

  ${(props) =>
    props.active &&
    css`
      color: ${Color.grey900};
      animation: scale 0.3s;
      &::after {
        width: 100%;
        background-color: ${Color.grey900};
      }
    `}

  @keyframes scale {
    0% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1);
    }
  }
`;

export default function Tag({ tag }: { tag: TagProps }) {
  const { icon, name, value } = tag;
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState(false);
  const { searchFormState } = useGlobalContext();
  useEffect(() => {
    const pf = [];
    for (const [key, value] of searchParams.entries()) {
      if (key === "popularfacilities[all]") {
        pf.push(value);
      }
    }
    setSelectedTag(pf.includes(value.toString()) || false);
  }, [searchParams, value]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedTag) {
      searchParams.delete(`${tag.key}[${tag.operator}]`, tag.value.toString());
    } else {
      if (searchParams.has(`${tag.key}[${tag.operator}]`)) {
        searchParams.append(
          `${tag.key}[${tag.operator}]`,
          tag.value.toString()
        );
      } else {
        searchParams.set(`${tag.key}[${tag.operator}]`, tag.value.toString());
      }
    }

    setSearchParams(searchParams, { replace: true });
  }, [selectedTag, setSearchParams, searchParams, tag, navigate]);
  return (
    <StyledTag
      searchFormState={searchFormState}
      active={selectedTag ? `${selectedTag}` : undefined}
      onClick={() => setSelectedTag((s) => !s)}
    >
      <Icon fontSize={Font.fs24}>{icon}</Icon>
      <Text
        color={selectedTag ? Color.grey800 : Color.grey600}
        fontSize={Font.fs12}
        fontWeight={FontWeight.Medium}
      >
        {name}
      </Text>
    </StyledTag>
  );
}
