import { MainLayoutProps } from "../types"

export default function MainLayout(props: MainLayoutProps) {
  return (
    <main className="flex-1 overflow-hidden">
      {props.children}
    </main>
  )
}