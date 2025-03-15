import { useState, useEffect, useReducer } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import AddSteppers from 'src/muiComponents/AddSteppers'
import AddStepOne from 'src/muiComponents/AddStepOne'
import AddStepTwo from 'src/muiComponents/AddStepTwo'
import AddStepThree from 'src/muiComponents/AddStepThree'
import AddStepFour from 'src/muiComponents/AddStepFour'
import AddRegisterButton from 'src/muiComponents/AddRegisterButton'
import AddSnackBar from 'src/muiComponents/AddSnackBar'
import PageTitle from 'src/muiComponents/PageTitle'
import { User } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    userObj: User, action: number, borrow: boolean
}
function Add({ userObj, action, borrow }: Props) {
  const [addSteps, setAddSteps] = useState(0);
  const [cardId, setCardId] = useState(null)
  const [display, setDisplay] = useState(null)
  const [item, setItem] = useState<string>('');
  const tabs = useSelector(state => state.tabs.value)
//   const locationReducer = (state: {locationOne: string | null, locationTwo: string | null, locationThree: string | null, locationInput: string | null}, action: {type: string, newState: string | null}) => {
//     if (action.type === 'changeBuilding') {
//         return {...state, locationOne: action.newState, locationTwo: '', locationThree: ''}
//     } else if (action.type === 'changeRoom') {
//         return {...state, locationTwo: action.newState, locationThree: ''}
//     } else if (action.type === 'changeSeat') {
//         return {...state, locationThree: action.newState}
//     } else if (action.type === 'changeLocationInput') {
//         return {...state, locationTwo: '', locationThree: '', locationInput: action.newState}
//     } else if (action.type === 'changeItem') {
//         return {locationOne: '', locationTwo: '', locationThree: '', locationInput: ''}
//     } else {
//         return {...state}
//     }
//   }
  const [locationState, locationDispatch] = useReducer((state: {locationOne: string | null, locationTwo: string | null, locationThree: string | null, locationInput: string | null}, action: {type: string, newState: string | null}) => {
    if (action.type === 'changeBuilding') {
        return {...state, locationOne: action.newState, locationTwo: '', locationThree: ''}
    } else if (action.type === 'changeRoom') {
        return {...state, locationTwo: action.newState, locationThree: ''}
    } else if (action.type === 'changeSeat') {
        return {...state, locationThree: action.newState}
    } else if (action.type === 'changeLocationInput') {
        return {...state, locationTwo: '', locationThree: '', locationInput: action.newState}
    } else if (action.type === 'changeItem') {
        return {locationOne: '', locationTwo: '', locationThree: '', locationInput: ''}
    } else {
        return {...state}
    }
  }, {
    locationOne: '',
    locationTwo: '',
    locationThree: '',
    locationInput: ''
  })
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [snackBar, setSnackBar] = useState<boolean>(false)
  const [fromTo, setFromTo] = useState<{from: {gmt: {}, year: number, month: number, day: number, hour: number, minute: number} | null, to: {gmt: {}, year: number, month: number, day: number, hour: number, minute: number} | null}>({from: null, to: null})
  
  useEffect(() => {
    setAddSteps(0)
    setItem('')
  }, [tabs])
  let calculatePoint = 0

  useEffect(() => {
    setTimeout(() => setSnackBar(false) , 5000)
  })
  const changeItem = (event: {preventDefault: () => void, target: {value: string}}) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setItem(value)
    locationDispatch({type: 'changeItem', newState: null})
    if (value) {
        setAddSteps(1)
    } else {
        setAddSteps(0)
    }
  }
  const changeLocationInput = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    locationDispatch({type: 'changeLocationInput', newState: value})
    if (value) {
        setAddSteps(2)
    } else {
        setAddSteps(1)
    }
  }
  const changeBuilding = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    locationDispatch({type: 'changeBuilding', newState: value})
    setAddSteps(1)
  }
  const changeRoom = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    locationDispatch({type: 'changeRoom', newState: value})
    if (locationState.locationOne !== '중도' && locationState.locationOne !== '직접 입력') {
        setAddSteps(2)
    } else if (locationState.locationOne === '중도' && (['1열(1F)', '2열(2F)', '3열(2F)', '4열(4F)', '집중열(1F)'].indexOf(value) === -1)) {
        setAddSteps(2)
    } else {
        setAddSteps(1)
    }
  }
  const changeSeat = (event) => {
      event.preventDefault()
      const {
          target: {value},
      } = event;
      locationDispatch({type: 'changeSeat', newState: value})
      setAddSteps(2)
  }

  const submit = async (event) => {
      event.preventDefault()
      if((locationState.locationInput !== '' || (locationState.locationOne !== '' && locationState.locationTwo !== '')) && from !== null && to !== null) {
        if (from.gmt > to.gmt) {
            alert('시간을 확인해 주세요')
        } else if (from.gmt < Date.now()) {
            alert('현재 시간을 확인 후 등록해 주세요')    
        } else if (to.gmt < Date.now()) {
            alert('현재 시간을 확인 후 등록해 주세요')    
        }
        else {
            if (to.year-from.year > 0) {
                calculatePoint = (to.year-from.year)*366*24*60
            } else if (to.month-from.month > 0) {
                calculatePoint = (to.month-from.month)*31*24*60
            } else if (to.day-from.day > 0) {
                calculatePoint = (to.day-from.day)*24*60
            } else if (to.hour-from.hour > 0) {
                calculatePoint = (to.hour-from.hour)*60
            } else if (to.minute-from.minute > 0) {
                calculatePoint = to.minute-from.minute
            }

            let location
            if (locationState.locationOne === '직접 입력') {
                location = locationState.locationInput
            } else {
                location = locationState.locationOne
            }
            const card = await addDoc(collection(dbservice, 'num'), {
                point: calculatePoint,
                displayName: userObj?.displayName,
                text: {choose: action+1, 
                    count: location,
                    counter: locationState.locationTwo, 
                    counting: locationState.locationThree,
                    clock: from, clocker: to},
                round: 1,
                creatorClock: Date.now(),
                creatorId: userObj?.uid,
                connectedId: null,
                connectedName: null,
                item: item
            })
            setCardId(card.id)
            setSnackBar(true)
            const cardObject = await getDoc(doc(dbservice, `num/${card.id}`))
            setDisplay({
                id: card.id,
                ...cardObject.data()
            })
            setAddSteps(3)
        }
    } else {
        alert('내용을 입력해 주세요')
    }
  }
  const onChangeFrom = (event) => {
    setFrom({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
    setFromTo({
        from: {gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m},
        to: fromTo.to
    })
    setAddSteps(2)
  }
  const onChangeTo = (event) => {
    setTo({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
    setFromTo({
        ...fromTo,
        to: {gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m}
    })
    setAddSteps(2)
    }
    if (cardId) {
        let cardObject
        async () => cardObject = await getDoc(doc(dbservice, `num/${cardId}`))
        if (cardObject) {
            console.log(cardObject.data())
        }
    }
  
    return (
        <div className='flex flex-col'>
            <PageTitle title={`${borrow ? '빌리기 ' : '빌려주기 '} 카드 등록`}/>
            <AddSteppers addSteps={addSteps} borrow={borrow} />
            <AddStepOne borrow={borrow} item={item} changeItem={changeItem} />
            {addSteps > 0 && <AddStepTwo locationState={locationState} changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat} changeLocationInput={changeLocationInput} />}
            {addSteps > 1 && <AddStepThree onChangeFrom={onChangeFrom} onChangeTo={onChangeTo} />}
            {addSteps === 2 && <AddRegisterButton submit={submit} />}
            {addSteps === 3 && <AddStepFour display={display} />} 
            <AddSnackBar snackBar={snackBar} changeSnackBar={() => setSnackBar(false)}/>
        </div>  
    )
}

export default Add
