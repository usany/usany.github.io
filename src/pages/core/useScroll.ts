import { useEffect } from "react";

const scrollEffect = () => {
  console.log(document.scrollingElement.scrollTop)
  if (document.scrollingElement.scrollTop > 100) {

  }
}
const useScroll = () => {
  useEffect(() => {
    window.addEventListener('scroll', scrollEffect)
    return () => window.removeEventListener('scroll', scrollEffect)
  })
}
export default useScroll
