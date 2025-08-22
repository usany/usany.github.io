import React from 'react'
import PiazzaCalls from 'src/pages/piazza/PiazzaCalls'
import CallDialog from './CallDialog'

interface VideoCallDialogProps {
  onHangUp: () => void
  hangUpText: string
}

const VideoCallDialog: React.FC<VideoCallDialogProps> = ({
  onHangUp,
  hangUpText,
}) => {
  return (
    <CallDialog
      triggerId="videoCall"
      onHangUp={onHangUp}
      hangUpText={hangUpText}
    >
      <PiazzaCalls />
    </CallDialog>
  )
}

export default VideoCallDialog

