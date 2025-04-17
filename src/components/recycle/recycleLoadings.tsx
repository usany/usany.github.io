import Skeleton from '@mui/material/Skeleton';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';

interface Props {
    userObj: User
}
function Loadings({ userObj }: Props) {
    const [messages, setMessages] = useState<Array<object>>([]);
    const piazzaSwitch = useSelector(state => state.piazzaSwitch.value)
    const cardAccordion = useSelector(state => state.cardAccordion.value)
    const messageAccordion = useSelector(state => state.messageAccordion.value)
    const dispatch = useDispatch()
    const [cardLoaded, setCardLoaded] = useState(false)
    const [accordions, setAccordions] = useState({ cards: '', messages: '' })
    useEffect(() => {
        if (cardAccordion && messageAccordion) {
            setAccordions({ cards: 'item-1', messages: 'item-2' })
        } else if (cardAccordion && !messageAccordion) {
            setAccordions({ cards: 'item-1', messages: '' })
        } else if (!cardAccordion && messageAccordion) {
            setAccordions({ cards: '', messages: 'item-2' })
        } else {
            setAccordions({ cards: '', messages: '' })
        }
    }, [cardAccordion, messageAccordion])
    useEffect(() => {
        const requestPermission = async () => {
            try {
                const token = await getToken(messaging, { vapidKey: 'BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE' });
                if (token) {
                    console.log('Token generated:', token);
                    // Send this token to your server to store it for later use
                    // webSocket.on('messagingToken', token)
                    // return (
                    //     webSocket.off('messagingToken', token)
                    // )
                    const myDoc = doc(dbservice, `members/${userObj.uid}`)
                    updateDoc(myDoc, { messagingToken: token });
                } else {
                    console.log('No registration token available.');
                }
            } catch (err) {
                console.error('Error getting token:', err);
            }
        };
        requestPermission();
    }, []);
    // const storageRef = ref(storage, userObj.uid);
    // uploadString(storageRef, 'null', 'raw').then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    // });

    useEffect(() => {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
                if (document.data().creatorId === userObj.uid) {
                    return ({
                        id: document.id,
                        ...document.data(),
                    })
                } else if (document.data().connectedId === userObj.uid && document.data().round !== 1) {
                    return ({
                        id: document.id,
                        ...document.data(),
                    })
                }
            });
            const newArraySelection = newArray.filter((element) => {
                return element !== undefined;
            });
            setMessages(newArraySelection)
            setCardLoaded(true)
        })
    }, [])

    return (
        <div className='flex justify-center flex-col pb-5'>
            <PageTitle title={'내 상태'} />
            <Skeleton />
        </div>
    )
}

export default Loadings
