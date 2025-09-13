import { Card } from "@mui/material"
import { useTexts } from "src/hooks"
import useCardsBackground from "src/hooks/useCardsBackground"

const ProfilePointsTrigger = ({ cards }) => {
  const {points} = useTexts()
  const { colorTwo } = useCardsBackground()

  return (
    <Card
      sx={{
        bgcolor: colorTwo,
      }}
    >
      <div className='p-5'>
        <div>{points}</div>
        <div className='flex justify-center'>{cards.point}</div>
      </div>
    </Card>
  )
}

export default ProfilePointsTrigger
