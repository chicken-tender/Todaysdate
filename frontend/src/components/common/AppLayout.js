import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Rank from "./Rank";
import MainContent from "./MainContent";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-bottom: 100px;
`;

const AppLayout = ({ children }) => {

  return (
    <>
      <Container>
        <Navbar />
        <MainContent>{children}</MainContent>
        <Rank />
      </Container>
    </>
  );
}

export default AppLayout;