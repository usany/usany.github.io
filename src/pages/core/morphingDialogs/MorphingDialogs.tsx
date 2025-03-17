import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger
} from '@/components/ui/morphing-dialog';
import { User } from 'firebase/auth';
import { useState } from 'react';
import Specifics from 'src/pages/core/specifics/Specifics';
import CardsViews from '../../main/card/CardsViews';

interface Props {
  msgObj: { id: string, text: object },
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
  const [deleted, setDeleted] = useState(false)
  const changeDeleted = (newValue) => setDeleted(newValue)
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
          <Specifics deleted={deleted} changeDeleted={changeDeleted} userObj={userObj} message={msgObj} />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export default MorphingDialogs
