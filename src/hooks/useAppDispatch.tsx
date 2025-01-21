import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

export default function useAppDispatch({function}) {
    
    const dispatch = useDispatch()
    dispatch(function)
    return {pathname, changePathname}
}
