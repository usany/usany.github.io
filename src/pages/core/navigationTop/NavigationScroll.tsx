import { MessagesSquare, SearchCheck, Siren, UserRound } from "lucide-react";
import { useSelectors } from "src/hooks";
import texts from '../../../texts.json'
type RoutePath = '/profile' | '/ranking' | '/piazza' | '/contact';

interface Props {
  ko: {
    '/profile': string,
    '/ranking': string,
    '/piazza': string,
    '/contact': string,
  },
  en: {
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
// const texts: Props = {
//   ko: {
//     '/profile': '프로필',
//     '/ranking': '랭킹',
//     '/piazza': '채팅',
//     '/contact': '신고'
//   },
//   en: {
//     '/profile': 'User Profile',
//     '/ranking': 'User Ranking',
//     '/piazza': 'Chats',
//     '/contact': 'Report'
//   }
// }

const isRoutePath = (path: string) => {
  return ['/profile', '/ranking', '/piazza', '/contact'].includes(path);
};

const NavigationScroll = () => {
  const languages = useSelectors(state => state.languages.value) as 'ko' | 'en';
  const currentPath = location.pathname as RoutePath;
  if (!isRoutePath(currentPath)) {
    return null
  }

  return (
    <div className="flex text-sm p-5 gap-5 items-center">
      {icons[currentPath]}
      {texts[languages][currentPath]}
    </div>
  );
};

export default NavigationScroll;
