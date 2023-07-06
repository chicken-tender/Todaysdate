import styled from "styled-components";

const StyledContainer = styled.div`
  margin: ${({ margin }) => margin || ""};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ff62ad;
  border-radius: 15px;
  box-shadow: 3px 3px 3px #999;
  width: ${({ width }) => width || "100%"};
  min-width: ${({ minWidth }) => minWidth || ""};
  height: ${({ height }) => height || "100%"};
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 30%;
  }
`;

const Container = ({ width, height, ...props }) => {
  return <StyledContainer width={width} height={height} {...props} />;
};
export default Container;
