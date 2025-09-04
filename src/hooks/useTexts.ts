import texts from '../texts.json'
import useSelectors from './useSelectors'

const useTexts = () => {
  const languages = useSelectors((state) => state.languages.value)
  const selectedText = texts[languages]

  return selectedText
}

export default useTexts
