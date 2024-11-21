import Switches from 'src/muiComponents/Switches';
import { useThemeStore } from 'src/store'

const Modes = () => {
    const theme = useThemeStore((state) => state.theme)
    const handleThemeLight = useThemeStore((state) => state.handleThemeLight)
    const handleThemeDark = useThemeStore((state) => state.handleThemeDark)
    return (
        <div className='flex justify-center p-5'>
            <Switches onClick={() => {
                document.documentElement.classList.toggle("dark")
                if (theme === 'light') {
                    localStorage.setItem("theme", 'dark');
                    handleThemeDark()
                } else {
                    localStorage.setItem("theme", 'light');
                    handleThemeLight()
                }
            }}/>
        </div>
    )
}

export default Modes