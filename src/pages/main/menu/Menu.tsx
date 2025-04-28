import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dbservice,
  messaging,
  storage
} from "src/baseApi/serverbase";
import { useSelectors } from "src/hooks/useSelectors";
import CardsStacks from "src/pages/core/card/CardsStacks";
import MessageStacks from "src/pages/core/chatting/MessageStacks";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import { cardOff, cardOn } from "src/stateSlices/cardAccordionSlice";
import { messageOff, messageOn } from "src/stateSlices/messageAccordionSlice";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  userObj: User;
}

const titles = {
  ko: '내 상태',
  en: 'My Status'
}
const cards = {
  ko: '카드',
  en: 'Cards'
}
const messages = {
  ko: '메세지',
  en: 'Messages'
}

function Menu({ userObj }: Props) {
  // const [accordions, setAccordions] = useState({
  //   cards: "item-1",
  //   messages: "item-2",
  // });
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  const cardAccordion = useSelector((state) => state.cardAccordion.value);
  const messageAccordion = useSelector((state) => state.messageAccordion.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const setProfile = async () => {
      const docRef = doc(dbservice, `members/${userObj?.uid}`);
      const docSnap = await getDoc(docRef);
      const userColor = docSnap.data()?.profileColor || "#2196f3";
      const userImage = docSnap.data()?.profileImageUrl || "null";
      // dispatch(changeProfileColor(userColor));
      // dispatch(changeProfileUrl(userImage));
      const userProfileImage = docSnap.data()?.profileImage || false;
      const userDefaultProfile = docSnap.data()?.defaultProfile || 'null';
      dispatch(changeProfileColor(userColor));
      console.log(userProfileImage)
      console.log(userImage)
      console.log(userDefaultProfile)
      if (userProfileImage) {
        dispatch(changeProfileUrl(userImage));
      } else {
        dispatch(changeProfileUrl(userDefaultProfile));
      }
    };
    setProfile();
  }, [userObj]);
  // useEffect(() => {
  //   if (cardAccordion && messageAccordion) {
  //     setAccordions({ cards: "item-1", messages: "item-2" });
  //   } else if (cardAccordion && !messageAccordion) {
  //     setAccordions({ cards: "item-1", messages: "" });
  //   } else if (!cardAccordion && messageAccordion) {
  //     setAccordions({ cards: "", messages: "item-2" });
  //   } else {
  //     setAccordions({ cards: "", messages: "" });
  //   }
  // }, [cardAccordion, messageAccordion]);
  useEffect(() => {
    // if (userObj) {
    //   getDownloadURL(ref(storage, `${userObj?.uid}`))
    //     .then((url) => {
    //       dispatch(changeProfileUrl(url));
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    const user = doc(dbservice, `members/${userObj?.uid}`);
    const storageRef = ref(storage, userObj?.uid);
    uploadString(storageRef, "null", "raw").then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    getDownloadURL(storageRef)
      .then(async (url) => {
        await updateDoc(user, { profileImageUrl: url });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE",
        });
        if (token) {
          console.log("Token generated:", token);
          // Send this token to your server to store it for later use
          // webSocket.on('messagingToken', token)
          // return (
          //     webSocket.off('messagingToken', token)
          // )
          const myDoc = doc(dbservice, `members/${userObj.uid}`);
          updateDoc(myDoc, { messagingToken: token });
        } else {
          console.log("No registration token available.");
        }
      } catch (err) {
        console.error("Error getting token:", err);
      }
    };
    requestPermission();
  }, []);

  const accordionValues = ["카드", "메세지"];
  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault(); // prevents the default right-click menu from appearing
    }
    // add the event listener to the component's root element
    const rootElement = document.getElementById("sample");
    rootElement.addEventListener("contextmenu", handleContextMenu);
    // remove the event listener when the component is unmounted

    return () => {
      rootElement.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  console.log(userObj)
  return (
    <div id="sample" className="flex justify-center flex-col pb-5">
      <PageTitle title={titles[index]} />
      {/* <Buttonings button={'practice'} /> */}
      {/* <div className='flex justify-center'>
        <Cardings cards={'sample'} shadowColor={'lightblue'} />
      </div> */}
      <Accordion
        className='px-5'
        value={[cardAccordion, messageAccordion]}
        // defaultValue={accordionValues}
        type="multiple"
      >
        <AccordionItem value="item-1">
          <button onClick={() => {
            document.getElementById('cardAccordion')?.click()
          }} className='rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50'>
            <div>{cards[index]}</div>
            <AccordionTrigger id="cardAccordion" onClick={() => {
              if (cardAccordion) {
                dispatch(cardOff())
              } else {
                dispatch(cardOn())
              }
            }}>
            </AccordionTrigger>
          </button>
          <AccordionContent className="text-sm">
            <CardsStacks userObj={userObj} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <button onClick={() => {
            document.getElementById('messageAccordion')?.click()
          }} className='rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50'>
            <div>{messages[index]}</div>
            <AccordionTrigger id="messageAccordion" onClick={() => {
              if (messageAccordion) {
                dispatch(messageOff())
              } else {
                dispatch(messageOn())
              }
              // dispatch(changeMessageAccordion())
            }}>
            </AccordionTrigger>
          </button>
          <AccordionContent className="text-sm">
            <Suspense fallback={<Skeleton />}>
              <MessageStacks userObj={userObj} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
    </div>
  );
}

export default Menu;
