import useSelectors from './useSelectors';

const useCardsBackground = () => {
  const theme = useSelectors((state) => state.theme.value)
  const colorOne = theme === 'dark' ? '#5c6778' : '#f7fafb'
  const colorTwo = theme === 'dark' ? '#2d3848' : '#e2e8f0'
  const colorThree = theme === 'dark' ? '#1a202c' : '#cbd5df'
  return ({ colorOne, colorTwo, colorThree })
}
export default useCardsBackground
