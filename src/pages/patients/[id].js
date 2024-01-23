import { useRouter } from 'next/router';

const patients = [
  {
    patientId: "001",
    symptoms: ["Cough", "Fever", "Difficulty breathing"],
    diagnosis: "COVID-19",
    contactNumber: "+1 123 456 7890",
    email: "johndoe@example.com",
    dateOfBirth: "1990-01-01",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    patientId: "002",
    symptoms: ["Headache", "Dizziness"],
    diagnosis: "Migraine",
    contactNumber: "+1 234 567 8901",
    email: "janedoe@example.com",
    dateOfBirth: "1985-02-01",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    patientId: "003",
    symptoms: ["Chest pain", "Shortness of breath"],
    diagnosis: "Heart attack",
    contactNumber: "+1 345 678 9012",
    email: "jacksmith@example.com",
    dateOfBirth: "1975-03-01",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    patientId: "004",
    symptoms: ["Fatigue", "Joint pain"],
    diagnosis: "Rheumatoid arthritis",
    contactNumber: "+1 456 789 0123",
    email: "janesmith@example.com",
    dateOfBirth: "1980-04-01",
    imageUrl: "https://via.placeholder.com/150",
  },
];

export default function PatientDetails() {
  const router = useRouter();
  const { id } = router.query;
  const patient = patients.find((p) => p.patientId === id);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <img src={patient.imageUrl} alt="Patient" className="w-24 h-24 rounded-full mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-center mb-2">{patient.diagnosis}</h1>
        <h2 className="text-lg font-bold text-center mb-4">Symptoms</h2>
        <ul className="list-disc list-inside mb-4">
          {patient.symptoms.map((symptom) => (
            <li key={symptom}>{symptom}</li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold mb-2">Diagnosis</h2>
            <p>{patient.diagnosis}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Contact Number</h2>
            <p>{patient.contactNumber}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Email</h2>
            <p>{patient.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Date of Birth</h2>
            <p>{patient.dateOfBirth}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Patient ID</h2>
            <p>{patient.patientId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
