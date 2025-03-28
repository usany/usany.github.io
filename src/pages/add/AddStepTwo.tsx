import Selects from 'src/pages/add/Selects'
import AddStepTitle from 'src/pages/add/AddStepTitle'

interface Props {
    locationState: {locationOne: string | null, locationTwo: string | null, locationThree: string | null, locationInput: string | null}
    changeBuilding: (event: {preventDefault: () => void, target: {value: string}}) => void
    changeRoom: (event: {preventDefault: () => void, target: {value: string}}) => void
    changeSeat: (event: {preventDefault: () => void, target: {value: string}}) => void
    changeLocationInput: (event: {preventDefault: () => void, target: {value: string}}) => void
}

const AddStepTwo = ({ locationState, changeBuilding, changeRoom, changeSeat, changeLocationInput }: Props) => {
    const title = ['2. 장소 입력']

    return (
        <div>
            <AddStepTitle title={title} />
            <Selects
                locationState={locationState}
                changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat}
                changeLocationInput={changeLocationInput}
            />
        </div>
    )
}

export default AddStepTwo
