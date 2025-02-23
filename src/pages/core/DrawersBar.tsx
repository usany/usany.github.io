import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
// import Avatar from '@mui/material/Avatar';
// import { blue } from '@mui/material/colors';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const DrawersBar = () => {
    
    return (
        <div className='flex justify-center'>
            <div className="bg-light-2 dark:bg-dark-2 h-2 w-[100px] rounded-full bg-muted">
                &emsp;
            </div>
        </div>
    )
}

export default DrawersBar
