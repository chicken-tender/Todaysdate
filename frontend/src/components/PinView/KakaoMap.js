import React, { useEffect, useRef } from "react";
import { addMarker, addLine } from '../../util/mapUtil';
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

const KakaoMap = ({ postData }) => {
  const markerImages = [marker01, marker02, marker03, marker04, marker05, marker06, marker07, marker08, marker09, marker10];
  const mapRef = useRef();

  useEffect(() => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const options = {
      center: new window.kakao.maps.LatLng(postData.pins[0].latitude, postData.pins[0].longitude),
      level: 3
    };
    const map = new window.kakao.maps.Map(mapRef.current, options);
    map.setZoomable(false);

    let zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);


    let markers = [];
    if(postData.pins && Array.isArray(postData.pins)) {
      postData.pins.sort((a, b) => a.routeNum - b.routeNum);
      postData.pins.forEach((pin, index) => {
        const latlng = new window.kakao.maps.LatLng(pin.latitude, pin.longitude);
        bounds.extend(latlng);

        const marker = addMarker(latlng, map, index, markerImages);
        markers.push(marker);
      });
    }

    if(markers.length > 1) {
      addLine(markers, map);
    }

    map.setBounds(bounds);
},[postData]);

  return (
    <div
        ref={mapRef}
        style={{ height: "450px" }}
      ></div>
  )
}

export default KakaoMap;