import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  color: var(--text-color);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 0.4rem;
  h1 {
    font-size: 1em;
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
    @media screen and (max-width: 768px) {
      font-size: 1.2em;
      max-width: 230px;

    }
  }
  p {
    font-size: 0.8rem;
    font-weight: 500;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const StyledThumbnail = styled(Link)`
  img {
    width: 12rem;
    height: 12rem;
    border-radius: 15px;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      width: 16rem;
      height: 16rem;
    }
  }
`;

const BookmarkedPin = ({ thumbnail, title, district, postId }) => {
  return (
    <Container>
      <StyledThumbnail to={`/post/${postId}`}>
        <img src={thumbnail} alt="썸네일" />
      </StyledThumbnail>
      <PostTitle>
        <h1>{title}</h1>
        <p>{district}</p>
      </PostTitle>
    </Container>
  );
};

export default BookmarkedPin;