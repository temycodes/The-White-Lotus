import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-brand-600);
    color: var(--color-surface);
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-brand-700);
      transform: translateY(-1px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
    }

    &:active {
      background-color: var(--color-brand-800);
      transform: translateY(0);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
    }
  `,

  secondary: css`
    color: var(--color-brand-600);
    background: var(--color-surface);
    border: 1px solid var(--color-brand-200);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-brand-50);
      border-color: var(--color-brand-300);
    }

    &:active {
      background-color: var(--color-brand-100);
      border-color: var(--color-brand-400);
    }
  `,

  danger: css`
    color: var(--color-surface);
    background-color: #dc2626; /* red-600 equivalent */
    border: none;
    transition: all 0.2s ease;

    &:hover {
      background-color: #b91c1c; /* red-700 */
    }

    &:active {
      background-color: #991b1b; /* red-800 */
    }
  `,
};

const Button = styled.button`
  border-radius: 0.8rem;
  cursor: pointer;
  font-family: inherit;
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  size: "medium",
  variation: "primary",
};

export default Button;
