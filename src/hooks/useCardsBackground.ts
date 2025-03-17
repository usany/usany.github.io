import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { useSelector } from 'react-redux';

const useCardsBackground = () => {
  const theme = useSelector((state) => state.theme)
  const color = theme === 'dark' ? '#2d3848' : '#e2e8f0'
  return ({ color })
}
export default useCardsBackground
