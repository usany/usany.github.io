import { UserRound } from "lucide-react";
import { useSelectors } from "src/hooks/useSelectors";

interface Props {
  'ko': {
    '/': string,
    '/add': string,
    '/board': string,
    '/profile': string,
    '/ranking': string,
    '/piazza': string,
    '/contact': string,
  },
  'en': {
    '/': string,
    '/add': string,
    '/board': string,
    '/profile': string,
    '/ranking': string,
    '/piazza': string,
    '/contact': string,
  },
}
const icons = {
  '/': '내 상태',
  '/add': '등록',
  '/board': '게시판',
  '/profile': <UserRound />,
  '/ranking': '랭킹',
  '/piazza': '대화',
  '/contact': '신고하기',
}
const texts: Props = {
  'ko': {
    '/': '내 상태',
    '/add': '등록',
    '/board': '게시판',
    '/profile': '프로필',
    '/ranking': '랭킹',
    '/piazza': '대화',
    '/contact': '신고하기'
  },
  'en': {
    '/': 'My Status',
    '/add': 'Registeration',
    '/board': 'Board',
    '/profile': 'User Profile',
    '/ranking': 'User Ranking',
    '/piazza': 'Chats',
    '/contact': 'Report'
  }
}
const actions = {
  'ko': ['빌리기', '빌려주기'],
  'en': ['Borrowing', 'Lending']
}
const NavigationScroll = () => {
  const languages = useSelectors(state => state.languages.value)
  const tabs = useSelectors(state => state.tabs.value)
  return (
    <div className='flex gap-1'>
      {(location.pathname === '/add' || location.pathname === '/board') && <div>{actions[languages][tabs]}</div>}
      <div>{texts[languages][location.pathname]}</div>
    </div>
    // <div className='flex gap-1'>
    //   {(location.pathname === '/add' || location.pathname === '/board') && <div>{actions[languages][tabs]}</div>}
    //   <div>{texts[languages][location.pathname]}</div>
    // </div>
  )
};

export default NavigationScroll;
