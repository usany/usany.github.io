import { Button, Chip, ClickAwayListener, Tooltip } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import { useTexts } from 'src/hooks'

const ProfileLocationsChip = () => {
  const [open, setOpen] = useState(false)
  const {
    areYouInCampus,
    letOthersKnowYouAreInCampusByLocationConfirmation,
    locationConfirmationLastsUntilTheNextDay,
  } = useTexts()
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }
  const {state} = useLocation()
  const profile = useSelectors((state) => state.profile.value)

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
              <div className="flex">
                <Tooltip
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <div className="text-xl">
                      <div>{areYouInCampus}</div>
                      <div>
                        {letOthersKnowYouAreInCampusByLocationConfirmation}
                      </div>
                      <div>{locationConfirmationLastsUntilTheNextDay}</div>
                    </div>
                  }
                  slotProps={{
                    popper: {
                      disablePortal: true,
                    },
                  }}
                >
                  <div
                    className="rounded-xl border border-solid px-1 bg-light-2 dark:bg-dark-2"
                    onClick={handleTooltipOpen}
                  >
                    ?
                  </div>
                </Tooltip>
              </div>
            </ClickAwayListener>
  )
}

export default ProfileLocationsChip
