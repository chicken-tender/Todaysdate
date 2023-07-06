// 경로 코멘트, 지도, 장소명 캐러셀
import React from "react";
import styled from "styled-components";
import { Container } from "../../util/ViewFormStyle";
import KakaoMap from "./KakaoMap";
import PlaceCarousel from "./PlaceCarousel";

const CommentField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  .form {
    text-align: center;
    background-color: #fff;
    border: 1px solid #c8c8c8;
    flex: 1;
    padding: 20px 10px;
    min-height: 54.8px;
    border-radius: 8px;
    p {
      font-size: 0.8em;
    }
  }
`;

const PostContent1 = ({ postData }) => {
  if (!postData) {
    return <p>데이터가 없습니다!</p>
  }

  return (
    <Container>
      <CommentField>
        <div className="form">
          <p>{postData.comment[0]}</p>
        </div>
        <div className="form">
          <p>{postData.comment[1]}</p>
        </div>
        <div className="form">
          <p>{postData.comment[2]}</p>
        </div>
      </CommentField>
      <KakaoMap postData={postData} />
      <PlaceCarousel postData={postData} />
    </Container>
  );
}

export default PostContent1;