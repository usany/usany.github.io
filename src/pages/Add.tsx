import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Lotties from 'src/lottiesAnimation/Lotties'
import Pickers from 'src/muiComponents/Pickers'
import Selects from 'src/muiComponents/Selects'
import Button from '@mui/material/Button';

function Add({ userObj, valuing }: {userObj: object, valuing: number}) {
//   const [choose, setChoose] = useState(0);
//   const [count, setCount] = useState('');
//   const [counter, setCounter] = useState(0);
  const [locationInput, setLocationInput] = useState<string>('');
  const [locationOne, setLocationOne] = useState<string>('');
  const [locationTwo, setLocationTwo] = useState<string>('');
  const [locationThree, setLocationThree] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [process, setProcess] = useState<boolean>(false)
  const value: number[] = [0, valuing+1]

  const changeLocationInput = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    // setLocationOne(value);
    setLocationInput(event)
    setLocationTwo('');
    setLocationThree('');
  }
  const changeBuilding = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setLocationOne(value);
    setLocationTwo('');
    setLocationThree('');
  }
  const changeRoom = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setLocationTwo(value);
    setLocationThree('');
  }
  const changeSeat = (event) => {
      event.preventDefault()
      const {
          target: {value},
      } = event;
      setLocationThree(value);
  }

  const submit = async (event) => {
      event.preventDefault()
      if((locationInput !== '' || (locationOne !== '' && locationTwo !== '')) && from !== '' && to !== '') {
        if (from.gmt > to.gmt) {
            alert('시간을 확인해주세요')
        } else if (from.gmt < Date.now()) {
            alert('시간을 확인해주세요')    
        } else if (to.gmt < Date.now()) {
            alert('시간을 확인해주세요')    
        }
        else {
            {locationInput && setLocationOne(locationInput)}
            console.log(to.year-from.year)
            console.log(to.month-from.month)
            console.log(to.day-from.day)
            console.log(to.hour-from.hour)
            console.log(to.minute-from.minute)

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
            setProcess(true)
            let location
            if (locationOne === '직접입력') {
                location = locationInput
            } else {
                location = locationOne
            }
            await addDoc(collection(dbservice, 'num'), {
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
            setProcess(false)
            setLocationOne('');
            setLocationTwo('');
            setLocationThree('');
        }
      } else {
          alert('내용을 입력해 주세요')
      }
  }

  const onChangeFrom = (event) => {
    setFrom({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
  }
  const onChangeTo = (event) => {
    setTo({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
}   
  return (
    <div className='flex flex-col'>
        <div>
            {valuing === 0 &&
                // <div className='flex justify-center border border-sky-500'>
                //     빌리기 카드 등록
                // </div>
                <div className='flex justify-start text-2xl p-5'>
                    빌리기 카드 등록
                </div>
            }
            {valuing === 1 &&
                // <div className='flex justify-center border border-sky-500'>
                //     빌려주기 카드 등록
                // </div>
                <div className='flex justify-start text-2xl p-5'>
                    빌려주기 카드 등록
                </div>
            }
        </div>
        {valuing !== null &&
            <div>
                {!process && 
                <div>
                    <div className='flex justify-center'>
                        <Selects 
                            locationOne={locationOne} 
                            locationTwo={locationTwo} 
                            locationThree={locationThree} 
                            changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat}/>
                    </div>
                    {locationOne === '직접입력' && 
                        <div className='flex justify-center'>
                            <input onChange={changeLocationInput} required autoFocus/>
                        </div>
                    }
                    <div>언제부터 언제까지인가요</div>
                    <div className='flex justify-center'>
                        <Pickers onChange={onChangeFrom} label={"이 때부터"} />
                        <Pickers onChange={onChangeTo} label={"이 때까지"} />
                    </div>
                    <div className='flex justify-center'>
                        <form id='selection' onSubmit={submit}>
                            <Button variant='outlined' form='selection' type='submit'>등록하기</Button>
                        </form>
                    </div>
                </div>
                }
                {process &&
                    <div>
                        <div>등록 중입니다</div>
                        <Lotties />
                    </div>
                }
            </div>
        }
    </div>  
  )
}

export default Add
