import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    profile: boolean
    profileColor: string
    profileImage: string
    fallback: string
}

const Avatars = ({ profile, profileColor, profileImage, fallback }: Props) => {
    // const profileImage = useSelector(state => state.profileImage.value)
    // const profileUrl = useSelector(state => state.profileUrl.value)
    // console.log(profileImage)
    return (
        <div>   
            {profile ? 
                // <Avatar className={`w-48 h-48 bg-${(profileColor || '')[0] === '#' ? 'profile-blue' : profileColor}`}>
                <Avatar className={`w-48 h-48 bg-${(profileColor || '#')[0] === '#' ? 'profile-blue' : profileColor}`}>
                    <AvatarImage src={profileImage} />
                    {profileImage === 'null' && <AvatarFallback className='text-8xl border-none'>{fallback}</AvatarFallback>}
                </Avatar>
                :
                <Avatar className={`bg-${(profileColor || '#')[0] === '#' ? 'profile-blue' : profileColor}`}>
                    <AvatarImage src={profileImage} />
                    {profileImage === 'null' && <AvatarFallback className='text-xl border-none'>{fallback}</AvatarFallback>}
                </Avatar>
            }
        </div>
    )
}

export default Avatars
