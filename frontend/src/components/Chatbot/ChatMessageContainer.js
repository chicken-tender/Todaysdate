import React, { useEffect, useRef } from 'react';
import Profile from "../../resource/chat_profile.jpeg";
import styled from 'styled-components';

const StyledChatMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(80vh - 250px);
  margin-top: 80px;
  margin-bottom: 150px;
  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.3;
  @media (max-width: 768px) {
    width: 95%;
    font-size: 0.8rem;
    margin-bottom: 25px;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 40px;
  border-radius: 50%;
  margin-right: 13px;
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 30px;
    margin-right: 7px;
  }
`;

const Message = styled.div`
  margin-top: 10px;
  padding: 20px;
  background-color: ${({ isUser }) => (isUser ? '#FFA8D2' : '#ECECEC')};
  color: #000;
  border-radius: ${({ isUser }) => (isUser ? '25px 25px 0px 25px' : '0px 25px 25px 25px')};
  max-width: 400px;
  @media (max-width: 400px) {
    padding: 16px;
  }
`;

const ChatMessageContainer = ({ messages }) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <StyledChatMessageContainer ref={messageContainerRef}>
      {messages.map((message, index) => (
        <MessageContainer key={index} isUser={message.isUserMessage}>
          {!message.isUserMessage && <ProfileImage src={Profile} alt="Profile" />}
          <Message isUser={message.isUserMessage}>{message.text}</Message>
        </MessageContainer>
      ))}
    </StyledChatMessageContainer>
  );
};

export default ChatMessageContainer;
