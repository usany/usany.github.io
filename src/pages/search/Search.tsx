import { SearchCheck } from 'lucide-react'
import { useTexts } from 'src/hooks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import SearchBar from 'src/pages/search/searchBar/SearchBar'
import SearchList from 'src/pages/search/searchList/SearchList'
import SearchProfile from 'src/pages/search/searchList/SearchProfile'
import RankingListsTitle from './searchList/searchListViews/searchListViewsTitle/RankingListsTitle'

function Search() {
  const { userSearch } = useTexts()

  return (
    <>
      <PageTitle icon={<SearchCheck />} title={userSearch} />
      <SearchBar />
      <RankingListsTitle multiple={false} />
      <SearchProfile />
      <SearchList multiple={false}/>
      <RankingListsTitle multiple={true} />
      <SearchList multiple={true}/>
    </>
  )
}

export default Search
