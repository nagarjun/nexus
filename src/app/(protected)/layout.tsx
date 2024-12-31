'use client'

import { Frame } from '@/partials'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <Frame>{children}</Frame>
}
