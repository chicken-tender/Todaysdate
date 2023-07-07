import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ChatbotAxiosApi from "../../api/ChatbotAxiosApi";
import UserPopUp from "../../util/modal/UserPopUp";
import { useNavigate } from 'react-router-dom';
import ChatMessageContainer from "./ChatMessageContainer";
import MenuContainer from "./MenuContainer";
import InputContainer from "./InputContainer";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 500px;
  min-height: 80vh;
  height: fit-content;
  border: 3px solid var(--point-color);
  padding: 20px;
  box-shadow: 0px 4px 4px 3px rgba(255, 98, 173, 0.2);
  border-radius: 30px;
  margin: 0px auto;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    max-width: 80%;
    min-height: 70vh;
  }
`;

const Header = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 70px;
  background: var(--point-color);
  border-radius: 25px 25px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0 30px;
  @media screen and (max-width: 768px) {
    height: 55px;
    font-size: 1rem;
    padding: 0 25px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const PopUpMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
`;

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const messageContainerRef = useRef(null);
  const [isEmail, setIsEmail] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const token = localStorage.getItem("accessToken");
  const [inquiryContent, setInquiryContent] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startMessage = {
      text: <>안녕하세요 !  저는 오늘의 데이트 고객센터 챗봇입니다  😊 <br/> 아래의 원하시는 메뉴를 선택해주세요.</>,
      isUserMessage: false,
    };
    setMessages([startMessage]);
  }, []);

  const handleCloseChat = () => {
    setShowPopup(true);
  };

  const handleModalConfirm = () => {
    setShowPopup(false);
    navigate('/home'); 
  };

  const handleMenuSelect = (menuName) => {
    const menuNumber = getMenuNumber(menuName);

    if (menuNumber !== 0) {
      const userMessage = {
        text: menuName,
        isUserMessage: true,
      };

      setIsInputActive(menuNumber === 5);
      setIsEmail(false);

      const botMessage = {
        text: intialMessage(menuNumber),
        isUserMessage: false,
      };

      setMessages([...messages, userMessage, botMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isEmail) {
      handleSendMessage();
    }
  };

  const getMenuNumber = (menuName) => {
    switch (menuName) {
      case "이용가이드":
        return 1;
      case "멤버십":
        return 2;
      case "광고문의":
        return 3;
      case "신고문의":
        return 4;
      case "기타문의":
        return 5;
      default:
        return 0;
    }
  };

  const intialMessage = (menuNumber) => {
    switch (menuNumber) {
      case 1:
        return <>오늘의 데이트는 사용자가 데이트 직접 코스를 만들어 공유할 수 있는 곳입니다.<br />   1. 핀 만들기  : 직접 데이트 경로를 만들고 멋진 데이트 경험을 공유해보세요! <br /> 
        2. 다른 사용자가 작성한 글들은 북마크 기능을 통해 마이페이지에서 폴더별로 모아볼 수 있어요. <br />  
        3. 지역 행사: 전국의 다양한 행사 정보를 통해 자세한 일정과 정보를 확인하고, 원하는 행사에 참여할 수 있습니다.<br />  <br/>
        오늘의 데이트로 데이트 코스를 제작하고 행사에 참여하여 즐거운 시간을 보내세요! 💗<br /> </>;
      case 2:
        return <>  멤버십 서비스는 광고 없이 오늘의 데이트를 즐길 수 있는 서비스입니다! <br /> ✅ 실제 결제는 이루어지지 않습니다. </>;
      case 3:
        return (
            <>광고 신청 절차 및 관련 자세한 문의사항에 관해서는 아래의 이메일로 연락주시면 도움을 드리겠습니다 😊 <br/>todaysdateofficial@gmail.com</>
        );
      case 4:
        return (
          <>게시물/댓글에 대한 신고 절차를 안내해드리겠습니다. <br/>만약 부적절한 게시물이나 댓글을 발견하셨다면, 해당 항목의 오른쪽 상단에 있는 점 세 개를 클릭해주세요! <br/> 그런 다음, 신고하기 메뉴를 선택해주세요. 🚨  <br/>선택하신 게시물 또는 댓글은 신고가 접수되어 처리됩니다.  <br/>더 안전하고 쾌적한 커뮤니티 환경을 위해 여러분의 적극적인 참여를 부탁드립니다! </> 
        );
      case 5:
        return (
          <>기타 문의 사항을 아래 입력란에 작성해주세요. <br /> 관리자가 확인 후 이메일로 답변을 보내드리겠습니다 💗</>
        );
      default:
        return "메뉴를 선택해주세요.";
    }
  };

  // 문의 작성
  const handleSendMessage = () => {
    const userMessage = {
      text: inputValue,
      isUserMessage: true,
    };

    let updatedMessages = [...messages, userMessage];

    if (!isEmail && !inquiryContent) {
      setInquiryContent(inputValue);
      setIsEmail(true);
      const emailMessage = {
        text: <>답변을 받으실 이메일 주소를 입력해주세요😆 </>,
        isUserMessage: false,
      };
      updatedMessages = [...updatedMessages, emailMessage]; // 이메일 입력 요청 메시지 추가
    } else if (isEmail) {
      setInquiryEmail(inputValue);
      const botMessage = {
        text: <>문의가 성공적으로 접수되었습니다!  <br /> 확인 후 빠른 시일 내에 답변드리겠습니다 💗</>,
        isUserMessage: false,
      };

      const chatbotDto = {
        inquiryContent: inquiryContent,
        inquiryEmail: inputValue,
      };

      ChatbotAxiosApi.createInquiry(chatbotDto, token)
        .then((response) => {
          setMessages([...updatedMessages, botMessage]);
          setIsEmail(false);
          setInquiryContent("");
        })
        .catch((error) => {
        });
    }

    setMessages(updatedMessages);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Container>
      <Header>
        고객센터 Chat
        <CloseButton onClick={handleCloseChat}>✕</CloseButton>
      </Header>
      <ChatMessageContainer messages={messages} messageContainerRef={messageContainerRef}/>
      <MenuContainer handleMenuSelect={handleMenuSelect} />
      <InputContainer
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        isInputActive={isInputActive}
        handleSendMessage={handleSendMessage}
      />
      <UserPopUp
        open={showPopup}
        confirm={handleModalConfirm}
        close={() => setShowPopup(false)}
        type="confirm"
        header="❗️"
        confirmText="확인"
        closeText="취소"
      >
        <PopUpMessage>
          고객센터 챗봇을 종료 합니다.
        </PopUpMessage>
      </UserPopUp>
    </Container>
  );
};

export default ChatRoom;
