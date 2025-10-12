import React from 'react'
import { FiSun, FiMoon } from "react-icons/fi"
import { ThemeContext } from "../context/ThemeContext";


const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button 
        onClick={toggleTheme}
        className='p-2 rounded-lg hover:bg-gray-100 dark:hover bg-neutral-800 transition'
        title='Toggle theme'
        >
            {theme == "light" ? (
                <FiMoon className="text-gray-700"/>
            ):(
                <FiSun className="text-yellow-400"/>
            )}

        </button>
    )
}

export default ThemeToggle
