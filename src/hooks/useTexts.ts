import { useSelectors } from './hooks'
import texts from '../texts.json'

const useTexts = () => {
  const languages = useSelectors((state) => state.languages.value)
  const selectedText = texts[languages]

  return selectedText
}

export default useTexts
