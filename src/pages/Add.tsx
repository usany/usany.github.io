import { useState, useEffect, useReducer } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, DocumentSnapshot } from 'firebase/firestore';
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
import TabsRootState from 'src/interfaces/TabsRootState';
import AddCards from 'src/muiComponents/AddCards';
import { useMediaQuery } from '@mui/material';

interface Props {
    userObj: User
    // action: number
    borrow: boolean
}
interface LocationEvent extends EventTarget {
    target: {value: string};
}
interface LocationEvents {
    target: {value: string};
}
interface DisplayCard {
    id: string
}
interface Clock {
    gmt: {}
    year: number
    month: number
    day: number
    hour: number
    minute: number
}
interface FromTo {
    from: Clock | null 
    to: Clock | null
}

function Add({ userObj, borrow }: Props) {
    const [addSteps, setAddSteps] = useState(0);
    const [display, setDisplay] = useState<DisplayCard | null>(null)
    const [item, setItem] = useState('');
    const tabs = useSelector((state: TabsRootState) => state.tabs.value)
    const [fromTo, setFromTo] = useState<FromTo>({from: null, to: null})
    const matches = useMediaQuery('(min-width:500px)');
    // const [cardId, setCardId] = useState<string | null>(null)
    // const [from, setFrom] = useState(null);
    // const [to, setTo] = useState(null);
    // const [snackBar, setSnackBar] = useState(false)
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
    function changeAddSteps(newValue) {
        setAddSteps(newValue)
    }
    
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
  
  useEffect(() => {
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  useEffect(() => {
    setAddSteps(0)
    setItem('')
  }, [tabs])

  useEffect(() => {
    if (addSteps === 3) {
        setTimeout(() => setAddSteps(4) , 5000)
    }
  })
  
//   let calculatePoint = 0

  const changeItem = (event: PointerEvent) => {
    // event.preventDefault()
    console.log(event)
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
  const changeLocationInput = (event: LocationEvents) => {
    // event.preventDefault()
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
  const changeBuilding = (event: LocationEvent) => {
    // event.preventDefault()
    const {
        target: {value},
    } = event;
    locationDispatch({type: 'changeBuilding', newState: value})
    setAddSteps(1)
  }
  const changeRoom = (event: LocationEvent) => {
    // event.preventDefault()
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
  const changeSeat = (event: LocationEvent) => {
    //   event.preventDefault()
      const {
          target: {value},
      } = event;
      locationDispatch({type: 'changeSeat', newState: value})
      setAddSteps(2)
  }

  const submit = async (event) => {
      event.preventDefault()
      let calculatePoint = 0
      if ((locationState.locationInput !== '' || (locationState.locationOne !== '' && locationState.locationTwo !== '')) && fromTo.from !== null && fromTo.to !== null) {
        if (fromTo.from.gmt > fromTo.to.gmt) {
            alert('시간을 확인해 주세요')
        } else if (fromTo.from.gmt < Date.now()) {
            alert('현재 시간을 확인 후 등록해 주세요')    
        } else if (fromTo.to.gmt < Date.now()) {
            alert('현재 시간을 확인 후 등록해 주세요')    
        }
        else {
            if (fromTo.to.year-fromTo.from.year > 0) {
                calculatePoint = (fromTo.to.year-fromTo.from.year)*366*24*60
            } else if (fromTo.to.month-fromTo.from.month > 0) {
                calculatePoint = (fromTo.to.month-fromTo.from.month)*31*24*60
            } else if (fromTo.to.day-fromTo.from.day > 0) {
                calculatePoint = (fromTo.to.day-fromTo.from.day)*24*60
            } else if (fromTo.to.hour-fromTo.from.hour > 0) {
                calculatePoint = (fromTo.to.hour-fromTo.from.hour)*60
            } else if (fromTo.to.minute-fromTo.from.minute > 0) {
                calculatePoint = fromTo.to.minute-fromTo.from.minute
            }

            let location
            if (locationState.locationOne === '직접 입력') {
                location = locationState.locationInput
            } else {
                location = locationState.locationOne
            }
            let choose
            if (borrow) {
                choose = 1
            } else {
                choose = 2
            }
            const card = await addDoc(collection(dbservice, 'num'), {
                point: calculatePoint,
                displayName: userObj?.displayName,
                text: {choose: choose, 
                    count: location,
                    counter: locationState.locationTwo, 
                    counting: locationState.locationThree,
                    clock: fromTo.from, clocker: fromTo.to},
                round: 1,
                creatorClock: Date.now(),
                creatorId: userObj?.uid,
                connectedId: null,
                connectedName: null,
                item: item
            })
            // setCardId(card.id)
            // setSnackBar(true)
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
    // setFrom({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
    setFromTo({
        from: {gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m},
        to: fromTo.to
    })
    setAddSteps(2)
  }
  const onChangeTo = (event) => {
    // setTo({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
    setFromTo({
        ...fromTo,
        to: {gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m}
    })
    setAddSteps(2)
    }
    // if (cardId) {
    //     let cardObject
    //     async () => cardObject = await getDoc(doc(dbservice, `num/${cardId}`))
    //     if (cardObject) {
    //         console.log(cardObject.data())
    //     }
    // }
  
    return (
        <div className='flex flex-col h-screen'>
            <PageTitle title={`${borrow ? '빌리기 ' : '빌려주기 '} 카드 등록`}/>
            <AddSteppers addSteps={addSteps} borrow={borrow} />
            {/* <div className='flex justify-around'>
                <AddCards borrow={borrow} userObj={userObj} addSteps={addSteps} item={item} fromTo={fromTo} locationState={locationState} />
                <div>
                    <AddStepOne borrow={borrow} item={item} changeItem={changeItem} />
                    {addSteps > 0 && <AddStepTwo locationState={locationState} changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat} changeLocationInput={changeLocationInput} />}
                </div>
            </div> */}
            {matches ?
                <div className='flex justify-around'>
                    <AddCards borrow={borrow} userObj={userObj} addSteps={addSteps} item={item} fromTo={fromTo} locationState={locationState} display={display}/>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <AddStepOne borrow={borrow} item={item} changeItem={changeItem} />
                            {addSteps > 0 && <AddStepTwo locationState={locationState} changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat} changeLocationInput={changeLocationInput} />}
                        </div>
                        {addSteps > 1 && <AddStepThree onChangeFrom={onChangeFrom} onChangeTo={onChangeTo} />}
                    </div>
                </div>
                :
                <div className='flex justify-around'>
                    <AddCards borrow={borrow} userObj={userObj} addSteps={addSteps} item={item} fromTo={fromTo} locationState={locationState} display={display}/>
                    <div>
                        <AddStepOne borrow={borrow} item={item} changeItem={changeItem} />
                        {addSteps > 0 && <AddStepTwo locationState={locationState} changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat} changeLocationInput={changeLocationInput} />}
                    </div>
                </div>
            }
            {!matches && addSteps > 1 && <AddStepThree onChangeFrom={onChangeFrom} onChangeTo={onChangeTo} />}
            {addSteps === 2 && <AddRegisterButton submit={submit} fromTo={fromTo}/>}
            {addSteps > 2 && <AddStepFour display={display} />} 
            {addSteps === 3 && <AddSnackBar changeAddSteps={changeAddSteps}/>}
        </div>  
    )
}

export default Add
