import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

import { DetectClick } from "@components/map/detect-click";
import { startMarker, endMarker } from "@components/map/custom-marker";

import type { RootState } from "@/store/store";

import "leaflet/dist/leaflet.css";

export const Map = () => {
  const { position } = useSelector((state: RootState) => state.coords);

  return (
    <div className="absolute z-10 inset-0">
      <MapContainer
        className="w-full h-full"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <DetectClick />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position.map(({ coords, name }, i) => (
          <Marker
            key={i}
            position={coords}
            icon={name === "مبدا" ? startMarker : endMarker}
          />
        ))}
      </MapContainer>
    </div>
  );
};
