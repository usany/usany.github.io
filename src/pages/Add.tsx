import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Lotties from 'src/lottiesAnimation/Lotties'
import Pickers from 'src/muiComponents/Pickers'
import ItemSelects from 'src/muiComponents/ItemSelects'
import Selects from 'src/muiComponents/Selects'
import AddSteppers from 'src/muiComponents/AddSteppers'
import Button from '@mui/material/Button';
import RegisteredCards from 'src/muiComponents/RegisteredCards';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function Add({ userObj, valuing }: {userObj: object, valuing: number}) {
  const [addSteps, setAddSteps] = useState(0);
  const [enableButton, setEnableButton] = useState(true);
  const [cardId, setCardId] = useState(null)
  const [display, setDisplay] = useState(null)
//   const [count, setCount] = useState('');
//   const [counter, setCounter] = useState(0);
  const [item, setItem] = useState<string>('');
  const [locationInput, setLocationInput] = useState<string>('');
  const [locationOne, setLocationOne] = useState<string>('');
  const [locationTwo, setLocationTwo] = useState<string>('');
  const [locationThree, setLocationThree] = useState<string>('');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [process, setProcess] = useState<boolean>(false)
  const value: number[] = [0, valuing+1]

  useEffect(() => {
    if (process) {
        setTimeout(() => setProcess(false) , 5000)
    }
  })
  const changeItem = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    // setLocationOne(value);
    setItem(value)
    setLocationOne('');
    setLocationTwo('');
    setLocationThree('');
    if (value.trim() !== '') {
        setAddSteps(1)
    } else {
        setAddSteps(0)
    }
    setEnableButton(true)
  }
  const changeLocationInput = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    // setLocationOne(value);
    setLocationInput(value)
    setLocationTwo('');
    setLocationThree('');
    if (value.trim() !== '') {
        setAddSteps(2)
    } else {
        setAddSteps(1)
    }
    setEnableButton(true)
  }
  const changeBuilding = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setLocationOne(value);
    setLocationTwo('');
    setLocationThree('');
    setAddSteps(1)
    setEnableButton(true)
  }
  const changeRoom = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setLocationTwo(value);
    setLocationThree('');
    if (locationOne !== '중도' && locationOne !== '직접 입력') {
        setAddSteps(2)
    } else if (locationOne === '중도' && (['1열(1F)', '2열(2F)', '3열(2F)', '4열(4F)', '집중열(1F)'].indexOf(value) === -1)) {
        setAddSteps(2)
    } else {
        setAddSteps(1)
    }
    setEnableButton(true)
  }
  const changeSeat = (event) => {
      event.preventDefault()
      const {
          target: {value},
      } = event;
      setLocationThree(value);
      setAddSteps(2)
      setEnableButton(true)
  }

  const submit = async (event) => {
      event.preventDefault()
      if((locationInput !== '' || (locationOne !== '' && locationTwo !== '')) && from !== null && to !== null) {
        if (from.gmt > to.gmt) {
            alert('시간을 확인해 주세요')
        } else if (from.gmt < Date.now()) {
            alert('현재 시간을 확인 후 등록해 주세요')    
        } else if (to.gmt < Date.now()) {
            alert('현재 시간을 확인 후 등록해 주세요')    
        }
        else {
            {locationInput && setLocationOne(locationInput)}
            // console.log(to.year-from.year)
            // console.log(to.month-from.month)
            // console.log(to.day-from.day)
            // console.log(to.hour-from.hour)
            // console.log(to.minute-from.minute)

            if (to.year-from.year > 0) {
                value[0] = (to.year-from.year)*366*24*60
            } else if (to.month-from.month > 0) {
                value[0] = (to.month-from.month)*31*24*60
            } else if (to.day-from.day > 0) {
                value[0] = (to.day-from.day)*24*60
            } else if (to.hour-from.hour > 0) {
                value[0] = (to.hour-from.hour)*60
            } else if (to.minute-from.minute > 0) {
                value[0] = to.minute-from.minute
            }
            // if (valuing === 0) {
            //     value[1] = 1
            // } else {
            //     value[1] = 2
            // }
            let location
            if (locationOne === '직접 입력') {
                location = locationInput
            } else {
                location = locationOne
            }
            const card = await addDoc(collection(dbservice, 'num'), {
                point: value[0],
                displayName: userObj?.displayName,
                text: {choose: value[1], 
                    count: location,
                    counter: locationTwo, 
                    counting: locationThree,
                    clock: from, clocker: to},
                round: 1,
                creatorClock: Date.now(),
                creatorId: userObj?.uid,
                connectedId: null,
                connectedName: null,
            })
            setCardId(card.id)
            // const displayingCard = doc(dbservice, `num/${card.id}`)
            // console.log(displayingCard)
            
            setProcess(true)
            // setLocationOne('');
            // setLocationTwo('');
            // setLocationThree('');
            // setFrom(undefined);
            // setTo(undefined);
            const cardObject = await getDoc(doc(dbservice, `num/${card.id}`))
            setDisplay({
                id: card.id,
                ...cardObject.data()
            })
        }
      } else {
          alert('내용을 입력해 주세요')
      }
      setAddSteps(3)
      setEnableButton(false)
  }
  console.log(display)
  const onChangeFrom = (event) => {
    setFrom({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
    setAddSteps(2)
    setEnableButton(true)
  }
  const onChangeTo = (event) => {
    setTo({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
    setAddSteps(2)
    setEnableButton(true)
}
    if (cardId) {
        let cardObject
        async () => cardObject = await getDoc(doc(dbservice, `num/${cardId}`))
        // setDisplay(cardObject)
        if (cardObject) {
            console.log(cardObject.data())
        }
    }
  return (
    <div className='flex flex-col'>
        <div className='flex text-2xl p-5'>
            {valuing === 0 ? '빌리기 ' : '빌려주기 '} 카드 등록
        </div>
        <div className='flex justify-end start-0 end-0'>
            <AddSteppers steps={addSteps} valuing={valuing}/>
        </div>
        {/* {valuing !== null && */}
            <div>
                <div className='flex text-base px-5 pt-5'>
                    1. 무엇을 {valuing === 0 ? '빌리세요?' : '빌려주세요?'}
                </div>
                <div className='flex px-5'>
                    <ItemSelects item={item} setItem={setItem} changeItem={changeItem}/>
                </div>
                {addSteps > 0 && 
                    <div>
                        <div className='flex text-base px-5 pt-5'>
                            2. 장소 입력
                        </div>
                        <div className='flex px-5'>
                            <Selects 
                                locationOne={locationOne} 
                                locationTwo={locationTwo} 
                                locationThree={locationThree} 
                                changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat}
                                setAddSteps={setAddSteps}
                            />
                            {locationOne === '직접 입력' && 
                                <div className='pt-7'>
                                    {/* <input className='dark:bg-black border' onChange={changeLocationInput} required autoFocus/> */}
                                    <TextField onChange={changeLocationInput} required autoFocus/>
                                </div>
                            }
                        </div>
                    </div>
                }
                {addSteps > 1 &&
                    <div>
                        <div className='flex text-base px-5 pt-5'>
                            3. 시간 입력
                        </div>
                        <div className='flex flex-col px-5'>
                            <Pickers onChange={onChangeFrom} label={"이 때부터"}  />
                            <Pickers onChange={onChangeTo} label={"이 때까지"} />
                        </div>
                        {enableButton ? 
                            <form className='flex justify-center pt-5' id='selection' onSubmit={submit}>
                                <Button variant='outlined' form='selection' type='submit'>등록하기</Button>
                            </form>
                        :
                            <div>
                                <div className='flex text-base px-5 pt-5'>
                                    4. 등록 완료
                                </div>
                                <div className='flex text-base px-5'>
                                    (등록 카드는 내 상태, 게시판에서 확인할 수 있습니다)
                                </div>
                                <div className='flex px-5 pt-5 pb-52'>
                                    <RegisteredCards msgObj={display} isOwner={true} />
                                </div>
                            </div>
                        }
                    </div>
                }
                {/* {addSteps > 1 &&
                    <div>
                        <div className='flex text-base px-5 pt-5'>
                            3. 등록 완료
                        </div>
                        <div className='flex px-5'>
                            <Pickers onChange={onChangeFrom} label={"이 때부터"}  />
                            <Pickers onChange={onChangeTo} label={"이 때까지"} />
                        </div>
                    </div>
                } */}
                {/* <Snackbar
                    open={true}
                    sx={{paddingBottom: '10%'}}
                    // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    // autoHideDuration={5000}
                    message="등록되었습니다"
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setProcess(false)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                /> */}
                {process &&
                    <Snackbar
                        open={true}
                        sx={{paddingBottom: '10%'}}
                        // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        // autoHideDuration={5000}
                        message="등록되었습니다"
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setProcess(false)}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    />
                }
            </div>
        {/* } */}
    </div>  
  )
}

export default Add
