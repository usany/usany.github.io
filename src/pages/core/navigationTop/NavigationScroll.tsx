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
    '/profile': 'Profile',
    '/ranking': 'Ranking',
    '/piazza': 'Chats',
    '/contact': 'Report'
  }
}

const NavigationScroll = () => {
  const languages = useSelectors(state => state.languages.value)
  return (
    <div>
      <div className='text-lg'>{texts[languages][location.pathname]}</div>
    </div>
  )
};

export default NavigationScroll;
