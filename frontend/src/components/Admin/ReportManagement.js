import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Functions from "../../util/Functions";
import AdminAxiosApi from '../../api/AdminAxiosApi';
import Pagination from '../Festival/Pagination';


const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 60px 0px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  padding : 40px 20px 30px;
`;


const Table = styled.table`
  width: 100%;
  tbody :hover {
    background-color : #f5f5f5;
  }
  th,
  td {
    padding: 14px;
    border-bottom: 1px solid var(--line-color);
    text-align: center;
  }
  th {
    font-weight: bold;
    padding: 14px;
  }
`;
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 35%;
  background-color: white;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
`;


const PopupContent = styled.p`
  margin-bottom: 30px;
`;

const PopupCloseButton = styled.button`
  padding: 5px 10px;
  background-color: var(--point-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
const TextBox = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid var(--line-color);
  border-radius: 4px;
  font-size: 0.9rem;
`;

const PopupTitle = styled.p`
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const ReportManagement = () => {
  const [reports, setReports] =  useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [Details, setDetails] = useState(null);
  const token = localStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState(1); 
  const postsPerPage = 8; 


  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await AdminAxiosApi.getAllReports(token);
        setReports(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await AdminAxiosApi.getAllReports(newToken);
          setReports(response.data);
      }
    }
  };
    getReports();
  }, [token]);

  const handleReportContentClick = (report) => {
    setDetails(report);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setDetails(null);
  };

  const getPageReports = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return reports.slice(startIndex, endIndex);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Container>
        <Title>신고 관리</Title>
        <Table>
          <thead>
            <tr>
              <th>신고 번호</th>
              <th>신고 내용</th>
              <th>신고자</th>
              <th>신고회원</th>
              <th>신고일</th>
            </tr>
          </thead>
          <tbody>
            {getPageReports().map((report) => (
              <tr key={report.reportNum}>
                <td>{report.reportNum}</td>
                <td onClick={() => handleReportContentClick(report)} style={{ cursor: 'pointer' }}>
                {report.content.length > 15 ? `${report.content.substring(0, 15)}···` : report.content} 
               </td>
                <td>{report.reporter}</td>
                <td>{report.reported}</td>
                <td>{formatDate(report.reportDate)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {reports.length > postsPerPage && (
        <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(reports.length / postsPerPage)}
        onPageChange={setCurrentPage}
      />
      )}
      </Container>
      {popupVisible && (
        <PopupContainer>
          {Details && (
            <>
              <PopupContent>
                <PopupTitle>신고 내용</PopupTitle>
                <TextBox readOnly value={Details.content} />
              </PopupContent>
            </>
          )}
          <PopupCloseButton onClick={closePopup}>닫기</PopupCloseButton>
        </PopupContainer>
      )}
    </>
  );
};  

export default ReportManagement;
