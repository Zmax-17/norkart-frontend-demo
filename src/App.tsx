import { AddOfficeForm } from "./components/AddOfficeForm";
import { NorkartOfficesMap } from "./components/NorkartOfficesMap";
import { OfficesList } from "./components/OfficesList";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f9f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: 10,
          backgroundColor: "#ddf3eb",
        }}
      >
        <h1 style={{ padding: 10, color: "#444" }}>
          Norkart Demo
        </h1>
        <NorkartOfficesMap />
        <OfficesList />
        <AddOfficeForm />
        <footer
          style={{
            textAlign: "center",
            marginTop: 40,
            color: "#777",
            fontSize: "14px",
          }}
        >
          Laget spesielt for Norkart av Zmax-17 • Desember
          2025
        </footer>
      </div>
    </div>
  );
}
