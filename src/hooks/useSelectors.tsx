import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "src/store"

export const useSelectors = useSelector.withTypes<RootState>()
