import { useState, useEffect, useMemo, useCallback } from 'react'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import PageTitle from 'src/muiComponents/PageTitle'
import ProfileAvatar from 'src/muiComponents/ProfileAvatar'
import ProfileForm from 'src/muiComponents/ProfileForm'
import ProfileCards from 'src/muiComponents/ProfileCards'
import ProfileActions from 'src/muiComponents/ProfileActions'
// import ProfileActions from 'src/muiComponents/ProfileActions'
import ProfileConnects from 'src/muiComponents/ProfileConnects'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { blue } from '@mui/material/colors';
import { useBottomNavigationStore, useAvatarColorStore } from 'src/store'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Check } from "lucide-react"
import { useImmer } from "use-immer"
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface Props {
  userObj: {uid: string, displayName: string},
}

function Profile({ userObj }: Props) {
  const [attachment, setAttachment] = useState('')
  const {state} = useLocation()
  const [profileDialog, setProfileDialog] = useState(false)
  const profileColor = useAvatarColorStore((state) => state.profileColor)
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
  const [allies, setAllies] = useState({
    followers: {
      number: null,
      list: null
    },
    followings: {
      number: null,
      list: null
    }
  })
  const handleFollowers = ({ number, list }) => {
    setAllies({followers: {number: number, list: list}, followings: allies.followings})
  }
  const handleFollowings = ({ number, list }) => {
    setAllies({...allies, followings: {number: number, list: list}})
  }
  useEffect(() => {
    const bringAllies = async () => {
      const docRef = doc(dbservice, `members/${state.element.uid}`)
      const myDocSnap = await getDoc(docRef)
      const {followerNum, followingNum, followers, followings} = myDocSnap.data()
      const alliesObj = {
        followers: {number: followerNum || 0, list: followers || []},
        followings: {number: followingNum || 0, list: followings || []}
      }
      console.log(alliesObj)
      // handleFollowers(alliesObj.followers)
      // handleFollowings(alliesObj.followings)
      console.log(state.element.uid)
    }
    bringAllies()
  }, [allies])
  console.log(allies)
  useEffect(() => {
    if (userObj.displayName === 'screen') {
      getDownloadURL(ref(storage, 'screen.jpg'))
      .then((url) => {
        setAttachment(url)
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }, [])
  
  useEffect(() => {
    handleBottomNavigation(5)
  })
  const handleClose = () => {
    setProfileDialog(false)
  }
  // const actions = [
  //   { action: 'borrow', number: borrowMessage.length+borrowRegisteredMessage.length,
  //     fill: 'red'},
  //   { action: 'lend', number: lendMessage.length+lendRegisteredMessage.length,
  //     fill: 'blue'},
  // ]
  // const labels = {
  //   number: {
  //     label: 'total',
  //   },
  //   borrow: {
  //     label: 'borrow',
  //     color: '#2563eb',
  //   },
  //   lend: {
  //     label: 'lend',
  //     color: '#60a5fa',
  //   },
  // } satisfies ChartConfig
  // const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)

  return (
    <div>
      <PageTitle title={`${state.element.displayName} 프로필`}/>
      <ProfileAvatar userObj={userObj} user={state.element} handleProfileDialog={() => setProfileDialog(true)} attachment={attachment} profileColor={profileColor} />
      <AvatarDialogs userObj={userObj} profileDialog={profileDialog} attachment={attachment} changeAttachment={(newState) => setAttachment(newState)}  handleClose={handleClose} />
      <ProfileActions userObj={userObj} user={state.element} allies={allies} handleFollowers={handleFollowers} handleFollowings={handleFollowings}/>
      <ProfileCards user={state.element} allies={allies}/>
      {/* <ChartContainer
          config={labels}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' hideLabel />}
            />
            <Pie
              // data={actions}
              dataKey="number"
              nameKey="action"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalNumber.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Actions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
      </ChartContainer> */}
      {/* {state.element.uid === userObj.uid ?
        <div>
          <ProfileForm userObj={userObj} />
        </div>
      :
        <div>
          <div className='flex justify-center pt-5'>
            <Avatar alt={state.element.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: state.element?.profileColor || blue[500] }} src='./src'/>
          </div>
          <ProfileConnects userObj={userObj} user={state.element}/>
        </div>
      } */}
    </div>
  )
}

export default Profile