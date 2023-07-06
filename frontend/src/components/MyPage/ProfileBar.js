import React from "react";
import UserProfile from "./UserProfile";
import ShortcutBar from "./Shortcuts";
import { ColumnWrapper } from "../Join/Wrappers";
import Container from "./Container";
import styled from "styled-components";

const Divider = styled.div`
  border-bottom: 2px solid var(--line-color);
  width: 90%;
  margin: -5px auto;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const ProfileBar = () => {
  return (
    <Container width="30%" height="390px" minWidth="240px">
      <ColumnWrapper alignItems="center" gap="20px">
        <UserProfile />
        <Divider />
        <ShortcutBar />
      </ColumnWrapper>
    </Container>
  );
};
export default ProfileBar;
