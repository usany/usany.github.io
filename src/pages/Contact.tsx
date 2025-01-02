import { useState, useEffect } from 'react'
import { User } from "firebase/auth";
import PageTitle from 'src/muiComponents/PageTitle';
import ContactAddress from 'src/muiComponents/ContactAddress';
import ContactForm from 'src/muiComponents/ContactForm';
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'

interface Props {
  userObj: User
}

function Contact({ userObj }: Props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })
  return (  
    <div>
      <PageTitle title={'신고하기'}/>
      <ContactAddress action={'발신'} label={userObj.displayName}/>
      <ContactAddress action={'수신'} label={'담당자'}/>
      <ContactForm userObj={userObj} />
    </div>
  )
}

export default Contact
