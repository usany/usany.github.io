import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import RankingSearch from 'src/pages/search/searchBar/RankingSearch';
import RankingLists from 'src/pages/search/searchList/RankingLists';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';

interface Props {
  userObj: User
}
function Ranking({ userObj }: Props) {
  const [userSearch, setUserSearch] = useState('')
  // const [rank, setRank] = useState([])
  // const [ranker, setRanker] = useState([])
  // const [loadedImage, setLoadedImage] = useState([])
  // const [loadedImageIndex, setLoadedImageIndex] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  return (
    <>
      <PageTitle title='유저 랭킹' />
      <RankingSearch changeUserSearch={(newValue: string) => setUserSearch(newValue)} />
      <RankingLists userObj={userObj} userSearch={userSearch} />
    </>
  )
}

export default Ranking
