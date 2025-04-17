import { Chip } from "@mui/material"

const Chips = ({ label, onClick, className }) => {
  return (
    // <div className={`${className} rounded-xl w-fit p-1 bg-light-2 dark:bg-dark-2 px-3`} onClick={onClick}>{label}</div>
    <div onClick={onClick}>
      <Chip label={label} />
    </div>
  )
}

export default Chips
