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

const PiazzaDialogs = ({ multiple, handleMultiple, user, userObj, handleMessagesList, displayedName, }) => {
    const [conversation, setConversation] = useState(null)
    useEffect(() => {
        if (user) {
            if (user?.uid < userObj.uid) {
                setConversation(user?.uid[0]+user?.uid[1]+user?.uid[2]+user?.uid[3]+user?.uid[4]+user?.uid[5]+userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5])
            } else {
                setConversation(userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5]+user?.uid[0]+user?.uid[1]+user?.uid[2]+user?.uid[3]+user?.uid[4]+user?.uid[5])
            }
        }
    }, [user])
    return (
        <div>
            {/* <Dialog open={selectUser} onClose={handleClose}>
                <DialogContent>
                    <div>
                        <Avatar alt={user?.displayName} sx={{ bgcolor: user?.profileColor || '#2196f3' }} src={user?.profileImageUrl || './src'} variant="rounded" />
                    </div>
                    <div>
                        {user?.displayName}
                    </div>
                    {user?.displayName !== displayedName &&
                        <div>
                            ({displayedName}에서 개명)
                        </div>
                    }
                </DialogContent>
                <DialogActions>
                <Link to='/profile'
                state={{element: user}}
                >
                    <Button variant='outlined' onClick={() => {
                        handleClose()
                    }}>
                        프로필 확인
                    </Button>
                </Link>
                {multiple && userObj.uid !== user?.uid && 
                    <Link to='/piazza' 
                    state={{conversation: conversation, displayName: user?.displayName, userUid: userObj.uid, chattingUid: user?.uid, multiple: false, profileUrl: user?.profileImageUrl}}>
                        <Button variant='outlined' onClick={() => {
                            handleMsgList([])
                            handleChangeMessage(true)
                            handleClose()
                        }}>
                            개인 대화
                        </Button>
                    </Link>
                }
                </DialogActions>
            </Dialog> */}
            <Drawer>
                <DrawerTrigger>
                    <div id='drawer'></div>
                </DrawerTrigger>
                <DrawerContent className='bg-light-3 dark:bg-dark-3'>
                    <div className='flex justify-center'>
                        <div className="bg-light-2 dark:bg-dark-2 h-2 w-[100px] rounded-full bg-muted">
                            &emsp;
                        </div>
                    </div>
                    <div className='flex flex-col items-center pt-3'>
                        <Avatar className={'bg-profile-blue'}>
                            <AvatarImage src={user?.profileImageUrl} />
                            <AvatarFallback className='text-xl border-none	'>{user?.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            {user?.displayName}
                        </div>
                        {user?.displayName !== displayedName &&
                            <div>
                                ({displayedName}에서 개명)
                            </div>
                        }
                    </div>
                    <div className='flex justify-center p-5'>
                        <Link to='/profile' state={{element: user}}>
                            <Button variant='outlined' onClick={() => {
                                // handleClose()
                            }}>
                                프로필 확인
                            </Button>
                        </Link>
                        {multiple && userObj.uid !== user?.uid && 
                            <Link to='/piazza' state={{conversation: conversation, displayName: user?.displayName, userUid: userObj.uid, chattingUid: user?.uid, multiple: false, profileUrl: user?.profileImageUrl}}>
                                <DrawerClose>
                                    <Button variant='outlined' onClick={() => {
                                        handleMessagesList([])
                                        // handleChangeMessage(true)
                                        handleMultiple(false)
                                        // handleClose()
                                    }}>
                                        개인 대화
                                    </Button>
                                </DrawerClose>
                            </Link>
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default PiazzaDialogs
