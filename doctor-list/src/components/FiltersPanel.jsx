import React from "react";

const specialtyOptions = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Cardiologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
];

function FiltersPanel({
  consultationMode,
  setConsultationMode,
  specialties,
  setSpecialties,
  sortOption,
  setSortOption,
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Consultation Mode */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Consultation Mode</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              checked={consultationMode === "Video Consult"}
              onChange={() => setConsultationMode("Video Consult")}
              className="mr-2"
            />
            Video Consult
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              checked={consultationMode === "In Clinic"}
              onChange={() => setConsultationMode("In Clinic")}
              className="mr-2"
            />
            In Clinic
          </label>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Speciality</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {specialtyOptions.map((spec) => (
            <label key={spec} className="flex items-center">
              <input
                type="checkbox"
                checked={specialties.includes(spec)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSpecialties([...specialties, spec]);
                  } else {
                    setSpecialties(specialties.filter((s) => s !== spec));
                  }
                }}
                className="mr-2"
              />
              {spec}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Sort</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="sort"
              checked={sortOption === "fees"}
              onChange={() => setSortOption("fees")}
              className="mr-2"
            />
            Fees (Low to High)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sort"
              checked={sortOption === "experience"}
              onChange={() => setSortOption("experience")}
              className="mr-2"
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
}

export default FiltersPanel;
