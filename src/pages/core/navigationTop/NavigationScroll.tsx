import { MessagesSquare, SearchCheck, Siren, UserRound } from "lucide-react";
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
  '/': '',
  '/add': '',
  '/board': '',
  '/profile': <UserRound />,
  '/ranking': <SearchCheck />,
  '/piazza': <MessagesSquare />,
  '/contact': <Siren />,
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
const NavigationScroll = () => {
  const languages = useSelectors(state => state.languages.value)
  return (
    <div className="flex text-sm p-5 gap-5 items-center">
      {icons[location.pathname]}
      {texts[languages][location.pathname]}
    </div>
  )
};

export default NavigationScroll;
