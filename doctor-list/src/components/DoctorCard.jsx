import React from "react";

export default function DoctorCard({ doctor }) {
  // build a comma-separated string of names
  const specs = (doctor.specialities || [])
    .map((s) => (typeof s === "string" ? s : s.name))
    .join(", ");

  return (
    <div className="border rounded p-4" data-testid="doctor-card">
      <img
        src={doctor.logo_url}
        alt={doctor.name}
        className="w-full h-40 object-cover rounded mb-2"
      />

      <h3 className="text-lg font-semibold" data-testid="doctor-name">
        {doctor.name}
      </h3>

      <p className="text-sm mb-1" data-testid="doctor-specialty">
        {specs}
      </p>

      <p className="text-sm" data-testid="doctor-experience">
        Experience: {doctor.experience} years
      </p>

      <p className="text-sm" data-testid="doctor-fee">
        Fees: ₹{doctor.fees}
      </p>
    </div>
  );
}
