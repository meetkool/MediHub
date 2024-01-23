import { useState } from "react";
import Link from "next/link";
import { patients } from "@/utils/utils";


const Card = ({ patient }) => (
  <Link href={`/patients/${patient.patientId}`}>
    <div className='bg-white rounded-lg shadow-lg p-4 cursor-pointer'>
      <h3 className='text-lg font-bold mb-2'>{patient.diagnosis}</h3>
      <p className='text-gray-700'>{patient.symptoms.join(", ")}</p>
      <p className='text-gray-700'><b>Diagnosis: </b>{patient.diagnosis}</p>
    </div>
  </Link>
);

const Cases = () => {
  const [query, setQuery] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const q = query.toLowerCase();
    return (
      patient.symptoms.toString().toLowerCase().includes(q) ||
      patient.diagnosis.toString().toLowerCase().includes(q)
    );
  });

  return (
    <div className='container mx-auto p-4 text-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Cases</h1>
        <p>Search for symptoms of diagnosis from past cases!</p>
        <br />
      </div>
        <br />
      <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
        <div className='w-full md:w-1/3'>
          <input
            type='text'
            className='w-full rounded-md shadow-sm border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50'
            placeholder='Search symptoms...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className='w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mx-auto'>
        {filteredPatients.map((patient) => (
          <Card key={patient.patientId} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default Cases;
