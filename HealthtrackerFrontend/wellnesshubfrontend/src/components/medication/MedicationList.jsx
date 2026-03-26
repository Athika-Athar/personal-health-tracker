import { useEffect, useState } from "react";
import axios from "axios";

export default function MedicationList({ reload }) {

  const [medications, setMedications] = useState([]);

  // ✅ get logged-in userId
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchMedications();
    }
  }, [reload, userId]);

  const fetchMedications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/medications/${userId}`
      );
      setMedications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // group by medicine name
  const groupedMedications = Object.values(
    medications.reduce((acc, med) => {
      if (!acc[med.name]) {
        acc[med.name] = {
          id: med.id,
          name: med.name,
          dosage: med.dosage,
          times: [med.time],
        };
      } else {
        acc[med.name].times.push(med.time);
      }
      return acc;
    }, {})
  );

  const deleteMedication = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8081/api/medications/${id}`
      );
      fetchMedications();
    } catch (err) {
      console.log(err);
    }
  };

  const getBadgeColor = (time) => {
    if (time.toLowerCase().includes("morning"))
      return "bg-yellow-200 text-yellow-800";
    if (time.toLowerCase().includes("afternoon"))
      return "bg-blue-200 text-blue-800";
    if (time.toLowerCase().includes("night"))
      return "bg-purple-200 text-purple-800";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Medications</h2>

      {groupedMedications.length === 0 && (
        <p className="text-gray-500">No medications added yet.</p>
      )}

      {groupedMedications.length > 0 && (
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Medicine</th>
              <th className="p-3 text-left">Dosage</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {groupedMedications.map((m, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">💊 {m.name}</td>
                <td className="p-3">{m.dosage}</td>
                <td className="p-3 flex gap-2">
                  {m.times.map((t, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded text-xs ${getBadgeColor(t)}`}
                    >
                      {t}
                    </span>
                  ))}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteMedication(m.id)}
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}