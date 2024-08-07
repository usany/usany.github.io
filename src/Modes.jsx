import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Switches from 'src/muiComponents/Switches';

const onClick = (colors, setColors, setMode) => {
    // document.body.classList.toggle("dark-theme")
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
    // let theme = "light";
    // if (document.body.classList.contains("dark-theme")) {
    //     theme = "dark";
    // }
    // localStorage.setItem("theme", theme);
}

// const Button = ({ 
//     colorMode, 
//     color, setColor }) => {
//     const theme = useTheme();
//     return (
//         <button onClick={() => onClick(color, setColor)}>
//             <IconButton color="inherit">
//                 {color === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
//             </IconButton>
//         </button>
//     )
// }

function Modes({ colors, setColors, setMode }) {
    // const [color, setColor] = useState(localStorage.getItem("theme"));
    
    // useEffect(() => {
    //     localStorage.setItem("theme", color);
    //     if (color === 'dark') {
    //         document.body.classList.add("dark-theme")
    //     } else {
    //         document.body.classList.remove("dark-theme")
    //     }
    // })
    // const colorMode = {
    //     toggleColorMode: color,
    // }
    // const theme = createTheme({
    //     palette: {
    //         color,
    //     },
    // })

    return (
        <div className='flex justify-center p-5'>
        <Switches onClick={() => onClick(colors, setColors, setMode)}/>
            {/* <ThemeProvider theme={theme}>
                <Button 
                    colorMode={colorMode} 
                    color={color} setColor={setColor} />
            </ThemeProvider> */}
            {/* {color === 'light' && 
                <div>
                    <Brightness7Icon />
                </div>
            }
            <Switch onClick={() => {
                onClick(color, setColor, setMode)
            }} />
            {color === 'dark' &&
                <div>
                    <Brightness4Icon />
                </div>
            } */}
        </div>
    )
}

export default Modes