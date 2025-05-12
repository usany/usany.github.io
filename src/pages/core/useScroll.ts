import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import { changeScrollNavigation } from "src/stateSlices/scrollNavigationSlice";

const useScroll = () => {
  const scrollNavigation = useSelectors(state => state.scrollNavigation.value)
  const dispatch = useDispatch()
  const scrollEffect = () => {
    console.log(document.scrollingElement.scrollTop)
    if (document.scrollingElement.scrollTop > 80) {
      dispatch(changeScrollNavigation(true))
    } else {
      dispatch(changeScrollNavigation(false))
      // if (scrollNavigation) {
      // }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollEffect)
    return () => window.removeEventListener('scroll', scrollEffect)
  }, [])
}
export default useScroll
