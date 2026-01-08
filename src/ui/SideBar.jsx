import styled from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";
import Uploader from "../data/Uploader";

const StyledSideBar = styled.aside`
  background-color: var(--color-bg);
  padding: 3rem 2.5rem;
  border-right: 1px solid var(--color-border);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSideBar>
  );
}

export default SideBar;
