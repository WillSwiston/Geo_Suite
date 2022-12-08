import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import Countries from "../../json/shapefiles/countries.json";
import States from "../../json/shapefiles/states.json";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapElement.css";
import Popup from "../popup/Popup";

function MapElement (props) {
  const [map, setMap] = useState(null);
  const zoomRef = useRef();
  const [data, setData] = useState(Countries);

  useEffect(() => {
    if (props.data === "states") {
      setData(States);
    }

    if (props.data === "countries") {
      setData(Countries);
    }

    if (zoomRef.current !== undefined) {
      appendZoomElement();
    }
  }, [zoomRef.current]);

  const countryStyle = props.countryStyle
    ? props.countryStyle
    : {
      fillColor: "var(--map-country-background)",
      fillOpacity: "1",
      color: "var(--map-element-background)",
      weight: "1"
    };

  const onEachCountry = (feature, layer) => {
    if (props.onEachCountry) {
      props.onEachCountry[1](feature, layer);
      if (!(props.onEachCountry[0])) return;
    }

    // Will render blank textbox if feature not in actual JSON
    if (props.popupFeatures === undefined) return;

    const popupContent = ReactDOMServer.renderToString(
      <Popup popupOptions={props.popupFeatures ? props.popupFeatures : []} feature={feature} />
    );
    layer.bindPopup(popupContent);
  };

  const appendZoomElement = () => {
    const zoomMenu = document.getElementsByClassName("leaflet-control-zoom");
    const menu = zoomMenu[0];
    const elem = zoomRef.current;
    menu.appendChild(elem);
  };

  const handleClick = () => {
    console.log(props.mapCenter);
    const center = props.mapCenter ? props.mapCenter : [10, 0];
    const zoom = props.mapZoom ? props.mapZoom : 2;
    map.setView(center, zoom);
  };

  return (
    <MapContainer center={props.mapCenter ? props.mapCenter : [10, 0]} zoom={props.mapZoom ? props.mapZoom : 2} style={{ height: props.height ? props.height : "70vh", width: props.width ? props.width : "90vw" }} whenCreated={setMap} >
      <GeoJSON key={props.geoJSONKey} data={data} style={countryStyle} onEachFeature={onEachCountry} />
      <a ref={zoomRef} onClick={() => handleClick()} className="leaflet-control-zoom-in cursor-grab">⌕</a>
    </MapContainer>
  );
}

export default MapElement;
