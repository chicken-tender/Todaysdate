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

const Region = ({ onRegionChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
            지역
          </InputLabel>
          <NativeSelect
            defaultValue={"1"}
            onChange={onRegionChange}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            <option value={"1"} disabled>지역 선택</option>
            <option value={"SEOUL"}>서울</option>
            <option value={"INCHEON"}>인천</option>
            <option value={"GYEONGGI"}>경기</option>
            <option value={"GANGWON"}>강원</option>
            <option value={"BUSAN"}>부산</option>
            <option value={"CHUNGBUK"}>충북</option>
            <option value={"GYEONGBUK"}>경북</option>
            <option value={"JEOLLANAM"}>전남</option>
            <option value={"JEJU"}>제주</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}

export default Region;