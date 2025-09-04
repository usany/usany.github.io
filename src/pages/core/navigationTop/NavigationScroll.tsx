import { MessagesSquare, SearchCheck, Siren, UserRound } from "lucide-react";
import { useSelectors } from "src/hooks";

interface Props {
  'ko': {
    '/profile': string,
    '/ranking': string,
    '/piazza': string,
    '/contact': string,
  },
  'en': {
    '/profile': string,
    '/ranking': string,
    '/piazza': string,
    '/contact': string,
  },
}
const icons = {
  '/profile': <UserRound />,
  '/ranking': <SearchCheck />,
  '/piazza': <MessagesSquare />,
  '/contact': <Siren />,
}
const texts: Props = {
  'ko': {
    '/profile': '프로필',
    '/ranking': '랭킹',
    '/piazza': '대화',
    '/contact': '신고하기'
  },
  'en': {
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
