import TextField from '@mui/material/TextField';
import { useSearchParams } from 'react-router-dom';
import useCardsBackground from 'src/hooks/useCardsBackground';
import { useSelectors } from 'src/hooks/useSelectors';

function RankingSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const languages = useSelectors((state) => state.languages.value)
  const onChangeUserSearch = (event) => {
    const { target: { value } } = event
    setSearchParams(searchParams => {
      searchParams.set('search', value)
      if (!value) {
        searchParams.delete('search')
      }
      return searchParams
    })
  }
  const { colorOne, colorTwo } = useCardsBackground()
  return (
    <div className='px-5 flex justify-center'>
      <TextField sx={{ width: '1000px', bgcolor: colorTwo, borderRadius: '5px' }} label={languages === 'ko' ? '유저 이름' : 'User name'} onChange={onChangeUserSearch} />
    </div>
  )
}

export default RankingSearch
