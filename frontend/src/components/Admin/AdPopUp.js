import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebase";
import AdminAxiosApi from '../../api/AdminAxiosApi';
import Functions from '../../util/Functions';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: white;
  padding: 15px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
`;

const PopupTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const PopupInput = styled.input`
  width: 93%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid var(--line-color);
`;

const PopupCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 5px;
  background-color: transparent;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
`;

const PopupButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const PopupButton = styled.button`
  padding: 8px;
  background-color: var(--point-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const AdPopup = ({ onAddAd, onClosePopup }) => {
  const [adName, setAdName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [ads, setAds] = useState([]);
  const token = localStorage.getItem("accessToken");

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

  const handleAdNameChange = (event) => {
    setAdName(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleAddAd = async () => {
    if (adName && selectedImage) {
      try {
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        const imgUrl = await getDownloadURL(storageRef);
        const response = await AdminAxiosApi.createAd({ adName, imgUrl }, token);
        onAddAd(response.data); 
        setAdName('');
        setSelectedImage(null);
        alert('광고가 등록되었습니다.');
        onClosePopup();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClosePopup = () => {
    onClosePopup();
  };

  return (
    <PopupContainer>
      <PopupCloseButton onClick={handleClosePopup}>✕</PopupCloseButton>
      <PopupContent>
        <PopupTitle>광고 추가</PopupTitle>
        <PopupInput
          type="text"
          placeholder="광고 이름"
          value={adName}
          onChange={handleAdNameChange}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <PopupButtonContainer>
          <PopupButton onClick={handleAddAd}>추가</PopupButton>
        </PopupButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default AdPopup;
