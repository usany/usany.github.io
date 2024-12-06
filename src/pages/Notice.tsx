import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import Message from 'src/pages/Message'
import FilterDialogs from 'src/muiComponents/FilterDialogs'
import Settings from '@mui/icons-material/Settings';
import { useTabsStore } from 'src/store'
import { createPortal } from 'react-dom'
import { Root, Overlay, Description } from "@radix-ui/react-dialog";
import { useImmer } from 'use-immer'
import { Filter } from 'lucide-react';
import { User } from 'firebase/auth';

interface Props {
    userObj: User | null
    borrow: boolean
}
function Notice({ userObj, borrow }: Props) {
  const [messages, setMessages] = useState<Array<object>>([]);
  const [changeFilter, setChangeFilter] = useState(false);
  const [selectedValueOne, setSelectedValueOne] = useState(null);
  const [selectedValueTwo, setSelectedValueTwo] = useState(null);
  const [selectedValueThree, setSelectedValueThree] = useState(null);
  const [selectedValue, setSelectedValue] = useState({
    selectedValueOne: null,
    selectedValueTwo: null,
    selectedValueThree: null,
  })
  const [selectedValues, setSelectedValues] = useImmer([
    {
        id: 'selectedValueOne',
        value: null
    },
    {
        id: 'selectedValueTwo',
        value: null
    },
    {
        id: 'selectedValueThree',
        value: null
    },
    ])
    const handleSelectedValues = ({id, newValue}) => {
        setSelectedValues((values) => {
            const value = values.find((value) => value.id === id)
            value.value = newValue
        })
    }
  const handleClickChangeFilter = () => {
    setChangeFilter(true);
  };

  const handleClose = () => {
    setChangeFilter(false);
  };

  const changeSelectedValueOne = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event
    setSelectedValueOne(value)
    setSelectedValue({
        selectedValueOne: value,
        selectedValueTwo: selectedValue.selectedValueTwo,
        selectedValueThree: selectedValue.selectedValueThree
    })
  }
  const changeSelectedValueTwo = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event
    setSelectedValueTwo(value)
  }
  const changeSelectedValueThree = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event
    setSelectedValueThree(value)
    setSelectedValue({
        ...selectedValue,
        selectedValueThree: value
    })
  }

  useEffect(() => {
    if (selectedValues[2].value === '최신순' || !selectedValues[2].value) {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
                return ({
                    id: document.id,
                    ...document.data(),
                })
            });
            setMessages(newArray)
        })
    } else {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
                return ({
                    id: document.id,
                    ...document.data(),
                })
            });
            setMessages(newArray)
        })
    }
  }, [selectedValues[2].value])
  console.log(selectedValues[0].value)
  return (  
    <div className='p-5'>
        <div className='flex justify-start text-2xl w-screen'>
            <div className='flex w-5/6'>{borrow ? '빌리기' : '빌려주기'} 카드 목록</div>
            <div className='flex w-screen justify-end px-10' onClick={handleClickChangeFilter}>
                <FilterDialogs 
                    selectedValues={selectedValues} 
                    handleSelectedValues={handleSelectedValues}
                />
            </div>
        </div>
        {/* {borrow ?
        :
        !borrow &&
            <div className='flex justify-start text-2xl w-screen'>
                <div className='flex w-5/6'>빌려주기 카드 목록</div>
                <div className='flex w-screen justify-end px-10'>
                    <Settings onClick={handleClickChangeFilter}/>
                </div>
            </div>
        } */}
        <div className='flex flex-wrap h-screen'>
            {messages.map((msg) => {
                let choose
                {borrow ? choose = 1 : choose = 2}
                // console.log(msg.text.clocker.gmt)
                if (msg?.text.choose === choose && msg?.round === 1) {
                    if (selectedValues[0].value === '전체' ||selectedValues[0].value === msg?.item || !selectedValues[0].value) {
                        if (selectedValues[1].value === '전체' || selectedValues[1].value === msg?.text.count || !selectedValues[1].value) {
                            return(
                                <Message key={msg?.id} msgObj={msg} isOwner={msg?.creatorId === userObj?.uid} userObj={userObj} 
                                // selectedValueOne={selectedValueOne} selectedValueTwo={selectedValueTwo} selectedValueThree={selectedValueThree} 
                                />
                            )
                        }
                    }
                }
            })}
            {/* {!borrow && messages.map((msg) => {
                if (msg?.text.choose === 2 && msg?.round === 1 && (msg?.text.clocker.gmt === undefined || msg.text.clocker.gmt.seconds*1000 + Date.now())) {
                    if (selectedValueTwo === '전체' || selectedValueTwo === msg?.text.count || !selectedValueTwo) {
                        return(
                            <Message key={msg?.id} msgObj={msg} isOwner={msg?.creatorId === userObj?.uid} userObj={userObj} selectedValueOne={selectedValueOne} selectedValueTwo={selectedValueTwo} selectedValueThree={selectedValueThree} />
                        )
                    }
                }
            })} */}
        </div>
    </div>
  )
}

export default Notice
