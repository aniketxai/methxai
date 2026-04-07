import { useState } from 'react';

function PatientDetail({ patient, patientNumber, onClose }) {
  const [doctorReview, setDoctorReview] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = () => {
    if (doctorReview.trim()) {
      setReviewSubmitted(true);
    }
  };

  const getRecommendation = () => {
    if (patient.triage_priority === 'urgent') {
      return 'Immediate medical attention required';
    }
    return 'Basic care and rest advised';
  };

  return (
    <div className="patient-detail-overlay" onClick={onClose}>
      <div className="patient-detail-card" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <h2>Patient #{patientNumber}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3>Patient Summary</h3>
            <p>{patient.patient_summary}</p>
          </div>

          <div className="detail-section">
            <h3>Symptoms</h3>
            <p>
              {patient.reported_symptoms.length > 0
                ? patient.reported_symptoms.join(', ')
                : 'No specific symptoms'}
            </p>
          </div>

          <div className="detail-section">
            <h3>Duration</h3>
            <p>{patient.symptom_duration || 'N/A'}</p>
          </div>

          <div className="detail-section">
            <h3>Vitals</h3>
            <div className="vitals-grid">
              <div className="vital-item">
                <span className="vital-label">Heart Rate:</span>
                <span className="vital-value">{patient.vitals.heart_rate} bpm</span>
              </div>
              <div className="vital-item">
                <span className="vital-label">Blood Pressure:</span>
                <span className="vital-value">{patient.vitals.blood_pressure}</span>
              </div>
              <div className="vital-item">
                <span className="vital-label">Temperature:</span>
                <span className="vital-value">{patient.vitals.temperature}°C</span>
              </div>
              <div className="vital-item">
                <span className="vital-label">SpO2:</span>
                <span className="vital-value">{patient.vitals.spo2}%</span>
              </div>
              <div className="vital-item">
                <span className="vital-label">Respiratory Rate:</span>
                <span className="vital-value">{patient.vitals.respiratory_rate} /min</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Priority</h3>
            <span className={`priority-badge ${patient.triage_priority}`}>
              {patient.triage_priority}
            </span>
          </div>

          <div className="detail-section">
            <h3>Reason for Priority</h3>
            <p>{patient.reason_for_priority}</p>
          </div>

          <div className="detail-section">
            <h3>AI Confidence</h3>
            <p>{(patient.confidence * 100).toFixed(0)}%</p>
          </div>

          <div className={`recommendation-box ${patient.triage_priority}`}>
            <h3>Recommendation</h3>
            <p>{getRecommendation()}</p>
          </div>

          <div className="status-indicator">
            <div className="status-step completed">AI Processed</div>
            <div className="status-arrow">→</div>
            <div className={`status-step ${reviewSubmitted ? 'completed' : 'active'}`}>
              Waiting for Doctor
            </div>
            <div className="status-arrow">→</div>
            <div className={`status-step ${reviewSubmitted ? 'completed' : ''}`}>
              Completed
            </div>
          </div>

          <div className="detail-section">
            <h3>Doctor Review</h3>
            {!reviewSubmitted ? (
              <div className="review-form">
                <textarea
                  value={doctorReview}
                  onChange={(e) => setDoctorReview(e.target.value)}
                  placeholder="Enter your review notes..."
                  className="review-textarea"
                  rows="4"
                />
                <button onClick={handleSubmitReview} className="submit-btn">
                  Submit Review
                </button>
              </div>
            ) : (
              <div className="review-submitted">
                <p className="success-message">Review submitted successfully!</p>
                <p className="review-content">{doctorReview}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetail;
