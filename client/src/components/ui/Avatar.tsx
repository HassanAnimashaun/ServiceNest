interface AvatarProp {
  onClick: () => void
}

function Avatar({ onClick }: AvatarProp) {
  return (
    <div className="inline-flex items-center justify-center w-11 h-11 overflow-hidden bg-brand-blue-light rounded-full">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        className="font-medium text-base text-brand-blue-border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-full"
      >
        SN
      </button>
    </div>
  )
}

export default Avatar
