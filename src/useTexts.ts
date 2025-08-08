import { useSelectors } from './hooks/useSelectors'
import texts from './texts.json'

const useTexts = () => {
  const languages = useSelectors((state) => state.languages.value)
  const selectedText = texts[languages]

  return selectedText
}

export default useTexts
