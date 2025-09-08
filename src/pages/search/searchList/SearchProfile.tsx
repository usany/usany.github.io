import { useSearchParams } from 'react-router-dom'
import { useSelectors } from 'src/hooks'

function SearchProfile() {
  const [searchParams, setSearchParams] = useSearchParams()
  const profile = useSelectors((state) => state.profile.value)

  if (searchParams.get('search')) return null
  return (
    <ListsView
      elements={[profile]}
      multiple={false}
      userSearch={null}
      handleUser={null}
    />
  )
}

export default SearchProfile
