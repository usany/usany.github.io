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
    console.log(location.pathname);

    return (
        <div className='flex justify-center flex-col pb-5'>
            {location.pathname === '/' &&
                <div>
                    {/* <PageTitle title={'내 상태'}/> */}
                    <div className='flex flex-col pt-5 px-3'>
                        {/* <Skeleton className={`flex h-[32px] w-1/5 rounded bg-light-2 dark:bg-dark-2`} /> */}
                        <LoadingsSkeletons height={'[32px]'} width={'1/5'} />
                    </div>
                    <div className="flex flex-col pt-5 space-y-3 px-3">
                        <div className='flex'>
                            {/* <Skeleton className={`flex h-[50px] w-screen rounded bg-light-2 dark:bg-dark-2`} /> */}
                            <LoadingsSkeletons height={'[50px]'} width={'screen'}/>
                        </div>
                        <div className='flex'>
                            <LoadingsSkeletons height={'[50px]'} width={'screen'}/>
                        </div>
                    </div>
                </div>
            }
            {location.pathname === '/profile' &&
                <div>
                    {/* <PageTitle title={'내 프로필'}/> */}
                    <div className='flex flex-col pt-5'>
                        <div className='flex px-3'>
                            <LoadingsSkeletons height={'[32px]'} width={'1/5'} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className='flex justify-center'>
                            <LoadingsSkeletons height={'[192px]'} width={'[192px]'} />
                        </div>
                        <div className='flex justify-center pt-10'>
                            <LoadingsSkeletons height={'[50px]'} width={'[250px]'} />
                        </div>
                        <div className='flex justify-center pt-10'>
                            <LoadingsSkeletons height={'[88px]'} width={'[250px]'} />
                        </div>
                        <div className='flex justify-center pt-10'>
                            <LoadingsSkeletons height={'[65px]'} width={'[250px]'} />
                        </div>
                    </div>
                </div>
            }
            {location.pathname === '/ranking' &&
                <div>
                    {/* <PageTitle title={'유저 랭킹'}/> */}
                    <div className='flex flex-col pt-5'>
                        <div className='flex px-3'>
                            <LoadingsSkeletons height={'[32px]'} width={'1/5'} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 pt-3">
                        <div className='flex px-3'>
                            <LoadingsSkeletons height={'[56px]'} width={'screen'} />
                        </div>
                        <div className='flex px-3 pt-3'>
                            <LoadingsSkeletons height={'[250px]'} width={'screen'} />
                        </div>
                    </div>
                </div>
            }
            {location.pathname === '/piazza' &&
                <div>
                    {/* <PageTitle title={'유저 랭킹'}/> */}
                    <div className='flex flex-col pt-5'>
                        <div className='flex px-3'>
                            <LoadingsSkeletons height={'[32px]'} width={'1/5'} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 pt-16">
                        <div className='flex px-3'>
                            <LoadingsSkeletons height={'[250px]'} width={'screen'} />
                        </div>
                    </div>
                </div>
            }
            {location.pathname === '/contact' &&
                <div>
                    {/* <PageTitle title={'유저 랭킹'}/> */}
                    <div className='flex flex-col pt-5'>
                        <div className='flex px-3'>
                            <LoadingsSkeletons height={'[32px]'} width={'1/5'} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 pt-16">
                        <div className='flex px-3'>
                            <LoadingsSkeletons height={'[250px]'} width={'screen'} />
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
