import { User } from 'firebase/auth';
import { SearchCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectors } from 'src/hooks/useSelectors';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import RankingSearch from 'src/pages/search/searchBar/RankingSearch';
import RankingLists from 'src/pages/search/searchList/RankingLists';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';

interface Props {
  userObj: User
}
function Ranking({ userObj }: Props) {
  const [userSearch, setUserSearch] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  return (
    <>
      <PageTitle
        icon={<SearchCheck />}
        title={languages === 'ko' ? '유저 랭킹' : 'User Ranking'} />
      <RankingSearch changeUserSearch={(newValue: string) => setUserSearch(newValue)} />
      <RankingLists userObj={userObj} userSearch={userSearch} />
    </>
  )
}

export default Ranking
