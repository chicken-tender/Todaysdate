import styled from 'styled-components';
import { StyledCheckbox, Button, TitleLink, RowWrapper, MapContainer, SelectAllButton } from './CommonStyle';

const ParentContainer = styled.div`
  margin: 1rem auto;
  width: 90%;
  .view_count {
    font-size: small;
    margin: 0;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    .title {
      max-width: 230px;
    }  
  }
`;


const PinListMobile = ({ isPostSelected, posts, selectAll, handleCheckboxChange, handleDeleteBtn, handleSelectAllChange, formatDate}) => {
  
  return (
    <>
      <ParentContainer>
        {posts.map((post) => (
          <div key={post.postNum}>
            <MapContainer>
              <RowWrapper>
                <StyledCheckbox
                  type="checkbox"
                  checked={isPostSelected(post.postNum)}
                  onChange={(event) => handleCheckboxChange(event, post.postNum)}
                />
                <TitleLink to={`/post/${post.postNum}`}>
                  <span className='title'>{post.title}</span><span className='view_count'>[{post.viewCount}]</span>
                </TitleLink>
              </RowWrapper>
              <RowWrapper gap="1rem">
                <p style={{marginLeft: '2rem'}}>{post.nickname}</p>
                <p>{formatDate(post.writeDate)}</p>
              </RowWrapper>
            </MapContainer>
          </div>
        ))}
        <RowWrapper gap="1rem">
          <SelectAllButton>
            <StyledCheckbox
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
              <p>전체선택</p>
            </SelectAllButton>
            <Button onClick={handleDeleteBtn}>
              삭제
            </Button>
          </RowWrapper>        
      </ParentContainer>
    </>
  );
};

export default PinListMobile;