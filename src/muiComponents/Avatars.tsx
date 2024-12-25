import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    profile: boolean
    image: string
    fallback: string
}

const Avatars = ({ profile, image, fallback }: Props) => {
    const profileImage = useSelector(state => state.profileImage.value)

    return (
        <div>
            {profile ? 
                <Avatar className='w-48 h-48'>
                    {profileImage && <AvatarImage src={image} />}
                    <AvatarFallback className='text-8xl'>{fallback}</AvatarFallback>
                </Avatar>
                :
                <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
            }
        </div>
    )
}

export default Avatars
