import { useSelectors } from 'src/hooks/useSelectors'
import AddStepTitle from 'src/pages/add/AddStepTitle'
import Selects from 'src/pages/add/Selects'

interface Props {
  locationState: { locationOne: string | null, locationTwo: string | null, locationThree: string | null, locationInput: string | null }
  changeBuilding: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeRoom: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeSeat: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeLocationInput: (event: { preventDefault: () => void, target: { value: string } }) => void
}

const AddStepTwo = ({ locationState, changeBuilding, changeRoom, changeSeat, changeLocationInput }: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const titles = {
    ko: '2. 장소 입력',
    en: '2. Input Location'
  }
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  return (
    <div>
      <AddStepTitle title={titles[index]} />
      <Selects
        locationState={locationState}
        changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat}
        changeLocationInput={changeLocationInput}
      />
    </div>
  )
}

export default AddStepTwo
