import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load aunthenticated user
  const { userPending, isAuthenticated } = useUser();

  // 2. if there is no aunthenticated user, redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !userPending) navigate("/login");
    },
    [isAuthenticated, navigate, userPending]
  );

  // 3.  while loading show spinner
  if (userPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  return children;
}
export default ProtectedRoute;
