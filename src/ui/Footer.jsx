import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
  padding: 0.1git add -Arem 1rem;
  width: 100%;

  background-color: var(--color-bg);
  border-top: var(--surface-border);
  color: var(--color-brand-600);

  font-size: 1.2rem;
`;

function Footer() {
  return (
    <StyledFooter>
      <span>created by temy {new Date().getFullYear()}</span>
    </StyledFooter>
  );
}

export default Footer;
