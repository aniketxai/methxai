function DashboardSummary({ totalPatients, normalCount, urgentCount }) {
  return (
    <div className="dashboard-summary">
      <div className="summary-card">
        <h3>Total Patients</h3>
        <p className="count">{totalPatients}</p>
      </div>
      <div className="summary-card normal">
        <h3>Normal Cases</h3>
        <p className="count">{normalCount}</p>
      </div>
      <div className="summary-card urgent">
        <h3>Urgent Cases</h3>
        <p className="count">{urgentCount}</p>
      </div>
    </div>
  );
}

export default DashboardSummary;
