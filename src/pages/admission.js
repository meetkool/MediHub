import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "@/configs/firebase";
import TakePhoto from "@/components/takePhoto";

function Onboarding() {
  const EzyCare = collection(db, "patients");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const q = query(EzyCare);
  const getPatients = async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCount(count + 1);
      console.log(
        `${doc.id}  ${doc.data().PatientName} ${doc.data().dateOfBirth}`
      );
    });
  };
  useEffect(() => {
    getPatients();
  }, []);

  const [showUploadPhotoModal, setShowUploadPhotoModal] = useState(false);
  const [patientImageUrl, setPatientImageurl] = useState(false);

  const uploadFireBase = async () => {
    addDoc(EzyCare, {
      TimeStamp: new Date().toLocaleString(),
      pid: count + 1,
      PatientName: name,
      dateOfBirth: dateOfBirth,
      bloodGroup: bloodGroup,
      contactNumber: contactNumber,
      address: address,
      email: email,
      patientImageUrl,
      cid: [],
    })
      .then(() => {
        toast("Succesfully added new user");
      })
      .catch((err) => {
        toast(
          "There seems to be some error in adding right now. Please check details and try again"
        );
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!name || !dateOfBirth || !bloodGroup || !contactNumber || !address || !patientImageUrl || !email) {
    if (!name) {
      toast("Please fill in all the fields");
    } else {
      uploadFireBase();
    }
  };

  const handleUpload2 = async () => {
    const myJson = {
      patientName: patientName,
      dateOfBirth: dateOfBirth,
      bloodGroup: bloodGroup,
      contactNumber: contactNumber,
      address: address,
    };
    const jsonString = JSON.stringify(myJson);
    const blob = new Blob([jsonString], { type: "application/json" });
    const fileName = name + ".json";
    const cid = await client.put([blob], {
      wrapWithDirectory: false,
      name: fileName,
    });
    console.log(`File uploaded: https://web3.storage/ipfs/${cid}`);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#FBFAF5]'>
      <div
        className='flex flex-col  rounded-lg  shadow-md p-10 bg-[#FBFAF5]'
        // onSubmit={uploadFireBase}
      >
        <h1 className='text-3xl font-semibold mb-5'>Patient Admission</h1>
        <div className='flex flex-col mb-4'>
          <label htmlFor='name' className='mb-2 font-semibold text-gray-700'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border rounded-lg py-2 px-3 text-gray-700'
            placeholder='Enter patient name'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label
            htmlFor='dateOfBirth'
            className='mb-2 font-semibold text-gray-700'
          >
            Date of Birth
          </label>
          <input
            type='date'
            id='dateOfBirth'
            name='dateOfBirth'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className='border rounded-lg py-2 px-3 text-gray-700'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label
            htmlFor='bloodGroup'
            className='mb-2 font-semibold text-gray-700'
          >
            Blood Group
          </label>
          <input
            type='text'
            id='bloodGroup'
            name='bloodGroup'
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className='border rounded-lg py-2 px-3 text-gray-700'
            placeholder='Enter blood group'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor='email' className='mb-2 font-semibold text-gray-700'>
            Email
          </label>
          <input
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded-lg py-2 px-3 text-gray-700'
            placeholder='Enter email'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label
            htmlFor='contactNumber'
            className='mb-2 font-semibold text-gray-700'
          >
            Contact Number
          </label>
          <input
            type='tel'
            id='contactNumber'
            name='contactNumber'
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className='border rounded-lg py-2 px-3 text-gray-700'
            placeholder='Enter contact number'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor='address' className='mb-2 font-semibold text-gray-700'>
            Address
          </label>
          <textarea
            id='address'
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border rounded-lg py-2 px-3 text-gray-700'
            placeholder='Enter address'
          ></textarea>
        </div>
        {showUploadPhotoModal ? (
          <TakePhoto
            onClose={() => setShowUploadPhotoModal(false)}
            setImageUrl={setPatientImageurl}
          />
        ) : (
          <h2 onClick={() => setShowUploadPhotoModal(true)}>Upload Photo</h2>
        )}
        <button onClick={handleSubmit} className='bg-blue-500 rounded-md py-3'>
          Register
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
