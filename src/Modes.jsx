import Switches from 'src/muiComponents/Switches';
import { modeStore } from 'src/store'

const onClick = ({ colors, setColors, setMode, stateMode, modes, handleModes }) => {
    document.documentElement.classList.toggle("dark")
    if (stateMode.mode !== 'dark') {
        // setColors('dark')
        // setMode('dark')
        localStorage.setItem("theme", 'dark');
    } else {
        // setColors('light')
        // setMode('light')
        localStorage.setItem("theme", 'light');
    }
    handleModes()
}

const Modes = ({ colors, setColors, setMode, stateMode, handleModes }) => {
    const modes = modeStore((state) => state.mode)
    const handleModeLight = modeStore((state) => state.handleModeLight)
    const handleModeDark = modeStore((state) => state.handleModeDark)
    return (
        <div className='flex justify-center p-5'>
            <Switches onClick={() => {
                onClick({ colors, setColors, setMode, stateMode, handleModes, modes })
                if (modes === 'light') {
                    handleModeDark()
                } else {
                    handleModeLight()
                }
            }}/>
        </div>
    )
}

export default Modes