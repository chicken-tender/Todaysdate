import styled from 'styled-components';


const StyledButton = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  background-color: var(--point-color);
  color: #fff;
  font-size: 1.1em;
  opacity: 100%;
  border-radius: 18px;
  margin-left : 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  &:hover {
    opacity: ${props => props.disabled ? '100%' : '50%'};
  }
  @media (max-width: 400px) {
    width: 70%;
    font-size: 1em;
  }
`;


const Button = (props) => {
  
  return(
    <StyledButton {...props} />
  );
}
export default Button;