import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/configs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { patients } from "@/utils/utils";

const getPatients = () => {
  const router = useRouter();

  const [patient, setPatient] = useState("");
  const patientRef = collection(db, "patients");
  // const q = query(patientRef, where("pid", "==", 3));
  // console.log("HIII", q.data);

  useEffect(() => {
    if (!router.isReady) return;
    console.log(router.query);
    const q = query(patientRef, where("pid", "==", parseInt(router.query.id)));
    getPatients(q);

    // codes using router.query
  }, [router.isReady]);

  const getPatients = async (q) => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(
        `${doc.id}  ${doc.data().PatientName} ${doc.data().dateOfBirth}`
      );
      setPatient({
        id: doc.id,
        PatientName: doc.data().PatientName,
        dateOfBirth: doc.data().dateOfBirth,
        bloodGroup: doc.data().bloodGroup,
        contactNumber: doc.data().contactNumber,
        address: doc.data().address,
        email: doc.data().email,
        cid: doc.data().cid,
        img: doc.data().patientImageUrl,
      });
    });
  };

  return (
    <div className="text-black flex flex-col justify-center items-center gap-16 shadow">
      <h1>Patients</h1>
      <img src={patient.img} width={100} height={100} />
      <table className="text-xs my-3">
        <tbody>
          <tr>
            <td className="px-2 py-2 text-gray-500  text-xl font-semibold">Name</td>
            <td className="px-2 py-2 text-xl ">{patient.PatientName}</td>
          </tr>
          <tr>
            <td className="px-2 py-2 text-gray-500  text-xl font-semibold">
              Date of Birth
            </td>
            <td className="px-2 py-2 text-xl ">{patient.dateOfBirth}</td>
          </tr>
          <tr>
            <td className="px-2 py-2 text-gray-500  text-xl font-semibold">
              Address
            </td>
            <td className="px-2 py-2 text-xl ">{patient.address}</td>
          </tr>
          <tr>
            <td className="px-2 py-2 text-gray-500  text-xl font-semibold">
              Phone
            </td>
            <td className="px-2 py-2 text-xl ">{patient.contactNumber}</td>
          </tr>
          <tr>
            <td className="px-2 py-2 text-gray-500  text-xl font-semibold">
              Email
            </td>
            <td className="px-2 py-2 text-xl ">{patient.email}</td>
          </tr>
        </tbody>
      </table>
      <>
        {patient.cid?.map((item) => {
          return (
            <div className="flex flex-col justify-center items-center gap-16 shadow">
              <div className="bg-blue-400 text-white">
                <button><a href={item}>Open File</a></button>

              </div>
            </div>
          );
        })}
      </>

      {/* <p>{patient.PatientName}</p>
      <p>{patient.dateOfBirth}</p>
      <p>{patient.bloodGroup}</p>
      <p>{patient.contactNumber}</p>
      <p>{patient.address}</p>
      <p>{patient.email}</p> */}
    </div>
  );
};

export default getPatients;
