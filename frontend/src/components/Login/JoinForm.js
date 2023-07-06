import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  font-size: 0.9em;
  color: var(--text-color);
`;
const StyledJoinLink = styled(Link)`
  color: var(--point-color);
  font-weight: bold;
`;

const JoinForm = () => {

  return (
    <Container>
      <p>계정이 없으신가요?</p>
      <StyledJoinLink to="/join">가입하기
      </StyledJoinLink>
    </Container>
  );
}

export default JoinForm;