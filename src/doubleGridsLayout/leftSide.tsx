import { Link } from "react-router-dom"
export default function LeftSide() {
  return (
    <div className="w-60 h-full bg-slate-600 overflow-auto">
      <Link className="w-full bg-slate-700  p-4 block hover:bg-slate-800" to={'/'}>
        1231
      </Link>
    </div>
  )
}