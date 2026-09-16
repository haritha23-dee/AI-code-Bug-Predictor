import {Moon, Sun} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle(){
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick = {toggleTheme}
            aria-label = "Toggle theme"
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-border hover:bg-border/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"    
        >
            {theme === 'dark' ? <Sun size = {17} /> : <Moon size = {17}/> }
        </button>
    );
}