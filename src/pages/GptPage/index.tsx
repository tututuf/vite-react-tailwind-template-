import { useParams } from "react-router"
import SearchInput from "@/components/SearchInput"
import { ChangeEvent, FormEvent, useState } from "react"

export default function GptPage() {
  const params = useParams()
  const [ inputVal, setInputVal ] = useState('')
  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }
  const onSubmitHnadler = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="bg-white h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">{params.gptId}</div>
      <div className="flex justify-center h-5rem">
        <SearchInput value={inputVal} onChange={ onInputChangeHandler } onSubmit={ onSubmitHnadler }></SearchInput>
      </div>
    </div>
  )
}

