import { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  auth,
  onSocialClick,
  dbservice,
  storage,
  messaging,
} from "src/baseApi/serverbase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getToken } from "firebase/messaging";
import MessageStacks from "src/pages/main/chatting/MessageStacks";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelector, useDispatch } from "react-redux";
import { change } from "src/stateSlices/cardAccordionSlice";
import { changeMessageAccordion } from "src/stateSlices/messageAccordionSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "firebase/auth";
import CardsStacks from "src/pages/main/card/CardsStacks";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  userObj: User;
}

function Menu({ userObj }: Props) {
  const [accordions, setAccordions] = useState({
    cards: "item-1",
    messages: "item-2",
  });
  const cardAccordion = useSelector((state) => state.cardAccordion.value);
  const messageAccordion = useSelector((state) => state.messageAccordion.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cardAccordion && messageAccordion) {
      setAccordions({ cards: "item-1", messages: "item-2" });
    } else if (cardAccordion && !messageAccordion) {
      setAccordions({ cards: "item-1", messages: "" });
    } else if (!cardAccordion && messageAccordion) {
      setAccordions({ cards: "", messages: "item-2" });
    } else {
      setAccordions({ cards: "", messages: "" });
    }
  }, [cardAccordion, messageAccordion]);
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
  
  return (
    <div id="sample" className="flex justify-center flex-col pb-5">
      <PageTitle title={"내 상태"} />
      <Accordion
        value={[accordions.cards, accordions.messages]}
        // defaultValue={accordionValues}
        type="multiple"
        className="px-3"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger onClick={() => dispatch(change())}>
            카드
          </AccordionTrigger>
          <AccordionContent>
            <CardsStacks userObj={userObj} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger onClick={() => dispatch(changeMessageAccordion())}>
            메세지
          </AccordionTrigger>
          <AccordionContent>
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
