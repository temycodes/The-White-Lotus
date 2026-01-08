import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiHome, HiCalendar, HiCollection, HiCog, HiUsers } from "react-icons/hi";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem 0;
  margin: 0;
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.6rem;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 1rem;
  color: var(--color-grey-800);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-brand-50);
    color: var(--color-brand-600);
    transform: translateX(2px);
  }

  // This works because react-router places the active class on the active NavLink
  &.active {
    background-color: var(--color-brand-100);
    color: var(--color-brand-700);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    transform: translateX(0);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-600);
    transition: all 0.2s ease;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-700);
  }
`;

function MainNav() {
  return (
    <div>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
            <HiHome />
            <span>Home </span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/bookings'>
            <HiCalendar />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/cabins'>
            <HiCollection />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/users'>
            <HiUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/settings'>
            <HiCog />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </div>
  );
}

export default MainNav;
