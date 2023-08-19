import { MainLayoutProps } from "../types"

export default function MainLayout(props: MainLayoutProps) {
  return (
    <main className="flex-1 p-3">
      <div className="bg-[--theme-bg-color] h-full w-full rounded-xl overflow-auto">
        {props.children}  
      </div>
    </main>
  )
}