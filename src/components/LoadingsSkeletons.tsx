import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import PageTitle from 'src/muiComponents/PageTitle'
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    width: string
    height: string
}
function LoadingsSkeletons({ height, width }: Props) {
    const skeleton = `flex h-${height} w-${width} rounded bg-light-2 dark:bg-dark-2`
    return (
       <Skeleton className={`flex h-${height} w-${width} rounded bg-light-2 dark:bg-dark-2`} />
    )
}

export default LoadingsSkeletons
