import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"

export const useDispatches = useDispatch.withTypes<AppDispatch>()
