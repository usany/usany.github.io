import { useEffect } from 'react'
const useContextMenu = () => {
  useEffect(() => {
    function handleContextMenu(e: Event) {
      e.preventDefault() // prevents the default right-click menu from appearing
    }
    // add the event listener to the component's root element
    const rootElement = document.getElementById('sample')
    rootElement?.addEventListener('contextmenu', handleContextMenu)
    // remove the event listener when the component is unmounted
    return () => {
      rootElement?.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])
}
export default useContextMenu
