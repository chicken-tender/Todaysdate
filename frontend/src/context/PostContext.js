import { createContext, useState } from "react";
export const PostContext = createContext(null);

const PostStore = (props) => {
  const [resultData, setResultData] = useState([]);
  const [postId, setPostId] = useState(0);

  return (
    <PostContext.Provider value = {{ resultData, setResultData, postId, setPostId }}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostStore;