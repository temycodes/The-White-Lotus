import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";

import { HiUser } from "react-icons/hi";

const StyledMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledMenu>
  );
}

export default HeaderMenu;
