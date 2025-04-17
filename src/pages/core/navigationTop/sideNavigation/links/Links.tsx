import { Link } from "react-router-dom";
import { DrawerClose } from "src/components/ui/drawer";

const Links = ({ href, passingState, onClick, icon, description }) => {
  return (
    <h1 className="text-2xl	px-5">
      <div className="flex">
        <Link
          to={href}
          state={passingState}
          onClick={onClick}
        >
          <DrawerClose className="flex px-3">
            {icon}
            <div className="px-3">{description}</div>
          </DrawerClose>
        </Link>
      </div>
    </h1>
  )
}


export default Links;
