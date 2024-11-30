import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

export const TableHead = styled.thead`
  background-color: var(--color-grey-100);
`;

export const Td = styled.td`
  padding: 1rem;
`;
export const Th = styled.th`
  padding: 1rem;
  text-align: start;
  text-transform: uppercase;
  font-size: 1.4rem;

  &:first-child {
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
  }
`;

export const TableBody = styled.tbody`
  /* background-color: var(--color-grey-100); */
`;

export const TableRow = styled.tr`
  display: table-row;
  /* border: 1px solid var(--color-grey-100) !important; */
  box-shadow: 0 0 0 1px var(--color-grey-100);
  border-radius: 12px;
  margin-bottom: 1rem;
`;
