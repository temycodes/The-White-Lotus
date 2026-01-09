import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import SideBar from "../ui/SideBar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-bg);
  padding: 4rem 3rem;
  overflow: auto;
  min-width: 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  box-sizing: border-box;
  flex-shrink: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
