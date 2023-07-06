import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF62AD",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#bababa",
            "&:hover": {
              borderColor: "#ffffff",
            },
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffffff",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF62AD",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#818087",
          },
        },
      },
    },
  },
});

const RegionSelectBox = ({ value, onRegionUpdate }) => {

  const handleRegionChange = (event) => {
    onRegionUpdate(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel id="city-label">관심 지역</InputLabel>
          <Select
            labelId="city-label"
            id="city-select"
            onChange={handleRegionChange}
            sx={{ borderRadius: 2 }}
            label="관심 지역"
            value={value}
          >
            <MenuItem value="SEOUL">서울</MenuItem>
            <MenuItem value="INCHEON">인천</MenuItem>
            <MenuItem value="GYEONGGI">경기</MenuItem>
            <MenuItem value="GANGWON">강원</MenuItem>
            <MenuItem value="BUSAN">부산</MenuItem>
            <MenuItem value="CHUNGBUK">충북</MenuItem>
            <MenuItem value="GYEONGBUK">경북</MenuItem>
            <MenuItem value="JEOLLANAM">전남</MenuItem>
            <MenuItem value="JEJU">제주</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default RegionSelectBox;