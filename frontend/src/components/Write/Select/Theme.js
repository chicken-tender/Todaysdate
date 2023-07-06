import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF62AD'
    }
  }
});

const Theme = ({ onThemeChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
            코스 테마
          </InputLabel>
          <NativeSelect
            defaultValue={"1"}
            onChange={onThemeChange}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            <option value={"1"} disabled>테마 선택</option>
            <option value={"맛집 코스"}>맛집 코스</option>
            <option value={"힐링 코스"}>힐링 코스</option>
            <option value={"도보 코스"}>도보 코스</option>
            <option value={"캠핑 코스"}>캠핑 코스</option>
            <option value={"반려동물과 함께"}>반려동물과 함께</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}

export default Theme;