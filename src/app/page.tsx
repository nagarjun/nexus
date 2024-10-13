'use client'

import { useDarkMode } from './hooks/useDarkMode'

export default function Home() {
  // We're not using the returned values directly, but this ensures the hook is initialized
  useDarkMode()

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <span className="text-xl">Nexus</span>
    </div>
  )
}
