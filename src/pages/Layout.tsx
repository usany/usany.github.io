import { SwipeableViews } from "src/navigate/SwipeableViews";
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { useSelector, useDispatch } from 'react-redux'
import PageTitle from 'src/muiComponents/PageTitle'
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from 'react-router-dom'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'

const Layout = ({ borrow }) => {
    const dispatch = useDispatch()

    return (
        <div className='flex flex-col h-screen'>
            <PageTitle title={`${borrow ? '빌리기 ' : '빌려주기 '} 카드 등록`}/>
            <div className='px-3'>
                <Skeleton className='h-[80px] bg-light-2 dark:bg-dark-2'/>
            </div>
            <div className='flex justify-center pt-5' onClick={() => dispatch(changeBottomNavigation(1))}>
                <div className='flex border border-dashed rounded w-1/2 p-5 justify-center'>로그인이 필요합니다</div>
            </div>
        </div>
    )
}

export default Layout