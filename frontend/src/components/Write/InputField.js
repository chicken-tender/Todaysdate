import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: var(--text-color);
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  .wrapper {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  input {
    border: none;
    height: 40px;
    background-color: var(--input-color);
    border-radius: 4px;
    padding: 5px 10px;
  }
  .form {
    font-size: 0.8em;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    .wrapper {
      flex-direction: column;
    }
  }
`;

const InputField = ({
  onTitleChange,
  onDistrictChange,
  onComment1Change,
  onComment2Change,
  onComment3Change,
  titleValue,
  districtValue,
  comment1Value,
  comment2Value,
  comment3Value,
}) => {
  return (
    <Container>
      <div className="form">
        <label htmlFor="title">제목 *</label>
        <input
          type="text"
          id="title"
          required
          onChange={onTitleChange}
          value={titleValue}
        />
      </div>
      <div className="wrapper">
        <div className="form">
          <label htmlFor="district">상세 지역 *</label>
          <input
            type="text"
            id="district"
            placeholder="예) 서울시 중구"
            required
            onChange={onDistrictChange}
            value={districtValue}
          />
        </div>
        <div className="form">
          <label htmlFor="comment1">해시태그 - 1</label>
          <input
            type="text"
            id="comment1"
            placeholder="예) 웨이팅 할 수 있어요"
            onChange={onComment1Change}
            value={comment1Value}
          />
        </div>
        <div className="form">
          <label htmlFor="comment2">해시태그 - 2</label>
          <input
            type="text"
            id="comment2"
            placeholder="예) 대중교통이 편해요"
            onChange={onComment2Change}
            value={comment2Value}
          />
        </div>
        <div className="form">
          <label htmlFor="comment3">해시태그 - 3</label>
          <input
            type="text"
            id="comment3"
            placeholder="예) 조용한 분위기"
            onChange={onComment3Change}
            value={comment3Value}
          />
        </div>
      </div>
    </Container>
  );
};

export default InputField;
