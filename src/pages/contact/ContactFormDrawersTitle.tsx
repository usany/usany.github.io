import { useSelectors } from "src/hooks/useSelectors";

function ContactFormDrawersTitle() {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div>
      유저 검색
    </div>
  )
}

export default ContactFormDrawersTitle
