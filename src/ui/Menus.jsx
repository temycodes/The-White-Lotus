import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-brand-50);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-600);
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: var(--color-brand-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-bg);
  border: 1px solid var(--color-brand-200);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: var(--border-radius-md);

  padding: 0.4rem 0;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: var(--color-brand-50);
    color: var(--color-brand-700);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-brand-600);
    transition: color 0.2s ease, transform 0.2s ease;
  }

  &:hover svg {
    color: var(--color-brand-700);
    transform: scale(1.05);
  }
`;

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;
  const [position, setPosition] = useState(null);

  return <MenuContext.Provider value={{ openId, close, open, position, setPosition }}>{children}</MenuContext.Provider>;
}

// child components of menu

function Toggle({ id }) {
  const { open, close, openId, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 5,
    });

    //if no menu is open or not the same as the id currently open the one with the id else close it
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <PiDotsThreeCircleFill />
    </StyledToggle>
  );
}

// list
function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);
  if (id !== openId) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

// button
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick()?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// menu
function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
