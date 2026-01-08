import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 2.4rem;

  background: linear-gradient(135deg, var(--color-bg), var(--color-bg-alt));
`;

const LoginCard = styled.div`
  background: var(--color-bg);
  padding: 3.2rem 3.6rem;
  border-radius: 1.6rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <LoginCard>
        <Heading as='h4'>Log in</Heading>
        <LoginForm />
      </LoginCard>
    </LoginLayout>
  );
}

export default Login;
