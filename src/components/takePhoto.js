import { useState, useRef } from "react";
import Webcam from "react-webcam";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const TakePhoto = ({ onClose, setImageUrl }) => {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const storage = getStorage();
  const patientImagesRef = ref(storage, "patientImages");

  const metadata = {
    contentType: "image/jpeg",
  };

  const handleRetake = () => {
    setPhoto(null);
  };

  const handleConfirm = async () => {
    try {
      const imageFile = await fetch(photo).then((res) => res.blob());

      const uploadTask = uploadBytesResumable(patientImagesRef, imageFile, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL)
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75'>
      <div className='relative w-full h-full max-w-md'>
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
          {photo ? (
            <>
              <img src={photo} alt='Captured' className='h-48 w-auto mb-4' />
              <div className='flex justify-center items-center space-x-4'>
                <button
                  onClick={handleRetake}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                >
                  Retake
                </button>
                <button
                  onClick={handleConfirm}
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                >
                  Confirm
                </button>
              </div>
            </>
          ) : (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat='image/png'
                className='h-48 w-auto mb-4'
              />
              <button
                onClick={() => setPhoto(webcamRef.current.getScreenshot())}
                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
              >
                Take Photo
              </button>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className='absolute top-0 right-0 mt-4 mr-4 text-white hover:text-gray-300'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TakePhoto;
