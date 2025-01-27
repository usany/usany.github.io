import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from 'src/store'

export const useSelectors = useSelector.withTypes<RootState>()