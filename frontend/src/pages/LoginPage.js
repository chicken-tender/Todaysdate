import React, { useEffect } from "react";
import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";
import LoginLogo from "../components/Login/LoginLogo";
import JoinForm from "../components/Login/JoinForm";
import coupleImage from "../resource/login-image.jpeg";

const Container = styled.div`
  width: 340px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  border-radius: 30px;
  gap: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border: 1px solid #ddd;
  @media screen and (max-width:768px) {
    width: 100%;
    border: none;
    margin-top: 0;
  }
`;

const Image = styled.img`
  width: 100%; 
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const LoginPage = () => {

  useEffect(() => {
    localStorage.clear();
  },[]);

  return (
    <Container>
      <LoginLogo />
      <LoginForm />
      <JoinForm />
      <Image src={coupleImage} alt="couple" />
    </Container>
  );
}

export default LoginPage;
