import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'

const reportList = {
  ko: '신고하기 내역',
  en: 'Report list',
}
const ContactDrawersTrigger = () => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'

  return (
    <Button variant="outlined" form="auth">
      {reportList[index]}
    </Button>
  )
}

export default ContactDrawersTrigger
