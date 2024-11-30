import styled from "styled-components";
import { Outlet } from "react-router-dom";
// import Footer from "./Footer";

const StyledApp = styled.div`
  min-height: 100vh;
`;
function AppLayout() {
  return (
    <StyledApp>
      <Outlet />
      {/* <Footer /> */}
    </StyledApp>
  );
}

export default AppLayout;
