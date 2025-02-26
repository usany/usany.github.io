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

const PointsDrawers = ({ user, cards }) => {

  return (
    <div className='flex flex-col'>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent className='max-h-[50%] overflow-y-scroll'>
          <ScrollArea>
          {/* <Points user={user} cards={cards}/>
          <Points user={user} cards={cards}/>
          <Points user={user} cards={cards}/> */}
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            {/* <Points /> */}
          </DrawerFooter>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default PointsDrawers
