import { useEffect, useState } from 'react'
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelectors } from 'src/hooks/useSelectors'
import Popups from '../core/Popups'
import ContactDrawersContent from './ContactDrawersContent'
import ContactDrawersTitle from './ContactDrawersTitle'
import ContactDrawersTrigger from './ContactDrawersTrigger'

const ContactDrawers = ({ userObj }) => {
  return (
    <>
      <Popups
        trigger={<ContactDrawersTrigger />}
        title={<ContactDrawersTitle userObj={userObj} />}
        content={<ContactDrawersContent userObj={userObj} />}
      />
    </>
  )
}

export default ContactDrawers
