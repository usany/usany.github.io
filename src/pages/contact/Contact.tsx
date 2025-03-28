import { User } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ContactAddress from 'src/pages/contact/ContactAddress';
import ContactForm from 'src/pages/contact/ContactForm';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';

interface Props {
  userObj: User
}

function Contact({ userObj }: Props) {
  const dispatch = useDispatch()
  const { state } = useLocation()
  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })
  return (
    <div>
      <PageTitle title={'신고하기'} />
      <ContactAddress action={'발신'} label={userObj.displayName} />
      <ContactAddress action={'수신'} label={'담당자'} />
      <ContactForm userObj={userObj} user={state?.user} />
    </div>
  )
}

export default Contact
