function PatientTable({ patients, onPatientClick }) {
  return (
    <div className="patient-table-container">
      <table className="patient-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Symptoms</th>
            <th>Duration</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={index}
              onClick={() => onPatientClick(patient, index)}
              className="patient-row"
            >
              <td>{index + 1}</td>
              <td>
                {patient.reported_symptoms.length > 0
                  ? patient.reported_symptoms.join(', ')
                  : 'No specific symptoms'}
              </td>
              <td>{patient.symptom_duration || 'N/A'}</td>
              <td>
                <span className={`priority-badge ${patient.triage_priority}`}>
                  {patient.triage_priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;
