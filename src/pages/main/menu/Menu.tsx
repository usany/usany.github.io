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
  updateDoc
} from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dbservice,
  messaging
} from "src/baseApi/serverbase";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import CardsStacks from "src/pages/main/card/CardsStacks";
import MessageStacks from "src/pages/main/chatting/MessageStacks";
import { cardOff, cardOn } from "src/stateSlices/cardAccordionSlice";
import { messageOff, messageOn } from "src/stateSlices/messageAccordionSlice";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  userObj: User;
}

function Menu({ userObj }: Props) {
  // const [accordions, setAccordions] = useState({
  //   cards: "item-1",
  //   messages: "item-2",
  // });
  const cardAccordion = useSelector((state) => state.cardAccordion.value);
  const messageAccordion = useSelector((state) => state.messageAccordion.value);
  const dispatch = useDispatch();
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
        value={[cardAccordion, messageAccordion]}
        // defaultValue={accordionValues}
        type="multiple"
        className="px-3"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger onClick={() => {
            if (cardAccordion) {
              dispatch(cardOff())
            } else {
              dispatch(cardOn())
            }
          }}>
            카드
          </AccordionTrigger>
          <AccordionContent>
            <CardsStacks userObj={userObj} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger onClick={() => {
            if (messageAccordion) {
              dispatch(messageOff())
            } else {
              dispatch(messageOn())
            }
            // dispatch(changeMessageAccordion())
          }}>
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
