import { Link } from "react-router-dom";

const Links = ({ href, passingState, onClick, icon, description }) => {
  return (
    <h1 className="text-2xl	px-5">
      <div className="flex">
        <Link
          to={href}
          state={passingState}
          onClick={onClick}
        >
          <div className="flex px-3">
            {icon}
            <div className="px-3">{description}</div>
          </div>
        </Link>
      </div>
    </h1>
  )
}


export default Links;
