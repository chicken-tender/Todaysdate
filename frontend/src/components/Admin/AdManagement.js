import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox'; 
import { pink } from '@mui/material/colors';
import AdPopup from './AdPopUp';
import AdminAxiosApi from '../../api/AdminAxiosApi';
import Functions from "../../util/Functions";
import Pagination from '../Festival/Pagination';
import UserPopUp from '../../util/modal/UserPopUp';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Container = styled.div`
  width: 85%;
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
  th,td {
    padding: 1px;
    border-bottom: 1px solid var(--line-color);
    text-align: center;
    vertical-align: middle;
  }
  th {
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
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
const PopUpMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
`;


const ImageThumbnail = styled.img`
  width: 50%; 
  height: 60px; 
  object-fit: contain;
  justify-content: center;
`;

const AdManagement = () => {
  const [ads, setAds] = useState([]);
  const [selectedAds, setSelectedAds] = useState([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState(1); 
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const postsPerPage = 8; 
  useEffect(() => {
    const getAds = async () => {
      try {
        const response = await AdminAxiosApi.getAllAds(token);
        setAds(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await AdminAxiosApi.getAllAds(newToken);
          setAds(response.data);
        }
      }
    };
    getAds();
  }, [token]);

  useEffect(() => {
    setSelectAll(false);
    setSelectedAds([]);
  }, [currentPage]);

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allAdNums = getPageAd().map((ad) => ad.adNum);
      setSelectedAds(allAdNums);
    } else {
      setSelectedAds([]);
    }
  };

  const isPostSelected = (adNum) => {
    return selectedAds.includes(adNum);
  };

  const handleCheckboxChange = (event, adNum) => {
    if (event.target.checked) {
      setSelectedAds((prevSelected) => [...prevSelected, adNum]);
    } else {
      setSelectedAds((prevSelected) => prevSelected.filter((adId) => adId !== adNum));
    }
  };
  
  // 광고 삭제
  const handleDeleteAd = () => {
      if (selectedAds.length === 0) {
        return;
      }
      setShowDeletePopup(true); // 팝업 표시
    };

  const handleModalConfirm = async () => {
    try {
      await AdminAxiosApi.deleteAds(selectedAds, token);
      setSelectedAds([]);

      const newToken = Functions.getAccessToken();
      const newResponse = await AdminAxiosApi.getAllAds(newToken);
      setAds(newResponse.data);
      alert('광고가 삭제되었습니다.');
    } catch (error) {
      await Functions.handleApiError(error);
    }
    setShowDeletePopup(false); 
  };

  const handleModalClose = () => {
    setShowDeletePopup(false);
  };

  // 광고 추가
  const handleAddAd = async () => {
    setShowPopup(true);
    try {
      const response = await AdminAxiosApi.getAllAds(token);
      setAds(response.data);
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await AdminAxiosApi.getAllAds(newToken);
        setAds(response.data);
      }
    }
  };
  

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getPageAd = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return ads.slice(startIndex, endIndex);
  };

  return (
    <>
      <Container>
        <Title>광고 관리</Title>
        <Table>
          <thead>
            <tr>
            <th>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  {...label} 
                  sx={{
                  color: pink[200],
                   '&.Mui-checked': {
                     color: pink[300],
                     },
                    }}
                />
              </th>
              <th>광고번호</th>
              <th>광고이름</th>
              <th>광고이미지</th>
            </tr>
          </thead>
          <tbody>
            {getPageAd().map((ad) => (
              <tr key={ad.adNum}>
                <td>
                <Checkbox
                checked={isPostSelected(ad.adNum)}
                onChange={(event) => handleCheckboxChange(event, ad.adNum)}
                 {...label} 
                 sx={{
                 color: pink[200],
                  '&.Mui-checked': {
                    color: pink[300],
                    },
                   }}
                   />
                </td>
                <td>{ad.adNum}</td>
                <td>{ad.adName}</td>
                <td>  <ImageThumbnail src={ad.imgUrl} alt="광고 이미지" /></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonContainer>
        <Button onClick={handleAddAd}>추가</Button>
        <Button onClick={handleDeleteAd}>삭제</Button>
        <UserPopUp
        open={showDeletePopup}
        confirm={handleModalConfirm}
        close={handleModalClose}
        type="confirm"
        header="❗️"
        confirmText="확인"
        closeText="취소"
      >
        <PopUpMessage>
          광고를 삭제하겠습니까?
        </PopUpMessage>
      </UserPopUp>
      </ButtonContainer>
      {ads.length > postsPerPage && (
        <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(ads.length / postsPerPage)}
        onPageChange={setCurrentPage}
      />
      )}
      </Container>
       {showPopup && <AdPopup onAddAd={handleAddAd} onClosePopup={handleClosePopup} />}
    </>
  );
};  

export default AdManagement;

