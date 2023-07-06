// 본문, 사진
import React from "react";
import { Container } from "../../util/ViewFormStyle";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  line-height: 1.8em;
  h1 {
    font-weight: bold;
    font-size: 1.5em;
  }
`;

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 1.5rem;
  border-radius: 5px;

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const PostContent2 = ({ postData }) => {
  if (!postData) {
    return <p>데이터가 없습니다!</p>;
  }

  const urls = postData.imgUrl ? postData.imgUrl.split(',') : [];

  return (
    <StyledContainer>
      <h1>본문</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      {urls.length > 0 && urls.map((url, index) => (
          <StyledImg key={index} src={url} alt={`첨부 이미지 ${index + 1}`} />
        ))}
    </StyledContainer>
  );
};

export default PostContent2;
