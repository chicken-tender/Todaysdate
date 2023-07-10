import React, { useEffect } from "react";

const FestivalMap = ({ contentId, apiData }) => {
  useEffect(() => {
    if (apiData) {
      const festivalData = apiData.find(
        (item) => item.contentId.toString() === contentId
      );

      if (festivalData) {
        const latitude = festivalData.mapy;
        const longitude = festivalData.mapx;

        const script = document.createElement("script");
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=48640fae3ffe04d4a299f306589d3c71";
        script.async = true;

        script.addEventListener("load", () => {
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };
          const map = new window.kakao.maps.Map(
            document.getElementById("map"),
            options
          );

          const markerPosition = { lat: latitude, lng: longitude };
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              markerPosition.lat,
              markerPosition.lng
            ),
          });
          marker.setMap(map);
        });

        document.body.appendChild(script);
      }
    }
  }, [apiData, contentId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div id="map" style={{ width: "85%", height: "350px" }} />
    </div>
  );
};

export default FestivalMap;
