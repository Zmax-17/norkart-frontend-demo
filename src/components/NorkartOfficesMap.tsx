// src/components/NorkartOfficesMap
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Office } from "../types/Office";
import { useOffices } from "../hooks/useOffices";

// Fixing default Leaflet icons
const icon = new Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const NorkartOfficesMap = () => {
  const {
    data: offices,
    isLoading,
    isError,
  } = useOffices();

  if (isLoading)
    return (
      <div style={{ color: "red" }}>
        Vennligst vent mens API-et våkner. Det kan ta noen
        sekunder, da API-et går i dvale ved inaktivitet.
        Hvis det tar lengre tid, kan det være problemer med
        Render.com. Laster kart…
      </div>
    );
  if (isError || !offices)
    return (
      <div style={{ color: "red" }}>
        Det oppstod et problem med å laste kontorene.
        Vennligst prøv igjen senere. Hvis problemet
        vedvarer, kan det være en feil på Render.com sin
        side.
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Norkart kontorer i Norge
      </h1>
      <MapContainer
        center={[64.0, 10.0]}
        zoom={5}
        style={{ height: "75vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {offices.map((o: Office) => (
          <Marker
            key={o.id}
            position={[o.lat, o.lon]}
            icon={icon}
          >
            <Popup>
              <b>{o.name}</b> ({o.type})
              <br />
              <strong>Besøksadresse:</strong>
              {o.visitAddress}
              <br />
              <strong>Postadresse:</strong>
              {o.postalAddress}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
