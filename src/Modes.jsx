import Switches from 'src/muiComponents/Switches';

const onClick = (colors, setColors, setMode) => {
    document.documentElement.classList.toggle("dark")
    if (colors === 'light') {
        setColors('dark')
        setMode('dark')
        localStorage.setItem("theme", 'dark');
    } else {
        setColors('light')
        setMode('light')
        localStorage.setItem("theme", 'light');
    }
}

const Modes = ({ colors, setColors, setMode }) => {
    return (
        <div className='flex justify-center p-5'>
            <Switches onClick={() => onClick(colors, setColors, setMode)}/>
        </div>
    )
}

export default Modes