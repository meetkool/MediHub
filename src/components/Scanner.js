import { useState, useRef, useEffect } from "react";
import { useZxing } from "react-zxing";

function Scanner({ onClose, setPatientId }) {
  const [result, setResult] = useState("");

  const { ref } = useZxing({
    onResult(res) {
      if (res && res.getText()?.length) setResult(res.getText());
    },
  });

  return (
    <div className='fixed z-50 inset-0 bg-black bg-opacity-70 flex justify-center items-center'>
      <div className='w-96 bg-white p-8 rounded-lg shadow-lg relative'>
        <div className='h-60 relative'>
          <video
            className='border-4 border-dashed border-white rounded-lg w-3/4 h-3/4'
            ref={ref}
            muted
            playsInline
          />
          <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <video
              className='border-4 border-dashed border-white rounded-lg w-3/4 h-3/4'
              ref={ref}
            />
          </div>
        </div>
        <div className='mt-4'>
          {result ? (
            <p className='text-gray-600 text-sm text-center'>
              Patient ID: {result}
            </p>
          ) : null}
        </div>
        <div className='flex justify-center mt-4'>
          {/* <button
            className='px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg'
            onClick={onClose}
          >
            Close
          </button> */}
          <button
            className='px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white'
            onClick={() => setPatientId(result)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
