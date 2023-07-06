export const addMarker = (position, map, index, markerImages) => {
  const markerImage = markerImages[index % markerImages.length];
  let marker = new window.kakao.maps.Marker({
    position: position,
    map: map,
    image: new window.kakao.maps.MarkerImage(
      markerImage,
      new window.kakao.maps.Size(43, 50.57),
      { offset: new window.kakao.maps.Point(21, 53) }
    ),
  });
  marker.setMap(map);

  return marker;
};

export const addLine = (markers, map) => {
  let line = new window.kakao.maps.Polyline({
    path: markers.map((marker) => marker.getPosition()),
    strokeWeight: 3,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeStyle: "solid",
    endArrow: true,
  });
  line.setMap(map);

  return line;
};
