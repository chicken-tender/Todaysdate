import React from "react";
import styled from "styled-components";
import Menu from "./Menu";


const Container = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 100px;
`;

const AdminNav = () => {

  return (
    <>
      <Container>
        <Menu />
      </Container>
    </>
  );
}

export default AdminNav;