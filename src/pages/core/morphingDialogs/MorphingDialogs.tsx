import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer, Suspense, lazy } from 'react'
import Specifics from 'src/pages/core/specifics/Specifics';
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
import CardsViews from '../../main/card/CardsViews';
import { User } from 'firebase/auth';

interface Props {
  msgObj: {id: string, text: object},
  isOwner: boolean,
  userObj: User | null,
  num: number | null,
  points: number | null,
}

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