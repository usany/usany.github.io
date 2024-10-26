import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';

function Points({ isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setBottomNavigation, profileColor }) {
  const {state} = useLocation()
  const navigate = useNavigate()

  return (
    <div className='flex flex-col pb-20'>
      <div className='flex text-2xl p-5'>
          {state.user}의 포인트 적립 영수증
      </div>
      <div className='flex justify-center'>
        포인트 합계: {state.points}
      </div>
      {/* <div className='flex'>
        <div className='flex flex-col justify-center px-5'>
          내 랭킹
        </div>
        <div className='flex-col'>
          <div>내 이름</div> 
          <div>포인트</div> 
        </div>
      </div> */}
        <List sx={{ width: '100%', 
          // maxWidth: 360,
          bgcolor: 'background.paper' }}>
            <div>
            {state.borrowRegisteredMessage.map((element, index) => {
              return(
                <div key={index}>
                    <ListItem>
                      <div className='flex flex-col justify-center w-screen'>
                      <div className='flex justify-center'>
                        {element.connectedName}에게 빌림
                      </div>
                      <div className='flex justify-center'>
                        {element.text.count} {element.text.counter} {element.text.counting}
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
                      </div>
                      <div className='flex justify-center'>
                        포인트 -{element.point}
                      </div>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
            {state.borrowMessage.map((element, index) => {
              return(
                <div key={index}>
                    <ListItem>
                      <div className='flex flex-col justify-center w-screen'>
                      <div className='flex justify-center'>
                        {element.connectedName}에게 빌림
                      </div>
                      <div className='flex justify-center'>
                        {element.text.count} {element.text.counter} {element.text.counting}
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
                      </div>
                      <div className='flex justify-center'>
                        포인트 -{element.point}
                      </div>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
            {state.lendRegisteredMessage.map((element, index) => {
              return(
                <div key={index}>
                    <ListItem>
                      <div className='flex flex-col justify-center w-screen'>
                      <div className='flex justify-center'>
                        {element.connectedName}에게 빌려줌
                      </div>
                      <div className='flex justify-center'>
                        {element.text.count} {element.text.counter} {element.text.counting}
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
                      </div>
                      <div className='flex justify-center'>
                        포인트 +{element.point}
                      </div>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
            {state.lendMessage.map((element, index) => {
              return(
                <div key={index}>
                    <ListItem>
                      <div className='flex flex-col justify-center w-screen'>
                      <div className='flex justify-center'>
                        {element.connectedName}에게 빌려줌
                      </div>
                      <div className='flex justify-center'>
                        {element.text.count} {element.text.counter} {element.text.counting}
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
                      </div>
                      <div className='flex justify-center'>
                        {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
                      </div>
                      <div className='flex justify-center'>
                        포인트 +{element.point}
                      </div>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
            </div>
        </List>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
    </div>  
  )
}

export default Points
