import React, { useRef, useEffect, useState } from "react"; // eslint-disable-line import/no-webpack-loader-syntax
import Map, { NavigationControl, Source, Layer } from "react-map-gl";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": {
      property: "mag",
      stops: [
        [0, "yellow"],
        [3, "orange"],
        [5, "red"],
        [7, "black"]
      ]
    },
    "circle-opacity": 0.7,
    "circle-stroke-color": "white",
    "circle-stroke-width": 1
  }
};

export default function App() {
  const [lng, setLng] = useState(144);
  const [lat, setLat] = useState(-38);
  const [zoom, setZoom] = useState(1);

  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: zoom
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/ejooco/cl69684g1000d14qsf62spvs0"
      projection="globe"
      mapboxAccessToken="pk.eyJ1IjoiZWpvb2NvIiwiYSI6ImNrZ2YxaHdzOTFnYTEyenF1dzVkbTY4cWYifQ.8WxLXiSvR3K42_tRQpcL4Q"
    >
      <NavigationControl position="bottom-right" />
      <Source
        id="my-data"
        type="geojson"
        data={
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
        }
      >
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}
/*
mapboxgl.accessToken =
  "pk.eyJ1IjoiZWpvb2NvIiwiYSI6ImNrZ2YxaHdzOTFnYTEyenF1dzVkbTY4cWYifQ.8WxLXiSvR3K42_tRQpcL4Q";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(144);
  const [lat, setLat] = useState(-38);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      projection: "globe",
      style: "mapbox://styles/ejooco/cl69684g1000d14qsf62spvs0",
      center: [lng, lat],
      zoom: zoom
    });
  });
  
  useEffect(() => {
    const nav = new mapboxgl.NavigationControl({
      showCompass: false,
    })
    
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
*/
