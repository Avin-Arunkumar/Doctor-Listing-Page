import React from "react";
import DoctorCard from "./DoctorCard";

export default function DoctorList({ doctors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doc, idx) => (
        <DoctorCard key={idx} doctor={doc} />
      ))}
    </div>
  );
}
