import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;

  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5rem 4rem;

  background-color: var(--color-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); /* Safari support */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
