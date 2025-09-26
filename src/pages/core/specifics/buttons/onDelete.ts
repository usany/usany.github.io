import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { deleteDoc, doc } from 'firebase/firestore'
import { useSelectors, useTexts } from 'src/hooks'
import { dbservice } from 'src/baseApi/serverbase'
import { useState } from 'react'
import deleteMessage from 'src/pages/core/card/deleteMessage'

const onDelete = async (id: string) => {
  const data = doc(dbservice, `num/${id}`)
  deleteDoc(data)
}
export default onDelete
