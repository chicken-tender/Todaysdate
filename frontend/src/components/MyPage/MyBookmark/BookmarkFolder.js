import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FolderContainer = styled.div`
  margin: ${({ margin }) => margin || ''};
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--hover-extra-color);
  font-size: 1.4rem;
  font-weight: bold;
  border: 1px solid #FF62AD;
  border-radius: 15px;
  box-shadow: 3px 3px 3px #999;
  width: 12rem;
  height: 12rem;
  cursor: pointer;
  overflow: hidden;
  .folder {
    position: absolute; 
    padding: 0.5rem;
    color: var(--text-color);
    background-color: var(--input-color);
    opacity: 0.8;
    font-size: 1.2rem;
    border-radius: 5px;
    max-width: 140px;
    line-height: 1.4rem;
    .count {
    font-weight: 400;
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease-in-out;
  }
  @media screen and (max-width: 768px) {
    width: 16rem;
    height: 16rem;
    flex-direction: column;
  }
`;

const ThumbnailImage = styled.img`
  padding: 5px;
  border-radius: 15px;
  width: 100%;
  height: 100%; 
  object-fit: cover;
  opacity: 0.4;
`;

export const AddFolderContainer = styled(FolderContainer)`
  cursor: default;
  &:hover {
    background-color: inherit;
  }
`;

const BookmarkFolder = ({ folderId, folderName, bookmarks }) => {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState('');
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    if (bookmarks && bookmarks.length > 0) {
      setThumbnail(bookmarks[0].imgUrl);
      setBookmarkCount(bookmarks.length)
    }
  }, [bookmarks]);


  const handleClick = () => {
    navigate(`/mypage/bookmarks/${folderId}`);
  };

  return (
    <>
      <FolderContainer onClick={handleClick}>
        {thumbnail && <ThumbnailImage src={thumbnail} alt="썸네일" />}
        <div className='folder'>
          <span className='name'>{folderName}</span>
          <span className='count'> [{bookmarkCount}] </span>
        </div>
      </FolderContainer>
    </>
  );
};

export default BookmarkFolder;
