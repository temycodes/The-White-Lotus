import { RiLogoutBoxLine } from "react-icons/ri";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";

function Logout() {
  const { logoutMutate, logoutPending } = useLogout();
  return (
    <ButtonIcon disabled={logoutPending} onClick={logoutMutate}>
      <RiLogoutBoxLine />
    </ButtonIcon>
  );
}

export default Logout;
