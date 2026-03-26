import { useState } from "react";
import AddMedication from "../components/medication/AddMedication";
import MedicationList from "../components/medication/MedicationList";

export default function MedicationPage() {

  const [reload, setReload] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <AddMedication onAdded={() => setReload(!reload)} />

        <MedicationList reload={reload} />

      </div>

    </div>
  );
}