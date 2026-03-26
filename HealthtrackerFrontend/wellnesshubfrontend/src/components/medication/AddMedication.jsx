import { useState } from "react";
import axios from "axios";

export default function AddMedication({ onAdded }) {

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");

  // ✅ get logged-in userId
  const userId = localStorage.getItem("userId");

  const addMedication = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/medications?userId=${userId}`,
        { name, dosage, time }
      );

      setName("");
      setDosage("");
      setTime("");

      onAdded();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Medication</h2>

      <form onSubmit={addMedication} className="space-y-4">

        <input
          type="text"
          placeholder="Medication Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Dosage (e.g. 500mg)"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Time (Morning / Afternoon / Night)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Medication
        </button>

      </form>
    </div>
  );
}