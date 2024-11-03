import Switches from 'src/muiComponents/Switches';
import { useThemeStore } from 'src/store'

// const onClick = ({ colors, setColors }) => {
//     document.documentElement.classList.toggle("dark")
//     if (stateMode.mode !== 'dark') {
        
//         localStorage.setItem("theme", 'dark');
//     } else {
        
//         localStorage.setItem("theme", 'light');
//     }
// }

const Modes = () => {
    const mode = useThemeStore((state) => state.mode)
    const handleModeLight = useThemeStore((state) => state.handleModeLight)
    const handleModeDark = useThemeStore((state) => state.handleModeDark)
    return (
        <div className='flex justify-center p-5'>
            <Switches onClick={() => {
                document.documentElement.classList.toggle("dark")
                if (mode === 'light') {
                    localStorage.setItem("theme", 'dark');
                    handleModeDark()
                } else {
                    localStorage.setItem("theme", 'light');
                    handleModeLight()
                }
            }}/>
        </div>
    )
}

export default Modes