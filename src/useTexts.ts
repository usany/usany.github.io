import { useSelectors } from './hooks/useSelectors'
import texts from './texts.json'

const useTexts = (text) => {
  const languages = useSelectors((state) => state.languages.value)
  const selectedText = texts[languages][text]

  return selectedText
}

export default useTexts
