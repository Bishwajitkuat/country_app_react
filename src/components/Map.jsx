import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loader from "./Loader";

function Map({ lati, lngi }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
  });
  const center = useMemo(() => ({ lat: lati, lng: lngi }), []);
  if (!isLoaded) return <Loader />;
  return (
    <GoogleMap zoom={4} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Map;
