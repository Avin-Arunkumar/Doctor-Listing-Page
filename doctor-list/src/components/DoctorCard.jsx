import React from "react";

function DoctorCard({ doctor }) {
  const name = doctor?.name || "Doctor Name Not Available";
  const experience = doctor?.experience || "Experience not specified";
  const fees = doctor?.fees
    ? `₹${doctor.fees.replace("₹", "")}`
    : "Fees not specified";
  const specialities =
    (doctor?.specialities || []).map((s) => s?.name || s).join(", ") ||
    "Specialties not specified";
  const imageUrl =
    doctor?.photo ||
    doctor?.logo_url ||
    "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
            e.target.className = "w-full h-full object-contain bg-gray-100 p-4";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{specialities}</p>
        <p className="text-gray-700 mb-1">Experience: {experience}</p>
        <p className="text-gray-700">Consultation: {fees}</p>
      </div>
    </div>
  );
}

export default DoctorCard;
