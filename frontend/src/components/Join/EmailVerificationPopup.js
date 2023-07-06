import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import JoinAxiosApi from '../../api/JoinAxiosApi';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%; // 20%
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid var(--point-color);
  border-radius: 10px;
  z-index: 9999;
  display: flex;
  .wrapper {
    display: flex;
    justify-content: space-around;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }

`;

const PopupContent = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const PopupTitle = styled.h2`
  margin-bottom: 0.6rem;
  font-size: 1.1rem;
  font-weight: 700;
`;

const PopupInput = styled.input`
  width: 70%;
  padding: 0.6rem;
  border: 1px solid var(--line-color);
  @media screen and (max-width: 768px) {
    width: 70%;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
  width: 100%;
`;

const PopupButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: var(--line-color);
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    background-color: var(--point-color);
    color: #fff;
  }
`;

const PopUpOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

const EmailVerificationPopup = ({ email }) => {
  const navigate = useNavigate();
  const [authKey, setAuthKey] = useState('');

  const handleVerificationKeyChange = (event) => {
    setAuthKey(event.target.value);
  };

  const verifyAuthKey = async (email, authKey) => {
    try {
      await JoinAxiosApi.confirmAuthKey(email, authKey);
      console.log("🍒 인증 성공: ", email, authKey);
      return true; 
    } catch (error) {
      console.error("😰 인증 실패: ",error);
      return false; 
    }
  };
  
  const handleVerifyEmail = async () => {
    if (!authKey) {
      alert('인증키를 입력해 주세요.');
      setAuthKey('');
      return;
    }
  
    try {
      const response = await verifyAuthKey(email, authKey);
      console.log(response)
      if (response === true) {
        onVerificationSuccess();
      } else {
        alert('인증키를 확인해 주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const onVerificationSuccess = () => {
    alert('인증되었습니다! 로그인해 주세요.');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <PopUpOverlay>
        <PopupContainer>
          <PopupContent>
            <PopupTitle>이메일 인증</PopupTitle>
            <Divider />
            <div className='wrapper'>
              <PopupInput
                type="text"
                placeholder="인증 키를 입력하세요"
                value={authKey}
                onChange={handleVerificationKeyChange}
              />
              <PopupButton onClick={handleVerifyEmail}>인증하기</PopupButton>
            </div>
          </PopupContent>
        </PopupContainer>
      </PopUpOverlay>
    </>
  );
};

export default EmailVerificationPopup;
