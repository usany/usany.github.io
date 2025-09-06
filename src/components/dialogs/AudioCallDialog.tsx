import React from 'react'
import PiazzaAudioCall from 'src/pages/piazza/PiazzaAudioCall'
import CallDialog from './CallDialog'

interface AudioCallDialogProps {
  onHangUp: () => void
  hangUpText: string
}

const AudioCallDialog: React.FC<AudioCallDialogProps> = ({
  onHangUp,
  hangUpText,
}) => {
  return (
    <CallDialog
      triggerId="audioCall"
      onHangUp={onHangUp}
      hangUpText={hangUpText}
    >
      <PiazzaAudioCall />
    </CallDialog>
  )
}

export default AudioCallDialog

