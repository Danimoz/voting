'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton(){
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container">
      <button 
        className="p-3 rounded-lg"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {resolvedTheme === 'dark' ? 'light' : 'dark'}
      </button>
    </div>
  )
}