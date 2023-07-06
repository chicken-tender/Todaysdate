import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  width: 55%;
  gap: 15px;
  @media screen and (max-width:768px) {
    width: 100%;
  }
`;

const MainContent = (props) => {

  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
}

export default MainContent;