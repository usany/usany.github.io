import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer, Suspense, lazy } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Specifics from 'src/muiComponents/Specifics';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';
import staticImageJ from 'src/assets/blue-01.png';
import staticImageC from 'src/assets/screen-01.png';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import useLongPress from 'src/hooks/useLongPress';
import CardsViews from './CardsViews';

interface Props {
  msgObj: {id: string, text: object},
  isOwner: boolean,
  userObj: {uid: string, displayName: string},
  num: number | null,
  points: number | null,
}
const shadowColorArray = [
  'lightblue', 
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen', 
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightsteelblue', 
  'lightyellow'
]
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const letters = alpha.map((x) => String.fromCharCode(x));
const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
const mergedArray = letters.concat(numbers)

const MorphingDialogs = ({ 
  msgObj,
  isOwner,
  userObj,
  num,
  points,
}: Props) => {
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <MorphingDialogTrigger>
        <CardsViews msgObj={msgObj} isOwner={isOwner} userObj={userObj} num={num} points={points} />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent>
          <Specifics userObj={userObj} message={msgObj} />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export default MorphingDialogs