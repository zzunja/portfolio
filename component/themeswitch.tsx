'use client'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';


export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), [])

  if (!mounted) return null; 

  if (resolvedTheme === 'dark') {
    return <MdLightMode
      className="w-[45px] h-[45px] cursor-pointer mt-1 text-yellow-500"
      onClick={() => setTheme('light')}
    />
  }

  if (resolvedTheme === 'light') {
    return <MdDarkMode
      className="w-[45px] h-[45px] cursor-pointer mt-1 text-gray-500"
      onClick={() => setTheme('dark')}
    />
  }
}