import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo.png";

export default function Home() {
  return (
    <>
      <div className='h-screen'>
        <nav className='p-4 flex flex-row justify-between fixed w-full '>
          <Image src={Logo} alt='Logo' width={40} height={40} />
          <Link
            href='/login'
            className='bg-blue-400 px-4 py-2 w-auto rounded text-white'
          >
            Go to Dashboard
          </Link>
        </nav>
        <div className='w-full h-[75vh] flex flex-row justify-center items-center'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold tracking-widest'>EzyCare</h1>
            <p className='text-2xl '>
              The easy and simple way to manage your clinic and patients.
            </p>
            <div className='flex flex-row gap-4'>
              <Link
                href='/signup'
                className='rounded bg-blue-400 px-4 py-1 text-white font-bold'
              >
                Signup
              </Link>
              <Link
                href='/login'
                className='border-2 rounded border-blue-400 px-4 py-1 font-bold'
              >
                Log In
              </Link>
            </div>
          </div>
          <div className=''>
            <img src='/LandingBg.jpg' alt='Product Image' className='w-96' />
          </div>
        </div>
        <div className='bg-blue-400 h-[60vh] flex flex-col justify-center items-center'>
          <h2 className='text-white text-4xl font-bold mb-4'>Features</h2>
          <div className='flex flex-col gap-8 items-center text-white'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>
                Save time and simplify consultations
              </h3>
              <p className='mt-2'>
                EzyCare makes it easy for doctors to manage their patient
                consultations efficiently, saving time and ensuring that each
                session is seamless.
              </p>
            </div>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>
                Efficient and cost-effective
              </h3>
              <p className='mt-2'>
                By streamlining the consultation process, EzyCare saves doctors
                money and makes the entire process more efficient, ultimately
                benefiting both the doctor and the patient.
              </p>
            </div>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>
                QR code and image registration management
              </h3>
              <p className='mt-2'>
                EzyCare helps doctors manage their patient registrations with
                ease by using QR codes and images to streamline the process,
                making it faster and more accurate.
              </p>
            </div>
          </div>
        </div>
        <div className='bg-gray-200 h-[60vh] flex flex-col justify-center items-center'>
          <div className='flex flex-col gap-8 items-center'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>
                Decentralized blockchain storage
              </h3>
              <p className='mt-2'>
                EzyCare stores patient records on a decentralized blockchain to
                ensure that patient data is secure, private and tamper-proof.
              </p>
            </div>




          </div>
        </div>
      </div>
    </>
  );
}
