import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import ContactDialogs from 'src/muiComponents/ContactDialogs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

function Contact({ userObj }:
  {
    userObj: {uid: string, displayName: string}
  }
) {
  const [messageTitle, setMessageTitle] = useState('')
  const [message, setMessage] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)
  const [dialogMove, setDialogMove] = useState(false)
  const [change, setChange] = useState(false)
  const actions = [
    { action: 'borrow', number: borrowMessage.length+borrowRegisteredMessage.length,
      fill: 'red'},
    { action: 'lend', number: lendMessage.length+lendRegisteredMessage.length,
      fill: 'blue'},
  ]
  const labels = {
    number: {
      label: 'total',
    },
    borrow: {
      label: 'borrow',
      color: '#2563eb',
    },
    lend: {
      label: 'lend',
      color: '#60a5fa',
    },
  } satisfies ChartConfig
  const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)
  const token = 'BQCyWDqTC23URyglem7QVVPVbPeX4RbjUFV5D-FQTLal6j9uiHZxwVWdGUVNA352AWmn40n-zo0Hm9kHL7pmtxc6PW2_cP93grpSvQJn4EuIm5SR2JXYiIqIUHXgafR5B36xRKKFjhiZ6-b66mSS1m8DtXeLqMbqHLEWK8y1YLNIkFU3Kf7kGtc2BkvGXjYxKg36frFaCLb73ohY75Itfjl0k3bVCVuHsVuGk-qOyEc_mBP5SpaUPtzOu0tWOXv_V6Wpsgv3FJP4HPNVU3kboktBqBHAZySmPcQv';
  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }

  async function getTopTracks(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    )).items;
  }

  // const topTracks = getTopTracks() || [];
  // console.log(
  //   topTracks?.map(
  //     ({name, artists}) =>
  //       `${name} by ${artists.map(artist => artist.name).join(', ')}`
  //   )
  // );
  const playlistId = '45KR43OZQRfJNEYynFjRq7';

  useEffect(() => {
    const userPlayLists = async () => {
      async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method,
          body:JSON.stringify(body)
        });
        return await res.json();
      }
      async function getTopTracks(){
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
        return (await fetchWebApi(
          'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
        )).items;
      }
      const topTracks = await getTopTracks();
      console.log(
        topTracks?.map(
          ({name, artists}) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
        )
      );
    }
    userPlayLists()
  })
  useEffect(() => {
    if (messageTitle && message) {
      setFormFilledOut(true)
    } else {
      setFormFilledOut(false)
    }
  }, [messageTitle, message])

  const onSubmit = async () => {
    try {
      const newMessage = await addDoc(collection(dbservice, 'violations'), {
        userUid: userObj.uid,
        userName: userObj.displayName,
        messageTitle: messageTitle,
        message: message
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessage('')
      setChange(true)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeMessage = (event) => {
    const {
      target: { name, value }
    } = event
    setMessage(value)
  }
  const onChangeMessageTitle = (event) => {
    const {
      target: { name, value }
    } = event
    setMessageTitle(value)
  }
  const handleClose = () => {
    setDialogMove(false)
  }
  return (  
    <div>
        <ChartContainer
          config={labels}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' hideLabel />}
            />
            <Pie
              data={actions}
              dataKey="number"
              nameKey="action"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalNumber.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Actions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
      </ChartContainer>
      <Accordion 
        defaultValue={["item-1", "item-2"]}
        type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent >
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className='flex text-2xl p-5'>
        신고하기
      </div>
      <div>
        <span>
          발신:&emsp;
        </span>
        <Chip label={userObj.displayName}/>
      </div>
      <div>
        <span>  
          수신:&emsp;
        </span>
        <Chip label='담당자'/>
      </div>
      <form id='auth'>
        <div className='flex justify-center pt-5'>
          <TextField label='신고하기 제목' multiline value={messageTitle} onChange={onChangeMessageTitle} variant="outlined" fullWidth />
        </div>
        <div className='flex justify-center pt-5'>
          <TextField label='신고하기 내용' multiline rows={5} value={message} onChange={onChangeMessage} variant="outlined" fullWidth />
        </div>
        <div className='flex justify-center pt-2.5'>
          <Button variant='outlined' form='auth' onClick={() => setDialogMove(true)}>신고하기 내역</Button>
          <ContactDialogs move={dialogMove} handleClose={handleClose} userObj={userObj} change={change} setChange={(newState: boolean) => setChange(newState)}/>
          {formFilledOut ?
            <Button variant='outlined' form='auth' onClick={() => onSubmit()}>전송</Button>
          :
            <Button variant='outlined' form='auth' disabled>전송</Button>
          }
        </div>
      </form>
    </div>
  )
}

export default Contact
