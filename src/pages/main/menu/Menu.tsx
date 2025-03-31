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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MorphingText } from "src/components/magicui/morphing-text";
import { Toast, ToastAction } from "@radix-ui/react-toast";
import { Textarea } from "src/components/ui/textarea";
import { Button } from "@mui/material";
import { useToast } from "src/hooks/use-toast";
import { Toaster } from "src/components/ui/toaster";
import { Switch } from "src/components/ui/switch";
import { Label } from "src/components/ui/label";
import { Badge } from "src/components/ui/badge";
import { Card, CardContent, CardTitle } from "src/components/ui/card";

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
  const { toast } = useToast()

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
  const texts = ['umbrella', 'umbrellas']
  return (
    <div id="sample" className="flex justify-center flex-col pb-5">
          <button
            onClick={() => {
              toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
                action: (
                  <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
              })
            }}
          >
            Add to calendar
          </button>
          <Toaster />
          <Badge>practice</Badge>
          <Card>
            <CardTitle>practices</CardTitle>
            <CardContent>
              practice
            </CardContent>
          </Card>
          <div className="flex items-center space-x-2">
            <Switch id="airplaneMode" />
          </div>

          <Dialog>
      <DialogTrigger asChild>
        <div>name</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          names
          </div>
        </div>
        <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
      }}
    >
      Add to calendar
    </Button>
        <Textarea>area</Textarea>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <MorphingText texts={texts}/>
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
