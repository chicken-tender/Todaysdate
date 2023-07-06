import styled from 'styled-components';

const StyledButton = styled.button`
  width: 90%;
  height: 50px;
  border: none;
  background-color: var(--point-color);
  color: #fff;
  font-weight: 900;
  font-size: 1.4em;
  opacity: 50%;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  &:hover {
    opacity: ${props => props.disabled ? '50%' : '100%'};
  }
`;

const Button = (props) => {
  
  return(
    <StyledButton {...props} />
  );
}
export default Button;