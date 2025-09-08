import { useSearchParams } from 'react-router-dom'
import { useSelectors } from 'src/hooks'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'

function SearchProfile() {
  const [searchParams, setSearchParams] = useSearchParams()
  const profile = useSelectors((state) => state.profile.value)

  if (searchParams.get('search')) return null
  return (
    <Lists
      elements={[profile]}
      multiple={false}
      userSearch={null}
      ranking={true}
      handleUser={null}
    />
  )
}

export default SearchProfile
