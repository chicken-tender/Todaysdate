import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
            borderColor: "#FF62AD",
            "&:hover": {
              borderColor: "#FF62AD",
            },
          },
          "&.Mui-focused fieldset": {
            borderColor: "#FF62AD",
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
            borderColor: "#FF62AD",
          },
          overflow: "auto",
        },
      },
    },
  },
});


const SelectBox = ({ onFilter })  => {
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    onFilter(selectedCity, status); 
  };


  const handleStautsChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    onFilter(city, selectedStatus); // 선택한 city와 status 값을 전달
  };



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', gap: '25px' , "@media (max-width: 768px)": {
            flexDirection: "column", width: "100%"
          },}}>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="city-label">지역</InputLabel>
          <Select
            labelId="city-label"
            id="city-select"
            value={city}
            label="지역"
            onChange={handleCityChange}
            inputProps={{
              MenuProps: {
                disableScrollLock: true
              }
            }}
          >
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>서울</MenuItem>
            <MenuItem value={2}>인천</MenuItem>
            <MenuItem value={4}>대구</MenuItem>
            <MenuItem value={5}>광주</MenuItem>
            <MenuItem value={6}>부산</MenuItem>
            <MenuItem value={31}>경기도</MenuItem>
            <MenuItem value={32}>강원도</MenuItem>
            <MenuItem value={33}>충청북도</MenuItem>
            <MenuItem value={34}>충청남도</MenuItem>
            <MenuItem value={35}>경상북도</MenuItem>
            <MenuItem value={36}>경상남도</MenuItem>
            <MenuItem value={37}>전라북도</MenuItem>
            <MenuItem value={38}>전라남도</MenuItem>
            <MenuItem value={39}>제주도</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="date-label">시기</InputLabel>
          <Select
            labelId="date-label"
            id="date-select"
            value={status}
            label="시기"
            onChange={handleStautsChange}
            inputProps={{
              MenuProps: {
                disableScrollLock: true
              }
            }}
          >
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>개최중</MenuItem>
            <MenuItem value={2}>개최예정</MenuItem>

          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default SelectBox;
