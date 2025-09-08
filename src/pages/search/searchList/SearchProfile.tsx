import { useSearchParams } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'

function SearchProfile() {
  const [searchParams, setSearchParams] = useSearchParams()
  const profile = useSelectors((state) => state.profile.value)

  if (searchParams.get('search')) return null
  return (
    <div className="flex truncate justify-center">
      <div className="w-[1000px]">
        <Lists
          elements={[profile]}
          multiple={false}
          userSearch={null}
          ranking={true}
          handleUser={null}
        />
      </div>
    </div>
  )
}

export default SearchProfile
