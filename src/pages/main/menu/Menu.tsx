import { useSelectors } from 'src/hooks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
import useContextMenu from './useContextMenu'
import useGetToken from './useGetToken'
import useSetProfile from './useSetProfile'

const titles = {
  ko: '내 상태',
  en: 'My Status',
}

function Menu() {
  const profile = useSelectors((state) => state.profile.value)
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  useSetProfile(profile)
  useGetToken(profile)
  useContextMenu()
  return (
    <div className="flex justify-center flex-col pb-5">
      <PageTitle title={titles[index]} />
      <Accordions />
    </div>
  )
}

export default Menu
