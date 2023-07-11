import React, { useState } from 'react';
import MuiTextField from "../components/Join/TextField";
import styled from 'styled-components';
import Symbol from '../components/Join/Symbol';
import { ColumnWrapper } from '../components/Join/Wrappers';
import Button from '../components/Join/Button';
import Agreement from '../components/Join/Agreement';
import EmailVerificationPopup from '../components/Join/EmailVerificationPopup';
import JoinAxiosApi from '../api/JoinAxiosApi';
import UserPopUp, {PopUpMessage} from '../util/modal/UserPopUp.jsx';

const StyledContainer = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column ;
  align-items: center;
  gap : 30px;
  width: 20%;
  @media screen and (max-width:768px) {
    width: 80%;
  }
`;

const StyledH1 = styled.h1`
  margin: 0;
  color: var(--hover-extra-color);
  font-weight: 800;
  font-size: 2.4rem;
`;

const JoinPage = () => {

  // 키보드 입력
  const [inputEmail, setInputEmail] = useState('');
  const [inputNickname, setInputNickname] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [inputConPwd, setInputConPwd] = useState('');
  
  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isConPwd, setIsConPwd] = useState(false);

  const [nicknameHelpText, setNicknameHelpText] = useState('');
  const [emailHelpText, setEmailHelpText] = useState('');

  const [isAgreementsChecked, setIsAgreementsChecked] = useState(false);
  const [isPushChecked, setIsPushChecked] = useState(false); 

  const [showEmailVerificationPopup, setShowEmailVerificationPopup] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');


  // 이메일
  const onChangeEmail = async(e) => {
    const emailRegEx = /^[a-zA-Z0-9+-/_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailCurrent = e.target.value
    setInputEmail(emailCurrent);

    if (emailCurrent === "") {
      setEmailHelpText("");
    } else { // 중복 검사
      const checkEmail = async(emailCurrent) => {
        try {
          const memberCheck = await JoinAxiosApi.dupEmail(emailCurrent);
          if (memberCheck.data === false) {
            setEmailHelpText('이미 사용 중인 이메일입니다.');
            setIsEmail(false);
          } else {
            setEmailHelpText('사용 가능한 이메일입니다.');
            setIsEmail(true);
          }
        } catch (error) {
          console.log("이메일 중복 확인 오류: ", error);
        }
      };
      if (emailRegEx.test(emailCurrent)) {
        await checkEmail(emailCurrent);
      } else {
        setIsEmail(false);
        setEmailHelpText('@를 포함한 이메일을 입력해 주세요.');
      }
    }
  };

  // 비밀번호 (정규식 : 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합)
  const onChangePwd = (e) => {
    const pwdRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const pwdCurrent = e.target.value;
    setInputPwd(pwdCurrent);
    setIsPwd(pwdRegex.test(pwdCurrent));
  }

  // 비밀번호 확인
  const onChangeConPwd = (e) => {
    const conPwdCurrent = e.target.value;
    setInputConPwd(conPwdCurrent);
    setIsConPwd(conPwdCurrent === inputPwd)
  }

  // 닉네임 (정규식 : 2 ~ 10자 한글, 영문, 숫자 사용 가능)
  const onChangeNickname = async (e) => {
    const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-z0-9가-힣]{2,10}$/;
    const nicknameCurrent = e.target.value;
    setInputNickname(nicknameCurrent);

    if (nicknameCurrent === "") {
      setNicknameHelpText("");
    } else { // 중복 검사
      const checkNickname = async(nicknameCurrent) => {
        try {
          const memberCheck = await JoinAxiosApi.dupNickname(nicknameCurrent);
          if (memberCheck.data === false) {
            setNicknameHelpText('이미 사용 중인 닉네임입니다.');
            setIsNickname(false);
          } else {
            setNicknameHelpText('사용 가능한 닉네임입니다.');
            setIsNickname(true);
          }
        } catch (error) {
          console.log("닉네임 중복 확인 오류: ", error);
        }
      };
      if (nicknameRegex.test(nicknameCurrent)) {
        await checkNickname(nicknameCurrent);
      } else {
        setIsNickname(false);
        setNicknameHelpText('닉네임은 2~8자의 영문, 숫자, 한글로 이루어져야 합니다.');
      }
    }
  };

  const handleAgreementChange = (checkedItems) => {
    setIsAgreementsChecked(
      checkedItems.includes('chk1') && checkedItems.includes('chk2')
    );
    setIsPushChecked(checkedItems.includes('chk3'))
  };


  const handleJoinBtn = async () => {
    if (!isAgreementsChecked) {
      setShowPopUp(true);
      setPopUpMessage("필수 약관에 동의해 주세요.");
      return;
    }

    if (isNickname && isPwd && isConPwd && isEmail) {
      const isPush = isPushChecked ? "PUSH" : "NOPUSH";
      const userData = {
        email: inputEmail,
        pwd: inputPwd,
        nickname: inputNickname,
        isPush: isPush
      };
      try {
        await JoinAxiosApi.createUser(userData);
        setShowEmailVerificationPopup(true);
        console.log("🍒회원가입 성공 : ", userData);
      } catch (error) {
        console.log("😰 회원가입 실패", error);
      }
    }
  };
  



  return (
    <StyledContainer gap="30px">
      <ColumnWrapper alignItems='center' justifyContent='center'>
        <Symbol />
        <StyledH1>회원가입</StyledH1>
      </ColumnWrapper>
      <MuiTextField 
        type="text"
        label="닉네임" 
        variant="outlined"
        value={inputNickname} 
        onChange={onChangeNickname}
        placeholder="닉네임을 입력하세요"
        required
        helperText={nicknameHelpText}
        isValid={isNickname}
        errorColor="#66002f"
      />
      <MuiTextField 
        type="password"
        label="비밀번호" 
        variant="outlined"
        value={inputPwd} 
        onChange={onChangePwd}
        placeholder="비밀번호를 입력하세요"
        required
        helperText={inputPwd ? (isPwd ? '올바른 형식입니다.' : '숫자+영문자+특수문자 조합으로 8자리 이상 입력해 주세요.') : ''}
        isValid={isPwd}
        errorColor="#66002f"
        />
      <MuiTextField 
        type="password"
        label="비밀번호 확인" 
        variant="outlined"
        value={inputConPwd} 
        onChange={onChangeConPwd}
        placeholder="비밀번호를 재입력하세요"
        required
        helperText={inputConPwd ? (isConPwd ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.') : ''}
        isValid={isConPwd}
        errorColor="#66002f"
        />
      <MuiTextField 
        type="email"
        label="이메일" 
        variant="outlined"
        value={inputEmail} 
        onChange={onChangeEmail}
        placeholder="이메일을 입력하세요"
        required
        helperText={emailHelpText}
        isValid={isEmail}
        errorColor="#66002f"
      />
      <Agreement onAgreementChange={handleAgreementChange} />
      <Button onClick={handleJoinBtn}>가 입 하 기</Button>
      {showEmailVerificationPopup && (
        <EmailVerificationPopup
          email={inputEmail}
        />
      )}
      <UserPopUp
        open={showPopUp}
        close={()=>{setShowPopUp(false)}}     
        header="❗️"
        closeText="확인"
      >
        <PopUpMessage>
          {popUpMessage}
        </PopUpMessage>
      </UserPopUp>
    </StyledContainer>
  );
}
export default JoinPage;