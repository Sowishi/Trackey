import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Button } from "flowbite-react";
import { HiKey, HiLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 14.5995, // Default latitude (Manila, Philippines)
  lng: 120.9842, // Default longitude
};

// Sample key data with coordinates
const sampleKeys = [
  {
    id: 1,
    name: "Main Gate",
    rfid: "RFID-001",
    lat: 14.5995,
    lng: 120.9842,
    status: "Available",
  },
  {
    id: 2,
    name: "Back Door",
    rfid: "RFID-002",
    lat: 14.6,
    lng: 120.985,
    status: "In Use",
  },
  {
    id: 3,
    name: "Storage Room",
    rfid: "RFID-003",
    lat: 14.5985,
    lng: 120.9835,
    status: "Available",
  },
  {
    id: 4,
    name: "Server Room",
    rfid: "RFID-004",
    lat: 14.601,
    lng: 120.983,
    status: "Available",
  },
  {
    id: 5,
    name: "Office",
    rfid: "RFID-005",
    lat: 14.6005,
    lng: 120.9845,
    status: "In Use",
  },
  {
    id: 6,
    name: "Parking Gate",
    rfid: "RFID-006",
    lat: 14.598,
    lng: 120.9855,
    status: "Available",
  },
  {
    id: 7,
    name: "Lobby",
    rfid: "RFID-007",
    lat: 14.6015,
    lng: 120.984,
    status: "In Use",
  },
  {
    id: 8,
    name: "Emergency Exit",
    rfid: "RFID-008",
    lat: 14.599,
    lng: 120.9825,
    status: "Available",
  },
  {
    id: 9,
    name: "Maintenance",
    rfid: "RFID-009",
    lat: 14.6002,
    lng: 120.9838,
    status: "Available",
  },
  {
    id: 10,
    name: "Security",
    rfid: "RFID-010",
    lat: 14.5998,
    lng: 120.9852,
    status: "In Use",
  },
  {
    id: 11,
    name: "Rooftop",
    rfid: "RFID-011",
    lat: 14.6012,
    lng: 120.9835,
    status: "Available",
  },
  {
    id: 12,
    name: "Basement",
    rfid: "RFID-012",
    lat: 14.5988,
    lng: 120.9848,
    status: "In Use",
  },
];

const LocateKeys = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [showKeyGrid, setShowKeyGrid] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => console.error("Error fetching location"),
      { enableHighAccuracy: true }
    );
  }, []);

  const navigateToKey = (key) => {
    setMapCenter({ lat: key.lat, lng: key.lng });
    setSelectedKey(key);
    setShowKeyGrid(false);
  };

  return (
    <NavbarSidebarLayout>
      <div className="relative h-[600px]">
        <LoadScript
          googleMapsApiKey={"AIzaSyDRRBe27DEmvtNJKbXmrZ123OamnesahBE"}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={18}
          >
            {/* Current location marker */}
            <Marker
              position={currentPosition}
              icon={{
                scale: 7,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
              }}
            />

            {/* Key markers */}
            {sampleKeys.map((key) => (
              <Marker
                key={key.id}
                position={{ lat: key.lat, lng: key.lng }}
                icon={{
                  scale: 7,
                  fillColor: key.status === "Available" ? "#10B981" : "#EF4444",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "#FFFFFF",
                }}
                onClick={() => setSelectedKey(key)}
              />
            ))}

            {/* InfoWindow for selected key */}
            {selectedKey && (
              <InfoWindow
                position={{ lat: selectedKey.lat, lng: selectedKey.lng }}
                onCloseClick={() => setSelectedKey(null)}
              >
                <div className="p-2">
                  <h3 className="font-bold text-gray-800">
                    {selectedKey.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    RFID: {selectedKey.rfid}
                  </p>
                  <p
                    className={`text-sm ${
                      selectedKey.status === "Available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Status: {selectedKey.status}
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>

        {/* Locate Key Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            color="gray"
            onClick={() => setShowKeyGrid(!showKeyGrid)}
            className="shadow-lg"
          >
            <HiLocationMarker className="mr-2" />
            {showKeyGrid ? "Hide Keys" : "Locate Key"}
          </Button>
        </div>

        {/* Key Grid */}
        {showKeyGrid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-10 max-h-64 overflow-y-auto"
          >
            <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">
              Select Key to Locate
            </h3>
            <div className="grid grid-cols-6 gap-3">
              {sampleKeys.map((key) => (
                <motion.div
                  key={key.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="col-span-1"
                >
                  <div
                    onClick={() => navigateToKey(key)}
                    className={`p-2 rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                      selectedKey?.id === key.id
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <HiKey
                      className={`w-6 h-6 mb-1 ${
                        key.status === "Available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                    <p className="text-xs text-center font-medium text-gray-800 dark:text-gray-200 truncate w-full">
                      {key.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </NavbarSidebarLayout>
  );
};

export default LocateKeys;
