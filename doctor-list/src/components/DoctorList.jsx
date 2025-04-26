import React, { useState, useEffect } from "react";
import FiltersPanel from "./FiltersPanel";
import DoctorCard from "./DoctorCard";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consultationMode, setConsultationMode] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"
        );
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors
    .filter((doctor) => {
      // Search filter
      if (
        searchTerm &&
        !doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Consultation mode filter
      if (consultationMode === "Video Consult" && !doctor.video_consult)
        return false;
      if (consultationMode === "In Clinic" && !doctor.in_clinic) return false;

      // Specialties filter
      if (specialties.length > 0) {
        const doctorSpecialties =
          doctor.specialities?.map((s) => s.name || s) || [];
        return specialties.some((spec) => doctorSpecialties.includes(spec));
      }

      return true;
    })
    .sort((a, b) => {
      if (sortOption === "fees") {
        const feeA = parseInt(a.fees?.replace(/[^0-9]/g, "") || 0);
        const feeB = parseInt(b.fees?.replace(/[^0-9]/g, "") || 0);
        return feeA - feeB;
      }

      if (sortOption === "experience") {
        const expA = parseInt(a.experience) || 0;
        const expB = parseInt(b.experience) || 0;
        return expB - expA;
      }

      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-3xl mx-auto my-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading doctors: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative rounded-md shadow-sm max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel */}
          <div className="lg:w-72 flex-shrink-0">
            <FiltersPanel
              consultationMode={consultationMode}
              setConsultationMode={setConsultationMode}
              specialties={specialties}
              setSpecialties={setSpecialties}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>

          {/* Doctors Grid */}
          <div className="flex-1">
            {filteredDoctors.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    {filteredDoctors.length}{" "}
                    {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
                  </h2>
                  <button
                    onClick={() => {
                      setConsultationMode("");
                      setSpecialties([]);
                      setSortOption("");
                      setSearchTerm("");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all filters
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No doctors found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setConsultationMode("");
                        setSpecialties([]);
                        setSortOption("");
                        setSearchTerm("");
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
