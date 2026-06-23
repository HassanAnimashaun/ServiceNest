import Popover from "./Popover"

interface AvatarProp {
  onClick: () => void
}

function Avatar({ onClick }: AvatarProp) {
  return (
    <div className=" inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#E6F1FB] rounded-full ">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        className="font-medium text-base text-[#185FA5] cursor-pointer"
      >
        SN
      </button>
    </div>
  )
}

export default Avatar
