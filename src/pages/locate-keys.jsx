import { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 14.5995, // Default latitude (Manila, Philippines)
  lng: 120.9842, // Default longitude
};

const LocateKeys = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => console.error("Error fetching location"),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <NavbarSidebarLayout>
      <LoadScript googleMapsApiKey={"AIzaSyDRRBe27DEmvtNJKbXmrZ123OamnesahBE"}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        />
      </LoadScript>
    </NavbarSidebarLayout>
  );
};

export default LocateKeys;
