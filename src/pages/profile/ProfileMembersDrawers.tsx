import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, Chip } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { deleteUser } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import useCardsBackground from '../../hooks/useCardsBackground'
import DrawersBar from '../core/DrawersBar'

const ProfileMembersDrawers = ({ userObj, user }) => {
  const [confirmEmail, setConfirmEmail] = useState(false)
  const [process, setProcess] = useState(false)
  const navigate = useNavigate()
  const theme = useSelector((state) => state.theme.value)
  const languages = useSelectors((state) => state.languages.value)
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    if (value === userObj.email) {
      setConfirmEmail(true)
    } else {
      setConfirmEmail(false)
    }
  }

  useEffect(() => {
    const createdCards = user.userData?.createdCards
    const connectedCards = user.userData?.connectedCards
    const createdNumber = createdCards?.length || 0
    const connectedNumber = connectedCards?.length || 0
    if (createdNumber === 0 && connectedNumber === 0) {
      setProcess(true)
    } else {
      setProcess(false)
    }
  }, [user])
  const { color } = useCardsBackground()

  return <Drawer></Drawer>
}

export default ProfileMembersDrawers
