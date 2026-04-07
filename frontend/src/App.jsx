import { useState, useEffect } from 'react';
import DashboardSummary from './components/DashboardSummary';
import SearchBar from './components/SearchBar';
import PatientTable from './components/PatientTable';
import PatientDetail from './components/PatientDetail';
import patientsData from './assets/data.json';
import './App.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientNumber, setSelectedPatientNumber] = useState(null);

  useEffect(() => {
    setPatients(patientsData);
    setFilteredPatients(patientsData);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPatients(patients);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = patients.filter((patient) => {
        const symptomsMatch = patient.reported_symptoms.some((symptom) =>
          symptom.toLowerCase().includes(query)
        );
        const priorityMatch = patient.triage_priority.toLowerCase().includes(query);
        return symptomsMatch || priorityMatch;
      });
      setFilteredPatients(filtered);
    }
  }, [searchQuery, patients]);

  const totalPatients = patients.length;
  const normalCount = patients.filter((p) => p.triage_priority === 'normal').length;
  const urgentCount = patients.filter((p) => p.triage_priority === 'urgent').length;

  const handlePatientClick = (patient, index) => {
    setSelectedPatient(patient);
    setSelectedPatientNumber(index + 1);
  };

  const handleCloseDetail = () => {
    setSelectedPatient(null);
    setSelectedPatientNumber(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MethXAI Patient Dashboard</h1>
        <p className="team-name">Team MethXAI</p>
      </header>

      <main className="main-content">
        <DashboardSummary
          totalPatients={totalPatients}
          normalCount={normalCount}
          urgentCount={urgentCount}
        />

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <PatientTable patients={filteredPatients} onPatientClick={handlePatientClick} />

        {selectedPatient && (
          <PatientDetail
            patient={selectedPatient}
            patientNumber={selectedPatientNumber}
            onClose={handleCloseDetail}
          />
        )}
      </main>
    </div>
  );
}

export default App;
