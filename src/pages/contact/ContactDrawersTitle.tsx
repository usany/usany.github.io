import { useSelectors } from 'src/hooks/useSelectors'

const reportList = {
  ko: '신고하기 내역',
  en: 'Report list',
}
const ContactDrawersTitle = () => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'

  return <div className="flex justify-center pt-5">{reportList[index]}</div>
}

export default ContactDrawersTitle
