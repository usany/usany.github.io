import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import PageTitle from 'src/muiComponents/PageTitle'
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
    console.log(location.pathname);

    return (
        <div className='flex justify-center flex-col pb-5'>
            {location.pathname === '/' &&
                <div>
                    <PageTitle title={'내 상태'}/>
                    <div className='flex px-3'>
                        <Skeleton className="flex h-[50px] w-screen rounded bg-light-1 dark:bg-dark-1" />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className='flex px-3'>
                            <Skeleton className="flex h-[50px] w-screen rounded bg-light-1 dark:bg-dark-1" />
                        </div>
                        <div className='flex px-3'>
                            <Skeleton className="flex h-[50px] w-screen rounded bg-light-1 dark:bg-dark-1" />
                        </div>
                    </div>
                </div>
            }
            {location.pathname === '/profile' &&
                <div>
                    <PageTitle title={'내 프로필'}/>
                    <div className="flex flex-col space-y-3">
                        <div className='flex px-3'>
                            <Skeleton className="flex h-[192px] w-[192px] rounded bg-light-1 dark:bg-dark-1" />
                        </div>
                        <div className='flex px-3'>
                            <Skeleton className="flex h-[50px] w-screen rounded bg-light-1 dark:bg-dark-1" />
                        </div>
                    </div>
                </div>
            }
            {location.pathname === '/ranking' &&
                <div>
                    <PageTitle title={'유저 랭킹'}/>
                    <div className="flex flex-col space-y-3">
                        <div className='flex px-3'>
                            <Skeleton className="flex h-[192px] w-[192px] rounded bg-light-1 dark:bg-dark-1" />
                        </div>
                        <div className='flex px-3'>
                            <Skeleton className="flex h-[50px] w-screen rounded bg-light-1 dark:bg-dark-1" />
                        </div>
                    </div>
                </div>
            }
            {/* <Skeleton />
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div> */}
        </div>  
    )
}

export default Loadings
