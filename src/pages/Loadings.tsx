import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import PageTitle from 'src/muiComponents/PageTitle'
import LoadingsSkeletons from 'src/muiComponents/LoadingsSkeletons'
import { useSelector, useDispatch } from 'react-redux'
import { change } from 'src/stateSlices/cardAccordionSlice'
import { Skeleton } from "@/components/ui/skeleton"
import { User } from 'firebase/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

// interface Props {
//     userObj: User
// }
function Loadings() {
    const location = useLocation();
    // console.log(location.pathname);

    return (
        <div className='flex justify-center flex-col pb-5'>
            <div className='flex flex-col pt-5 px-3'>
                <Skeleton className={`flex h-[32px] w-1/5 rounded bg-light-2 dark:bg-dark-2`} />
            </div>
            {location.pathname === '/' &&
                <div className="flex flex-col pt-5 space-y-3 px-3">
                    <div className='flex'>
                        <Skeleton className={`flex h-[50px] w-screen rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[50px]'} width={'screen'}/> */}
                    </div>
                    <div className='flex'>
                        <Skeleton className={`flex h-[50px] w-screen rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[50px]'} width={'screen'}/> */}
                    </div>
                </div>
            }
            {location.pathname === '/profile' &&
                <div className="flex flex-col space-y-3 pt-5">
                    <div className='flex justify-center'>
                        <Skeleton className={`flex h-[192px] w-[192px] rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[192px]'} width={'[192px]'} /> */}
                    </div>
                    <div className='flex justify-center pt-10'>
                        <Skeleton className={`flex h-[50px] w-[250px] rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[50px]'} width={'[250px]'} /> */}
                    </div>
                    <div className='flex justify-center pt-10'>
                        <Skeleton className={`flex h-[88px] w-[250px] rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[88px]'} width={'[250px]'} /> */}
                    </div>
                    <div className='flex justify-center pt-10'>
                        <Skeleton className={`flex h-[65px] w-[250px] rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[65px]'} width={'[250px]'} /> */}
                    </div>
                </div>
            }
            {location.pathname === '/ranking' &&
                <div className="flex flex-col space-y-3 pt-3">
                    <div className='flex px-3'>
                        <Skeleton className={`flex h-[56px] w-screen rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[56px]'} width={'screen'} /> */}
                    </div>
                    <div className='flex px-3 pt-3'>
                        <Skeleton className={`flex h-[250px] w-screen rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[250px]'} width={'screen'} /> */}
                    </div>
                </div>
            }
            {location.pathname === '/piazza' &&
                <div className="flex flex-col space-y-3 pt-16">
                    <div className='flex px-3'>
                        <Skeleton className={`flex h-[250px] w-screen rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[250px]'} width={'screen'} /> */}
                    </div>
                </div>
            }
            {location.pathname === '/contact' &&
                <div className="flex flex-col space-y-3 pt-16">
                    <div className='flex px-3'>
                        <Skeleton className={`flex h-[250px] w-screen rounded bg-light-2 dark:bg-dark-2`} />
                        {/* <LoadingsSkeletons height={'[250px]'} width={'screen'} /> */}
                    </div>
                </div>
            }
        </div>  
    )
}

export default Loadings
