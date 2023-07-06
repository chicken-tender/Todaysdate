import React, { useState } from "react";
import styled from "styled-components";
import ReportAxiosApi from "../../api/ReportAxiosApi";
import Functions from "../Functions";

const ModalBackground = styled.div`
  color: var(--text-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: visibility 0.2s linear, opacity 0.2s linear;
  z-index: 1;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 350px;
  border: 1px solid var(--line-color);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  h2 {
    font-weight: bold;
    font-size: 1.2em;
  }
  p {
    font-size: 0.8em;
    color: var(--input-text-color);
  }
  textarea {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid var(--line-color);
    background-color: var(--point-color);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
`;

const ReportModal = ({ open, handleClose, userId }) => {
  const token = localStorage.getItem("accessToken");
  const [reportContent, setReportContent] = useState("");

  const handleReportClose = () => {
    handleClose(true);
  };

  const handleReportSubmit = async () => {
    if (!reportContent) {
      alert("신고 내용을 입력해주시기 바랍니다.");
      return;
    }
    const reportRequestDto = {
      reportedId: userId,
      content: reportContent,
      reportDate: new Date(),
    };

    try {
      const response = await ReportAxiosApi.reportUser(reportRequestDto, token);
      console.log("🎄 : " + response.data);
      if (response.data === "신고가 접수되었습니다.🫡") {
        alert("신고가 정상적으로 접수되었습니다.");
      }
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await ReportAxiosApi.reportUser(
          reportRequestDto,
          token
        );
        console.log("🎄 : " + response.data);
        if (response.data === "신고가 접수되었습니다.🫡") {
          alert("신고가 정상적으로 접수되었습니다.");
        }
      }
    } finally {
      handleReportClose();
    }
  };

  const handleInputChange = (event) => {
    setReportContent(event.target.value);
  };

  return (
    <ModalBackground open={open}>
      <ModalContainer>
        <h2>사용자 신고하기 🚫</h2>
        <p>기타 문의사항은 메일로 보내주시기 바랍니다.</p>
        <textarea name="reportContent" id="" cols="30" rows="10" value={reportContent} onChange={handleInputChange}></textarea>
        <button onClick={handleReportSubmit}>관리자에게 전송</button>
        <button onClick={handleClose}>취소</button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ReportModal;
