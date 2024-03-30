import styled from "styled-components";
import Icon from "../../../ui/Icon";
type filter = {
  icon: React.ReactElement;
  name: string;
};

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  color: var(--color-grey-500);
  flex-shrink: 0;
  gap: 5px;

  & > div {
    font-size: 1.4rem;
    font-weight: 300;
  }
`;

export default function Filter({ filter }: { filter: filter }) {
  const { icon, name } = filter;
  return (
    <StyledFilter>
      <Icon>{icon}</Icon>
      <div>{name}</div>
    </StyledFilter>
  );
}
