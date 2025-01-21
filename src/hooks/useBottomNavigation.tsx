import { useState, useEffect, useRef } from "react"

export default function useBottomNavigation() {
    const [pathname, setPathname] = useState('/')
    function changePathname(newValue) {
        setPathname(newValue)
    }
    return {pathname, changePathname}
}
