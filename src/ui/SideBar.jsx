import styled from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";
import Footer from "./Footer";

const StyledSideBar = styled.aside`
  background-color: var(--color-bg);
  padding: 3rem 2.5rem;
  border-right: 1px solid var(--color-border);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  height: 100vh;
`;

function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />

      <Footer />
    </StyledSideBar>
  );
}

export default SideBar;
