// // src/components/OfficesList
import { useDeleteOffice } from "../hooks/useDeleteOffice";
import { useOffices } from "../hooks/useOffices";
import { useResetData } from "../hooks/useResetData";
import "../styles/OfficesList.css";
import { useState } from "react";

export const OfficesList = () => {
  const { data, isLoading, isError } = useOffices();
  const deleteMutation = useDeleteOffice();
  const [deletingId, setDeletingId] = useState<
    number | null
  >(null);
  const resetMutation = useResetData();

  const handleDelete = (id: number) => {
    const exists = data?.some((o) => o.id === id);
    if (!exists) {
      alert("Kontor med denne ID-en finnes ikke!");
      return;
    }

    setDeletingId(id);
    deleteMutation.mutate(id, {
      onSettled: () => setDeletingId(null),
    });
  };
  const handleReset = () => {
    resetMutation.mutate();
  };

  if (isLoading) return <div>Laster kontorer...</div>;
  if (isError || !data) {
    return (
      <div>
        Kunne ikke laste kontorene. Vennligst prøv igjen
        senere.
      </div>
    );
  }

  return (
    <div className="office-list-container">
      <h2>Kontorer</h2>
      <button
        onClick={handleReset}
        disabled={
          resetMutation.isPending || data.length > 0
        }
        title={
          data.length > 0
            ? "Fjern alle kontorer for å aktivere tilbakestillingen"
            : "Gjenopprett demodata"
        }
        style={{
          padding: "8px 16px",
          marginLeft: "10px",
          backgroundColor: "#ff8c00",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor:
            resetMutation.isPending || data.length > 0
              ? "not-allowed"
              : "pointer",
          opacity:
            resetMutation.isPending || data.length > 0
              ? 0.6
              : 1,
        }}
      >
        {resetMutation.isPending
          ? "Tilbakestiller…"
          : "Reset data til original"}
      </button>
      <p
        style={{
          marginTop: "20px",
          fontSize: "14px",
          color: "#777",
          fontStyle: "italic",
        }}
      >
        Merk: Hvis du har slettet alle kontorer - trykk
        "Reset data til original" for å få tilbake de
        opprinnelige kontorene.
        <br />
        API-et kan gå i dvale ved inaktivitet (gratis
        hosting). Første handling etter pause kan ta 10-30
        sekunder.
      </p>

      <div className="office-list">
        {data.map((office) => (
          <div
            key={office.id}
            className="office-card"
          >
            <h3>{office.name}</h3>
            <p>
              <strong>Kontor type:</strong> {office.type}
            </p>
            <p>
              <strong>Besøksadresse:</strong>
              {office.visitAddress}
            </p>
            <p>
              <strong>Postadresse:</strong>
              {office.postalAddress}
            </p>
            <p>
              <strong>Koordinater:</strong> {office.lat},
              {office.lon}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDelete(office.id)}
              disabled={deletingId === office.id}
            >
              {deletingId === office.id
                ? "Sletter…"
                : "Slett"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
