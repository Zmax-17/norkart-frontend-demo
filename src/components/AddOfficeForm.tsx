// src/components/AddOfficeForm
import { useState } from "react";
import { useAddOffice } from "../hooks/useAddOffice";
import { useOffices } from "../hooks/useOffices";
import type { OfficeForm } from "../types/OfficeForm";

// --- constants ---

const EMPTY_FORM: OfficeForm = {
  name: "",
  type: "",
  visitAddress: "",
  postalAddress: "",
  lat: 0,
  lon: 0,
};

// Demo shortcut to make the form immediately usable.
const DEMO_FORM: OfficeForm = {
  name: "Kristiansand",
  type: "Distriktskontor",
  visitAddress:
    "Markens gate 19, 3. etg, 4611 Kristiansand",
  postalAddress:
    "Norkart AS (Kristiansand)\nAtt: Alexander N. / Roman\nMarkens Gate 19, 3. etg.\n4611 KRISTIANSAND S",
  lat: 58.1449,
  lon: 7.9938,
};

export const AddOfficeForm = () => {
  const mutation = useAddOffice();
  const { data: offices } = useOffices();

  const [form, setForm] = useState<OfficeForm>(EMPTY_FORM);

  const kristiansandExists = offices?.some(
    (o) => o.name.toLowerCase() === "kristiansand"
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "lat" || name === "lon"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Navn mangler");
      return;
    }

    if (form.lat === 0 || form.lon === 0) {
      alert("Ugyldige koordinater");
      return;
    }

    const exists = offices?.some(
      (o) =>
        o.name.toLowerCase() === form.name.toLowerCase()
    );

    if (exists) {
      alert("Dette kontoret finnes allerede.");
      return;
    }

    mutation.mutate(form, {
      onSuccess: () => {
        setForm(EMPTY_FORM);
      },
      onError: (error) => {
        alert(
          "Server sier feil: " +
            (error.message || "Ukjent feil")
        );
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <div style={{ width: "100%", maxWidth: 450 }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Legg til kontor
        </h2>

        {kristiansandExists && (
          <div
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#666",
              marginBottom: 10,
            }}
          >
            Kristiansand-kontoret er allerede lagt til
          </div>
        )}

        {mutation.isSuccess && (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "12px",
              borderRadius: "5px",
              marginBottom: "15px",
              border: "1px solid #c3e6cb",
            }}
          >
            ✅ Kontoret er lagt til!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            padding: 20,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontSize: 14, color: "#888" }}>
            Tips: Kristiansand-kontoret mangler med vilje
            for å gjøre demoen interaktiv.
          </p>

          {!kristiansandExists && (
            <div
              style={{
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <button
                type="button"
                onClick={() => setForm(DEMO_FORM)}
                style={{
                  backgroundColor: "#15804e",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Fyll ut med Kristiansand (demo)
              </button>
              <p
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "8px",
                }}
              >
                Klikk for å fylle ut skjemaet med
                Kristiansand-kontoret automatisk
              </p>
            </div>
          )}

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Navn / By"
            style={inputStyles}
          />
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type kontor"
            style={inputStyles}
          />
          <input
            name="visitAddress"
            value={form.visitAddress}
            onChange={handleChange}
            placeholder="Besøksadresse"
            style={inputStyles}
          />
          <textarea
            name="postalAddress"
            value={form.postalAddress}
            onChange={handleChange}
            placeholder="Postadresse"
            rows={3}
            style={textareaStyles}
          />
          <input
            name="lat"
            type="number"
            step="any"
            value={form.lat}
            onChange={handleChange}
            placeholder="Breddegrad"
            style={inputStyles}
          />
          <input
            name="lon"
            type="number"
            step="any"
            value={form.lon}
            onChange={handleChange}
            placeholder="Lengdegrad"
            style={inputStyles}
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            style={buttonStyles}
          >
            Opprett kontor
          </button>
        </form>
      </div>
    </div>
  );
};

// --- styles ---

const inputStyles = {
  padding: "10px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

const textareaStyles = inputStyles;

const buttonStyles = {
  backgroundColor: "#15804e",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};
