import { useState, useEffect, useRef } from "react"

export default function usePathname() {
    const [pathname, setPathname] = useState('/')
    function changePathname(newValue) {
        setPathname(newValue)
    }
    return {pathname, changePathname}
}
