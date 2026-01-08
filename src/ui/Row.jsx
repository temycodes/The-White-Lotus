import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
    `}
`;

// // Default prop
// Row.defaultProps = {
//   type: "vertical",
// };

export default Row;
