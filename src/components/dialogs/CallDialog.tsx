import React from 'react'
import {
    MorphingDialog,
    MorphingDialogClose,
    MorphingDialogContainer,
    MorphingDialogTrigger,
} from 'src/components/ui/morphing-dialog'

interface CallDialogProps {
  triggerId: string
  children: React.ReactNode
  onHangUp: () => void
  hangUpText: string
}

const CallDialog: React.FC<CallDialogProps> = ({
  triggerId,
  children,
  onHangUp,
  hangUpText,
}) => {
  return (
    <MorphingDialog>
      <MorphingDialogTrigger>
        <div id={triggerId}></div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <div>
          <div className="flex gap-5">
            {children}
          </div>
          <MorphingDialogClose>
            <div onClick={onHangUp}>{hangUpText}</div>
          </MorphingDialogClose>
        </div>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default CallDialog

