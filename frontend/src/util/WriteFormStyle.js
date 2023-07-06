import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 8px;
  margin-bottom: 20px;
  h1 {
    font-size: 1.5em;
    font-weight: 700;
  }
  p {
    font-size: 0.8em;
    color: var(--input-text-color);
    span {
      color: var(--point-color);
      font-weight: bold;
    }
  }
`;