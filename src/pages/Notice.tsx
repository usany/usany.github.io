import { useState, useEffect, lazy } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import FilterDialogs from 'src/muiComponents/FilterDialogs'
import { useImmer } from 'use-immer'
import { User } from 'firebase/auth';
import Cards from 'src/muiComponents/Cards';

interface Props {
    userObj: User | null
    borrow: boolean
}
function Notice({ userObj, borrow }: Props) {
  const [messages, setMessages] = useState<Array<object>>([]);
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
    useEffect(() => {
      document.documentElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant", // Optional if you want to skip the scrolling animation
      });
    }, []);

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

  return (  
    <div className='p-5'>
        <div className='flex justify-start text-2xl w-screen'>
            <div className='flex w-5/6'>{borrow ? '빌리기' : '빌려주기'} 카드 목록</div>
            <div className='flex w-screen justify-end px-16'>
                <FilterDialogs 
                    selectedValues={selectedValues} 
                    handleSelectedValues={handleSelectedValues}
                />
            </div>
        </div>
        <div className='flex flex-wrap justify-between h-screen pt-5 gap-1'>
            {messages.map((msg) => {
                let choose
                const isOwner = msg?.creatorId === userObj?.uid
                {borrow ? choose = 1 : choose = 2}
                if (msg?.text.choose === choose && msg?.round === 1) {
                    if (selectedValues[0].value === '전체' ||selectedValues[0].value === msg?.item || !selectedValues[0].value) {
                        if (selectedValues[1].value === '전체' || selectedValues[1].value === msg?.text.count || !selectedValues[1].value) {
                            return(
                                <Cards msgObj={msg} isOwner={isOwner} userObj={userObj} num={null} points={null} />
                            )
                        }
                    }
                }
            })}
        </div>
    </div>
  )
}

export default Notice
