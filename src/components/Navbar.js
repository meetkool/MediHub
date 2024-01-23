import { MdOutlineAccountCircle } from "react-icons/md"
import { IoMdSettings, IoMdNotifications } from "react-icons/io"

export default function Navbar({ accountActionsOpen, setAccountActionsOpen }) {
  return (
    <div className="h-20 w-full px-8 flex flex-row justify-end items-center gap-10 border border-gray-200">
      <IoMdSettings className="text-4xl" />
      <IoMdNotifications className="text-4xl" />
      <MdOutlineAccountCircle
        className="text-5xl"
        onClick={()=>{
          setAccountActionsOpen(!accountActionsOpen)
        }}
      />
    </div>
  )
}
