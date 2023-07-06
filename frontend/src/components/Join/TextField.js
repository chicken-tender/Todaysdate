import { TextField } from '@mui/material';
// import styled from 'styled-components';
import styled from '@emotion/styled'


const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    prop !== 'isValid' && prop !== 'errorColor',
})`
  width: 100%;
  .MuiOutlinedInput-root {
    border-radius: 8px;
    &:focus-within .MuiOutlinedInput-notchedOutline {
      border-color: #FF62AD;
    }
  }
  .MuiInputLabel-root.Mui-focused {
    color: #FF62AD;
  }
  .MuiFormHelperText-root {
    color: ${({ isValid, errorColor }) => (isValid ? '#FF62AD' : errorColor)};
    font-size: 0.8rem;
    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;

const MuiTextField = ({isValid, errorColor, ...props}) => {
  return(
    <StyledTextField isValid={isValid} errorColor={errorColor} {...props} />
  );
}
export default MuiTextField;