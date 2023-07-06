import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';

const CustomCheckbox = styled(Checkbox)`
  .MuiSvgIcon-root {
    fill: var(--point-color);
  }
  &.Mui-checked {
    color: var(--point-color);
  }
  .MuiTouchRipple-root {
    color: var(--point-color);
  }
`;

const MuiCheckbox = ({ label, ...rest }) => {

  return(
    <>
      <FormControlLabel
      control={<CustomCheckbox {...rest} sx={{ marginLeft: '6px', '&:hover': { bgcolor: 'transparent' }}} />}
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': { 
          fontWeight: 500, 
          fontSize: '0.9rem',
          fontFamily: '"Pretendard", sans-serif', 
        },
      }}
    />
    </>
  );
}
export default MuiCheckbox;
