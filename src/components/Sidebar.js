import { RxDashboard } from "react-icons/rx"
import { BsFillPeopleFill } from "react-icons/bs"
import { TbWriting } from "react-icons/tb"
import { BiHelpCircle } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"
import { useRouter } from "next/router";

import Logo from "../assets/doctor.png"
import Image from "next/image"

const sideBarButtonStyle =
  "w-full py-4 px-2 rounded flex flex-row justify-start items-center hover:bg-gray-200 flex flex-row gap-4"

export default function Sidebar({ tab, setTab }) {
  const router=useRouter()
  return (
    <div className="w-96 h-full flex flex-col justify-start items-start gap-4 text-2xl">
      <div className="w-full h-[89px] flex justify-center items-center gap-6 border-t border-b border-gray-200">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <p>EzyCare</p>
      </div>
      <div className="w-full h-full flex flex-col border-r border-gray-200">
        <div className="w-full px-4">
          <p className="text-sm">Main</p>
          <button
            className={sideBarButtonStyle}
            onClick={() => {
              router.push("/admission")
            }}
          >
            <RxDashboard />
            Admission
          </button>
          <button
            className={sideBarButtonStyle}
            onClick={() => {
              setTab("home")
            }}
          >
            <RxDashboard />
            Home
          </button>
          <button
            className={sideBarButtonStyle}
            onClick={() => {
              router.push("/cases")
            }}
          >
            <BsFillPeopleFill />
            Cases
          </button>
          <button
            className={sideBarButtonStyle}
            onClick={() => {
              setTab("appointments")
            }}
          >
            <TbWriting />
            Appointments
          </button>
        </div>
        <div className="w-full px-4">
          <p className="text-sm">Support</p>

          <button
            className={sideBarButtonStyle}
            onClick={() => {
              setTab("help")
            }}
          >
            <BiHelpCircle />
            Help
          </button>
          <button
            className={sideBarButtonStyle}
            onClick={() => {
              setTab("settings")
            }}
          >
            <FiSettings />
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}
