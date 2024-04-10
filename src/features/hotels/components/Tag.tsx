import styled, { css } from "styled-components";
import Icon from "../../../ui/Icon";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
};

const StyledTag = styled.div<StyledTagProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  color: var(--color-grey-600);
  flex-shrink: 0;
  gap: 8px;
  position: relative;
  cursor: pointer;

  & > div {
    font-size: 1.4rem;
    font-weight: 200;
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
    bottom: -1.83rem;
    transition: all 0.3s;
    left: 0;
    z-index: 500;
  }

  ${(props) =>
    props.active &&
    css`
      color: var(--color-grey-900);
      font-weight: 700;
      animation: scale 0.3s;
      &::after {
        width: 100%;
        background-color: #000;
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
      active={selectedTag ? `${selectedTag}` : undefined}
      onClick={() => setSelectedTag((s) => !s)}
    >
      <Icon>{icon}</Icon>
      <div>{name}</div>
    </StyledTag>
  );
}
