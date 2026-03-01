import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "src/baseApi/serverbase";
import { DrawerClose } from "src/components/ui/drawer";
import { changeLoading } from "src/stateSlices/loadingSlice";
import { SquareArrowOutUpRight } from "lucide-react";

const Links = ({ href, passingState, icon, description }) => {
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(changeLoading(true))
    auth.signOut()
  }
  return (
    <h1 className="flex text-2xl	px-5">
      <Link
        to={href}
        state={passingState}
        onClick={href === '/' ? logOut : undefined}
      >
        <DrawerClose className="flex px-3">
          {icon}
          <div className="flex items-center gap-1 px-3">{description} {href === 'https://begin.khusan.co.kr' && <SquareArrowOutUpRight />}</div>
        </DrawerClose>
      </Link>
    </h1>
  )
}

export default Links;
