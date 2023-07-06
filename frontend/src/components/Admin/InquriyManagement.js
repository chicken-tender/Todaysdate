import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox'; 
import { pink } from '@mui/material/colors';
import Functions from "../../util/Functions";
import AdminAxiosApi from '../../api/AdminAxiosApi';
import Pagination from '../Festival/Pagination';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
    padding: 1px;
    border-bottom: 1px solid var(--line-color);
    text-align: center;
  }
  th {
    font-weight: bold;
    padding: 2px;
  }
`;

const Button = styled.button`
margin: 10px 0 0 10px;
align-self: flex-start;
line-height: 1.4rem;
background-color: var(--line-color);
border: 1px solid var(--hover-color);
border-radius: 6px;
cursor: pointer;
&:hover {
  background-color: var(--hover-color);
}
`;
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: white;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
`;


const PopupContent = styled.p`
  margin-bottom: 30px;
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

const Email = styled.div`
  width: 100%;
  height: 30px;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid var(--line-color);
  border-radius: 4px;
  font-size: 0.9rem;
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

const PopupTitle = styled.p`
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #fff;
  background-color: ${({ status }) => (status === '대기' ? 'var(--line-color)' : 'var(--point-color)')};
  color: ${({ status }) => (status === '대기' ? 'var(--text-color)' : '#fff')};
  font-weight: ${({ status }) => (status === '대기' ? '' : 'bold')};
`;


const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [Details, setDetails] = useState(null);
  const token = localStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 8; 


  useEffect(() => {
    const getInquiries = async () => {
      try {
        const response = await AdminAxiosApi.getAllinquiries(token);
        setInquiries(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await AdminAxiosApi.getAllinquiries(newToken);
          setInquiries(response.data);
      }
    }
  };
    getInquiries();
  }, [token]);

  useEffect(() => {
    setSelectAll(false);
    setSelectedInquiry([]);
  }, [currentPage]);
  
  useEffect(() => {
    if (selectedInquiry.length === 0) {
      setSelectAll(false);
    } else {
      setSelectAll(selectedInquiry.length === getPageInquriry().length);
    }
  }, [selectedInquiry]);
  

  // 그 페이지만 전체선택
  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allInquiriesNumInCurrentPage = getPageInquriry().map((inquiry) => inquiry.inquiryNum);
      setSelectedInquiry(allInquiriesNumInCurrentPage);
    } else {
      setSelectedInquiry([]);
    }
  };  

  const isPostSelected = (inquiryNum) => {
    return selectedInquiry.includes(inquiryNum);
  };


  const handleCheckboxChange = (event, inquiryNum) => {
    if (event.target.checked) {
      setSelectedInquiry((prevSelected) => [...prevSelected, inquiryNum]);
      console.log(selectedInquiry);
    } else {
      setSelectedInquiry((prevSelected) => prevSelected.filter((id) => id !== inquiryNum));
    }
  };
  
  // 문의 상태 확인으로 업데이트!
  const handleConfirm = async () => {
    const updatedInquiries = inquiries.map((inquiry) => {
      if (selectedInquiry.includes(inquiry.inquiryNum)) {
        return { ...inquiry, inquiryStatus: '완료' };
      }
      return inquiry;
    });
    try {
      for (const inquiryNum of selectedInquiry) {
        await AdminAxiosApi.updateStatus(inquiryNum, '완료', token);
      }
      setInquiries(updatedInquiries);
      setSelectedInquiry([]);
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        for (const inquiryNum of selectedInquiry) {
          await AdminAxiosApi.updateStatus(inquiryNum, '완료', newToken);
        }
        setInquiries(updatedInquiries);
        setSelectedInquiry([]);
      }
      console.error('상태 변경 실패', error);
    }
  };
  
  const handleInquiryContentClick = (inquiry) => {
    setDetails(inquiry);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setDetails(null);
  };

  const getPageInquriry = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return inquiries.slice(startIndex, endIndex);
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
        <Title>문의 관리</Title>
        <Table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  {...label} 
                  sx={{
                  color: pink[300],
                   '&.Mui-checked': {
                     color: pink[300],
                     },
                    }}
                />
              </th>
              <th>문의 번호</th>
              <th>문의 내용</th>
              <th>문의자</th>
              <th>문의일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {getPageInquriry().map((inquiry) => (
              <tr key={inquiry.inquiryNum}>
                <td>
                <Checkbox
                checked={isPostSelected(inquiry.inquiryNum)}
                onChange={(event) => handleCheckboxChange(event, inquiry.inquiryNum)}
                 {...label} 
                 sx={{
                 color: pink[300],
                  '&.Mui-checked': {
                    color: pink[300],
                    },
                   }}
                   />
                </td>
                <td>{inquiry.inquiryNum}</td>
                <td onClick={() => handleInquiryContentClick(inquiry)} style={{ cursor: 'pointer' }}>
                {inquiry.inquiryContent.length > 15 ? `${inquiry.inquiryContent.substring(0, 16)}···` : inquiry.inquiryContent} 
               </td>
                <td>{inquiry.nickname}</td>
                <td>{formatDate(inquiry.inquiryDate)}</td>
                <td>
               <div> <StatusBadge status={inquiry.inquiryStatus}> {inquiry.inquiryStatus} </StatusBadge> </div>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={handleConfirm}>
          확인
        </Button>
        {inquiries.length > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(inquiries.length / postsPerPage)}
          onPageChange={setCurrentPage}
        />
        )}
      </Container>
      {popupVisible && (
        <PopupContainer>
          {Details && (
            <>
              <PopupContent>
                <PopupTitle>문의 내용</PopupTitle>
                <TextBox readOnly value={Details.inquiryContent} />
              </PopupContent>
              <PopupContent>
                <PopupTitle>회원 이메일</PopupTitle>
                <Email>{Details.inquiryEmail}</Email>
              </PopupContent>
            </>
          )}
          <PopupCloseButton onClick={closePopup}>닫기</PopupCloseButton>
        </PopupContainer>
      )}
    </>
  );
};


export default InquiryManagement;
