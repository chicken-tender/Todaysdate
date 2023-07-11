import styled from "styled-components";
import { TitleLink, StyledCheckbox, Button} from "./CommonStyle";

const ParentContainer = styled.div`
  width: 80%;
  margin: 1rem auto;
  font-size: 1rem;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
    margin-left: 1rem;
  }
  .empty_pin {
   margin-top: 2rem;
   text-align: center;
   font-size: 1.4rem;
  }
  @media screen and (max-width: 1200px) {
    .author {
      display: none;
    }  
  }
`;

const Table = styled.table`
  width: 100%;
  th,
  td {
    padding: 1rem 0.4rem;
    border-bottom: 1px solid var(--line-color);
    text-align: center;
  }
  th {
    font-weight: bold;
  }
  .title_align {
    text-align: left;
  }
  .checkbox_align {
    text-align: right;
  }
`;

const PinListWeb = ({
  isPostSelected,
  posts,
  selectAll,
  handleSelectAllChange,
  handleCheckboxChange,
  handleDeleteBtn,
  formatDate,
}) => {
  return (
    <ParentContainer>
      {posts.length === 0 ? (
        <div className="empty_pin">작성된 게시글이 없습니다. 😰</div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th className="checkbox_align">
                  <StyledCheckbox
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th>제목</th>
                <th className="author">작성자</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.postNum}>
                  <td className="checkbox_align">
                    <StyledCheckbox
                      type="checkbox"
                      checked={isPostSelected(post.postNum)}
                      onChange={(event) =>
                        handleCheckboxChange(event, post.postNum)
                      }
                    />
                  </td>
                  <td className="title_align">
                    <TitleLink to={`/post/${post.postNum}`}>
                      <span className="title">{post.title}</span>
                    </TitleLink>
                  </td>
                  <td className="author">{post.nickname}</td>
                  <td>{formatDate(post.writeDate)}</td>
                  <td>{post.viewCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={handleDeleteBtn}>삭제</Button>
        </>
      )}
    </ParentContainer>
  );
};

export default PinListWeb;