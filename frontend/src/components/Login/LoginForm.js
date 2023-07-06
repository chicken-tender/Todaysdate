import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import AuthAxiosApi from "../../api/AuthAxiosApi";
import PopUp from "../../util/modal/PopUp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled.button`
  width: 240px;
  height: 50px;
  border: none;
  background-color: var(--point-color);
  color: #fff;
  font-weight: 900;
  font-size: 1.4em;
  opacity: 50%;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 100%;
  }
`;

const StyledChangePasswordLink = styled(Link)`
  align-self: flex-end;
  color: var(--point-color);
  text-decoration: underline;
  font-size: 0.9em;
`;

const LoginForm = () => {
  const navigate = useNavigate();

  // 키보드 입력 받기
  const [inputEmail, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");

  // 로그인 실패 팝업
  const [PopUpOpen, setPopUpOpen] = useState(false);
  const closePopUp = () => {
    setPopUpOpen(false);
  };

  const onClickLogin = async (event) => {
    event.preventDefault();
    try {
      const userInfoResponse = await AuthAxiosApi.login(inputEmail, inputPwd);
      const userData = JSON.stringify(userInfoResponse, null, 2);
      const userDataObject = JSON.parse(userData);

      if (userInfoResponse.status === 200 && userDataObject.data.authority === 'ROLE_USER') {
        localStorage.setItem('accessToken', userDataObject.data.accessToken);
        localStorage.setItem('refreshToken', userDataObject.data.refreshToken);

        navigate("/home");
      } else if (userInfoResponse.status === 200 && userDataObject.data.authority === 'ROLE_ADMIN') {
        localStorage.setItem('accessToken', userDataObject.data.accessToken);
        localStorage.setItem('refreshToken', userDataObject.data.refreshToken);
        localStorage.setItem('authority', userDataObject.data.authority);

        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      setPopUpOpen(true);
    }
  };

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onChangePwd = (e) => {
    setInputPwd(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <TextField
          id="outlined-basic"
          name="email"
          value={inputEmail}
          onChange={onChangeEmail}
          label="아이디(이메일)"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#FF62AD",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FF62AD",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#FF62AD",
              },
            },
          }}
        />
        <TextField
          id="outlined-basic"
          name="pwd"
          value={inputPwd}
          onChange={onChangePwd}
          label="비밀번호"
          variant="outlined"
          type="password"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#FF62AD",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FF62AD",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#FF62AD",
              },
            },
          }}
        />
        <StyledChangePasswordLink to="/password">
          비밀번호 재설정🔒
        </StyledChangePasswordLink>
        <StyledButton onClick={onClickLogin}>로 그 인</StyledButton>
      </Container>
      <PopUp open={PopUpOpen} close={closePopUp} type={false} header="오류">
        이메일과 비밀번호를 다시 확인해주세요.
      </PopUp>
    </Box>
  );
};

export default LoginForm;
