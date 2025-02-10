import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import Points from 'src/pages/search/Points'
const Drawers = () => {
  const [cards, setCards] = useState({point: null, done: [], borrowDone: [], lendDone: [] })
  // const [allies, setAllies] = useState({
  //   followers: {
  //     number: null,
  //     list: null
  //   },
  //   followings: {
  //     number: null,
  //     list: null
  //   }
  // })

  // useEffect(() => {
  //   const cards = async () => {
  //     const docRef = doc(dbservice, `members/${user.uid}`)
  //     const myDocSnap = await getDoc(docRef)
  //     const { points, done, borrowDoneCount, lendDoneCount } = myDocSnap.data()
  //     setCards({point: points, done: done, borrowDone: borrowDoneCount || [], lendDone: lendDoneCount || [] })
  //   }
  //   cards()
  // }, [user])
  // useEffect(() => {
  //   const allies = async () => {
  //     const docRef = doc(dbservice, `members/${user.uid}`)
  //     const myDocSnap = await getDoc(docRef)
  //     const {followerNum, followingNum, followers, followings} = myDocSnap.data()
  //     setAllies({
  //       followers: {number: followerNum || 0, list: followers || []},
  //       followings: {number: followingNum || 0, list: followings || []}
  //     })
  //   }
  //   allies()
  // }, [])
  // console.log(cards)
  const actions = [
    // { action: 'borrow', number: cards.borrowDone.length,
    //   fill: 'red'},
    // { action: 'lend', number: cards.lendDone.length,
    //   fill: 'blue'},
    { action: 'borrow', number: cards.borrowDone.length,
      fill: 'red'},
    { action: 'lend', number: cards.lendDone.length,
      fill: 'blue'},
  ]
  const labels = {
    number: {
      label: 'total',
    },
    borrow: {
      label: 'borrow',
      color: '#2563eb',
    },
    lend: {
      label: 'lend',
      color: '#60a5fa',
    },
  } satisfies ChartConfig
  const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)

  return (
    <Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent className='dark:bg-black'>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      {/* <button>Submit</button> */}
      {/* <DrawerClose>
        <button>Cancel</button>
      </DrawerClose> */}
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  );
}

export default Drawers