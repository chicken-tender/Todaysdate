import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Box from '@mui/system/Box';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from "../../util/WriteFormStyle";
import marker01 from "../../resource/pin_icon/01.png";
import marker02 from "../../resource/pin_icon/02.png";
import marker03 from "../../resource/pin_icon/03.png";
import marker04 from "../../resource/pin_icon/04.png";
import marker05 from "../../resource/pin_icon/05.png";
import marker06 from "../../resource/pin_icon/06.png";
import marker07 from "../../resource/pin_icon/07.png";
import marker08 from "../../resource/pin_icon/08.png";
import marker09 from "../../resource/pin_icon/09.png";
import marker10 from "../../resource/pin_icon/10.png";

const RouteContainer = styled(Container)`
  input {
    border: none;
    height: 40px;
    background-color: var(--input-color);
    border-radius: 4px;
    padding: 5px 10px;
    width: 40%;
  }
  .wrapper {
    display: flex;
    align-items: center;
  }
  @media screen and (max-width:768px) {
    input {
      width: 100%;
    }
  }
`;

const RouteByKakao = ({ setPins }) => {
  const markerImages = [marker01, marker02, marker03, marker04, marker05, marker06, marker07, marker08, marker09, marker10];
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lines, setLines] = useState([]);
  const [clickMarkerIndex, setClickMarkerIndex] = useState(0);

  useEffect(() => {
    if (!window.kakao) {
      alert("KakaoMap API가 로드되지 않았습니다.");
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };

    const mapObj = new window.kakao.maps.Map(mapRef.current, options);
    mapObj.setDraggable(true);
    setMap(mapObj);

    window.kakao.maps.event.addListener(mapObj, "click", (mouseEvent) => {
      addMarker(mouseEvent.latLng, mapObj, clickMarkerIndex, setClickMarkerIndex);
    });
  }, []);

  useEffect(() => {
    if (markers.length > 1) {
      let line = new window.kakao.maps.Polyline({
        path: markers.map((marker) => marker.getPosition()),
        strokeWeight: 3,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeStyle: "solid",
        endArrow: true
      });
      line.setMap(map);
      setLines((prev) => [...prev, line]);
    }
  }, [markers, map]);

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
        addMarker(mouseEvent.latLng, map, clickMarkerIndex, setClickMarkerIndex);
      });
    }
  }, [map, clickMarkerIndex, setClickMarkerIndex]);

  const addMarker = useCallback(
    (position, map, index, setIndex) => {
      const markerImage = markerImages[index % markerImages.length];
      let marker = new window.kakao.maps.Marker({
        position: position,
        map: map,
        image: new window.kakao.maps.MarkerImage(
          markerImage,
          new window.kakao.maps.Size(43, 50.57),
          { offset: new window.kakao.maps.Point(21, 53) }
        )
      });
      marker.setMap(map);
      setIndex(index + 1);
      setMarkers(prev => [...prev, marker]);

      setPins(prevPins => [
        ...prevPins,
        {
          latitude: marker.getPosition().getLat(),
          longitude: marker.getPosition().getLng(),
          routeNum: index + 1
        }
      ]);
    },
    [setPins]
  );

  const searchPlace = async (query) => {
    let ps = new window.kakao.maps.services.Places();

    try {
      const places = await new Promise((resolve, reject) => {
        ps.keywordSearch(query, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(data);
          } else {
            reject(new Error("검색 결과가 없습니다."));
          }
        });
      });

      if (places && places.length > 0) {
        const firstPlace = places[0];
        const latLng = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);
        addMarker(latLng, map, clickMarkerIndex, setClickMarkerIndex);
        map.setCenter(latLng);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      searchPlace(event.target.value);
    }
  };

  return (
    <RouteContainer>
      <h1>📍경로 만들기</h1>
      <p>경로는 <span>최대 10개</span>까지 만들 수 있습니다.</p>
      <div className="wrapper">
        <input
          type="text"
          onKeyDown={handleSearch}
          placeholder="장소 혹은 주소 검색!"
        />
        <Box sx={{ backgroundColor: '#FF62AD', borderRadius: '15%', padding: '3px' }}>
          <SearchIcon sx={{ color: '#FFFFFF', fontSize: 30 }} />
        </Box>
      </div>
      <div
        style={{ height: "450px" }}
        ref={mapRef}
      ></div>
    </RouteContainer>
  );
};

export default RouteByKakao;