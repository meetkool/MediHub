import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/configs/firebase";
import { signOut } from "firebase/auth";
import app, { auth } from "@/configs/firebase";
import { MdLogout } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { collection, getDocs, query, where } from "firebase/firestore";

const Recorder = dynamic(() => import("@/components/Recorder"), {
  ssr: false,
});
import Sidebar from "@/components/Sidebar";
import { BsMicFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Scanner from "@/components/Scanner";
import { Blob } from "web3.storage";
import { Web3Storage } from "web3.storage";


const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQxQzBFMTk2RjhBNzdmNjI4MjI0MmU5MzFEOWY1QjFGRjIwMjI1MEUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNDE5NTI3MzQsIm5hbWUiOiJKWkYyMSJ9.YXs9x4F23BuJdqivhodhfblh46egy87gel-ICnqKnHg";

const client = new Web3Storage({ token: apiToken });
export default function Dashboard() {

  const [patient, setPatient] = useState({});
  const router = useRouter();
  const [patientName,setPatientName]=useState("John Doe")
  const [dateOfBirth,setDateOfBirth]=useState("01/01/2000")
  const [bloodGroup,setBloodGroup]=useState("A+")
  const [contactNumber,setContactNumber]=useState(9847031225)
  const [address,setAddress]=useState("Mamatha Nagar Kochi");
  const [prescription,setPrescription]=useState("")
  const [link,setLink]=useState("")
 
    const handleUpload2 = async () => {
      const myJson = {
        patientName: patientName,
        dateOfBirth: dateOfBirth,
        bloodGroup: bloodGroup,
        contactNumber: contactNumber,
        address: address,
        symptoms: symptoms,
        diagnosis:diagnosis,
        prescription:prescription
      };
      const jsonString = JSON.stringify(myJson);
      const blob = new Blob([jsonString], { type: "application/pdf" });
      const fileName = name + ".json";
      const cid = await client.put([blob], {
        wrapWithDirectory: false,
        name: fileName,
      });
      console.log(`File uploaded: https://${cid}.ipfs.w3s.link`);
      setLink(`https://${cid}.ipfs.w3s.link`)
    };

  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [tab, setTab] = useState("home")
  const [accountActionsOpen, setAccountActionsOpen] = useState(false)
  const [patientId, setPatientId] = useState(null)
  const [shouldShowModal, setShouldShowModal] = useState(false)


  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        toast("Signed out successfully");
      })
      .catch((error) => {
        toast("Error in signing out!");
      });
  };
  const getPatientDetails = async (patientId) => {
    console.log(patientId);

    const patientRef = collection(db, "patients");
    const q = query(patientRef, where("pid", "==", patientId));
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
  console.log(patient);

  useEffect(() => {
    if (patientId) {
      console.log("running useefect with pid=", patientId);

      console.log({ patientId });
      // fetch details from firebase and prefill name, age etc dynamically
      getPatientDetails(patientId);

      setShouldShowModal(false);
    } else {
      // setShouldShowModal(true);
    }
  }, [patientId]);

  const dummyPatient = {
    name: "john doe",
    dateOfBirth: "15/3/3433",
    contactNumber: "+91 987655678",
    address: "sfds\nsdfdsf,sfsdf",
    bloodGroup: "B-ve",
    imgUrl: `data:image/jpeg;base64,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`,
  };

  const handleGeneratePdf = () => {
    axios
      .post("/api/generatepdf", dummyPatient)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log({ patientId });

  if (shouldShowModal) {
    return (
      <div>
        <Scanner setPatientId={setPatientId} />
      </div>
    );
  }

  const startDiagnosis = async () => {
    setDiagnosis("Please wait...");
    fetch("/api/getadvice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDiagnosis(data.advice);
      });
  };

  return (
    <div className='h-screen w-full flex flex-row'>
      <Sidebar tab={tab} setTab={setTab} />
      <div className='h-full w-full'>
        <Navbar
          accountActionsOpen={accountActionsOpen}
          setAccountActionsOpen={setAccountActionsOpen}
        />
        {accountActionsOpen && (
          <div className='absolute rounded right-0 w-72 bg-white shadow flex flex-col gap-2 py-4 px-1'>
            <p className='font-bold text-xl px-2'>Dr. Smith</p>
            <p className='px-2'>{auth.currentUser?.email}</p>
            <button className='w-full px-2 py-2 rounded flex flex-row justify-between items-center hover:bg-gray-200'>
              Account
              <FiSettings />
            </button>
            <button
              className='w-full px-2 py-2 rounded flex flex-row justify-between items-center hover:bg-gray-200'
              onClick={logout}
            >
              Log Out
              <MdLogout />
            </button>
          </div>
        )}
        <div className='w-full flex flex-col gap-4'>
          <div className='h-64 px-8 py-4 mx-8  my-8 flex flex-col gap-2 bg-slate-100 rounded-xl'>
            <p className='text-2xl font-semibold tracking-wide'>
              Patient Details
            </p>

            <div className='w-full h-full flex flex-row justify-between items-center'>
              <div className='h-full flex flex-col justify-center items-start gap-4 text-3xl'>
                <p>
                  Name: <span className='font-bold'>John Doe</span>
                </p>
                <p>
                  Patient ID: <span className='font-bold'>{patientId}</span>
                </p>
                <p>
                  Age: <span className='font-bold'>65</span>
                </p>
                <Link href={`/patient/${patientId}`} className='text-sm'>
                  View More Details
                </Link>
              </div>
              <div className='flex flex-col justify-center items-center gap-4'>
                <button
                  onClick={() => setShouldShowModal(true)}
                  className='btn'
                >
                  Next Patient
                </button>
              </div>
            </div>
          </div>
          <div className='w-full h-72 flex flex-row justify-evenly items-center'>
            <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
              <p className='text-3xl'>Symptoms</p>
              <textarea
                className='h-full w-full'
                value={symptoms}
                onChange={(e) => {
                  setSymptoms(e.target.value);
                }}
                placeholder='Please start recording to generate symptoms'
              ></textarea>
              <button className='btn' onClick={startDiagnosis}>
                Start diagnosis
              </button>
            </div>
            <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
              <p className='text-3xl'>Diagnosis</p>
              <textarea
                className='h-full w-full'
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder='No diagnosis yet...'
              ></textarea>
            </div>
          </div>
          <div className='flex justify-center'>
            <div style={{ flex: 1 }}>
              <Recorder setSymptoms={setSymptoms} />
            </div>
          </div>


          <button className='btn' onClick={handleUpload2}>
           <a href={link} target="blank_"> {link ? link: "Generate Report"}</a>
          </button>
        </div>
      </div>
    </div>
  );
}
