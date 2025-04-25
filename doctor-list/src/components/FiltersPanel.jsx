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
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian/Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ayurveda",
  "Homeopath",
];

export default function FiltersPanel({
  consultationMode,
  setConsultationMode,
  specialties,
  setSpecialties,
  sortOption,
  setSortOption,
}) {
  const onModeChange = (e) => setConsultationMode(e.target.value);
  const onSpecChange = (e) => {
    const val = e.target.value;
    if (e.target.checked) setSpecialties([...specialties, val]);
    else setSpecialties(specialties.filter((s) => s !== val));
  };
  const onSortChange = (e) => setSortOption(e.target.value);

  return (
    <aside className="w-64 border-r p-4">
      {/* Consultation Mode */}
      <div>
        <h3 className="font-semibold mb-2" data-testid="filter-header-moc">
          Consultation Mode
        </h3>
        <label className="block">
          <input
            type="radio"
            name="mode"
            value="Video Consult"
            checked={consultationMode === "Video Consult"}
            onChange={onModeChange}
            data-testid="filter-video-consult"
          />{" "}
          Video Consult
        </label>
        <label className="block">
          <input
            type="radio"
            name="mode"
            value="In Clinic"
            checked={consultationMode === "In Clinic"}
            onChange={onModeChange}
            data-testid="filter-in-clinic"
          />{" "}
          In Clinic
        </label>
      </div>

      {/* Specialities */}
      <div className="mt-4">
        <h3
          className="font-semibold mb-2"
          data-testid="filter-header-speciality"
        >
          Speciality
        </h3>
        <div className="max-h-64 overflow-y-auto">
          {specialtyOptions.map((spec, i) => {
            const tid = `filter-specialty-${spec
              .replace(/\s+/g, "-")
              .replace("/", "-")}`;
            return (
              <label className="block" key={i}>
                <input
                  type="checkbox"
                  value={spec}
                  checked={specialties.includes(spec)}
                  onChange={onSpecChange}
                  data-testid={tid}
                />{" "}
                {spec}
              </label>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2" data-testid="filter-header-sort">
          Sort
        </h3>
        <label className="block">
          <input
            type="radio"
            name="sort"
            value="fees"
            checked={sortOption === "fees"}
            onChange={onSortChange}
            data-testid="sort-fees"
          />{" "}
          Fees (Asc)
        </label>
        <label className="block">
          <input
            type="radio"
            name="sort"
            value="experience"
            checked={sortOption === "experience"}
            onChange={onSortChange}
            data-testid="sort-experience"
          />{" "}
          Experience (Desc)
        </label>
      </div>
    </aside>
  );
}
