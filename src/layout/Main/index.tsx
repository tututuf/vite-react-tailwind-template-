import { ReactNode } from "react"

interface MainLayoutProps{
  children?: ReactNode
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <main className="flex-1">
      {props.children}
    </main>
  )
}