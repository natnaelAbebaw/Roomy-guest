import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const StyledApp = styled.div`
  height: 200vh;
`;
function AppLayout() {
  return (
    <StyledApp>
      <Header />
      <Outlet />
    </StyledApp>
  );
}

export default AppLayout;
