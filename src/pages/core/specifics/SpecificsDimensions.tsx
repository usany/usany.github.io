import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from 'react-router-dom'
import Btn from 'src/Btn'
import Steppers from 'src/pages/add/Steppers'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Button from '@mui/material/Button'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
// import { CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip'
// import { useBottomNavigationStore } from 'src/store'
import BeachAccess from '@mui/icons-material/BeachAccess'
import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import Divider from '@mui/material/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { User } from 'firebase/auth'
import Avatars from 'src/pages/core/Avatars'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import staticImg from 'src/assets/pwa-512x512.png'
import { Building, Watch } from 'lucide-react'

interface Props {
  message: {}
}

function SpecificsDimensions({ message }: Props) {
  return (
    <div className="flex justify-around gap-1 pt-5">
      <div className="flex items-center">
        <Building />
        <div className="px-1">전달 장소:</div>
        <Chip
          label={`${message.text.count} ${message.text.counter} ${message.text.counting}`}
        />
      </div>
      <div className="flex items-center">
        <Watch />
        <div>
          <div className="flex items-center">
            <div className="px-1">대여 시간:</div>
            <Chip
              label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
            />
          </div>
          <div className="flex items-center">
            <div className="px-1">반납 시간:</div>
            <Chip
              label={`${message.text.clocker.year}.${message.text.clocker.month}.${message.text.clocker.day} ${message.text.clocker.hour}:${message.text.clocker.minute}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecificsDimensions
