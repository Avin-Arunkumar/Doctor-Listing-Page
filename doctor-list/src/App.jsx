import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FiltersPanel from "./components/FiltersPanel";
import DoctorList from "./components/DoctorList";
import Footer from "./components/Footer";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [consultationMode, setConsultationMode] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch once
  useEffect(() => {
    fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(console.error);
  }, []);

  // Initialize filters from URL
  useEffect(() => {
    const s = searchParams.get("search") || "";
    const mode = searchParams.get("mode") || "";
    const multi = searchParams.getAll("specialty");
    const sort = searchParams.get("sort") || "";
    setSearchText(s);
    setConsultationMode(mode);
    setSpecialties(multi);
    setSortOption(sort);
  }, [searchParams]);

  // Re-filter & sync URL
  useEffect(() => {
    let result = [...doctors];

    if (searchText) {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (consultationMode) {
      result = result.filter((d) => d.consultation_mode === consultationMode);
    }

    if (specialties.length) {
      result = result.filter((d) =>
        specialties.every((sp) => d.specialities.includes(sp))
      );
    }

    if (sortOption === "fees") {
      result.sort((a, b) => a.fees - b.fees);
    } else if (sortOption === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);

    // Build new query params
    const params = {};
    if (searchText) params.search = searchText;
    if (consultationMode) params.mode = consultationMode;
    if (specialties.length) params.specialty = specialties;
    if (sortOption) params.sort = sortOption;
    setSearchParams(params, { replace: true });
  }, [
    doctors,
    searchText,
    consultationMode,
    specialties,
    sortOption,
    setSearchParams,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <FiltersPanel
          consultationMode={consultationMode}
          setConsultationMode={setConsultationMode}
          specialties={specialties}
          setSpecialties={setSpecialties}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <main className="flex-1 p-4">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            suggestions={doctors}
          />
          <DoctorList doctors={filteredDoctors} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
