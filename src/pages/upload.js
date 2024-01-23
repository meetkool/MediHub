import { Web3Storage } from "web3.storage";
import { useState } from "react";
import { Blob } from "web3.storage";
const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQxQzBFMTk2RjhBNzdmNjI4MjI0MmU5MzFEOWY1QjFGRjIwMjI1MEUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNDE5NTI3MzQsIm5hbWUiOiJKWkYyMSJ9.YXs9x4F23BuJdqivhodhfblh46egy87gel-ICnqKnHg";

const client = new Web3Storage({ token: apiToken });

export default function Upload() {
  const [file, setFile] = useState("");
  const [displayurl, setDisplayurl] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  //   1. patient name,
  // 2. date input with input text for date of birth
  // 3. blood group.
  // 4. contact number
  // 5. address
  const [patientName, setPatientName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  {
    /*function HandleUpload gets all the files inputted and then generates a CID*/
  }

  //
  const handleUpload2 = async () => {
    const myJson = {
      TimeStamp: new Date().toLocaleString(),
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

  const handleUpload = async () => {
    console.log(document.getElementById("input").files[0]);

    var fileInput = document.getElementById("input");

    console.log(fileInput, fileInput.files);

    const rootCid = await client.put(fileInput.files, {
      name: name,
      maxRetries: 3,
    });
    setDisplayurl(`https://${rootCid}.ipfs.w3s.link`); //sets the display url to the cid
    setResponse("File Uploaded Successfully"); //response is set to file uploaded successfully
    window.localStorage.setItem("cid", rootCid);
    console.log(rootCid);

    const res = await client.get(rootCid);
    const files = await res.files();
    console.log(files);
    const url = URL.createObjectURL(files[0]); //creates a url for the file
    console.log(url);

    setFile(url);
  };

  return (
    <div className="App centre-block">
      <h1 className="funky-font funky-color">M3MORY</h1>
      <h2>Decentralized file storage system</h2>

      <div className="flex-box-col ">
        <h2>Upload File</h2>
        <div class="frame">
          <div class="center">
            <div class="title">
              <h1>Drop file to upload</h1>
            </div>

            <div class="dropzone">
              <img
                src="http://100dayscss.com/codepen/upload.svg"
                class="upload-icon"
              />
            </div>
          </div>
        </div>
        {/*Input the files to be uploaded */}
        {/* 1. patient name, 2. date input with input text for date of birth 3.
        blood group. 4. contact number 5. address */}
        <input
          type="text"
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter Patient Name"
        />
        <input
          type="text"
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder="Enter Date of Birth"
        />
        <input
          type="text"
          onChange={(e) => setBloodGroup(e.target.value)}
          placeholder="Enter Blood Group"
        />
        <input
          type="text"
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Enter Contact Number"
        />
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
        />

        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Patient ID"
        />
        {/* 
        <label for="file">Choose file to upload</label> */}
        <button onClick={handleUpload2} className="submit-button">
          Submit
        </button>
        {/* On click calls the function handleUpload*/}
      </div>

      <p>{response}</p>
      <div></div>
    </div>
  );
}
