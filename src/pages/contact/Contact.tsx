import { User } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useSelectors } from "src/hooks/useSelectors";
import ContactAddress from 'src/pages/contact/ContactAddress';
import ContactForm from 'src/pages/contact/ContactForm';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';

const titles = {
  ko: '신고하기',
  en: 'Report'
}
const sending = {
  ko: '발신',
  en: 'Sending'
}
const receiving = {
  ko: '수신',
  en: 'Receiving'
}
const user = {
  ko: '담당자',
  en: 'supervisor'
}
interface Props {
  userObj: User
}

function Contact({ userObj }: Props) {
  const dispatch = useDispatch()
  const { state } = useLocation()
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })
  return (
    <div>
      <PageTitle title={titles[index]} />
      <ContactAddress action={sending[index]} label={userObj.displayName} />
      <ContactAddress action={receiving[index]} label={user[index]} />
      <ContactForm userObj={userObj} user={state?.user} />
    </div>
  )
}

export default Contact
