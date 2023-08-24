import { useParams } from "react-router"
import SearchInput from "@/components/SearchInput"
import { ChangeEvent, FormEvent, useState } from "react"
import { getResource } from "@/utils"

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
    <div className="bg-[#f5f5f5] h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-3">
        <div className="clear-both">
          <img src={ getResource('react.svg') } className="inline-block w-7 mx-3 align-middle float-left"/>
          <span className="bg-white py-1 px-2 rounded-md align-middle float-left max-w-5xl inline-block">你好, {params.gptId}</span>
        </div>
        <div className="clear-both">
          <img src={ getResource('react.svg') } className="inline-block w-7 mx-3 align-middle float-right"/>
          <span className="bg-white py-1 px-2 rounded-md align-middle float-right">你好, {params.gptId}</span>
        </div>
        <div className="clear-both">
          <img src={ getResource('react.svg') } className="inline-block w-7 mx-3 align-middle float-left"/>
          <span className="bg-white py-1 px-2 rounded-md align-middle float-left">你好, {params.gptId}</span>
        </div>
      </div>
      <div className="flex justify-center h-5rem">
        <SearchInput value={inputVal} onChange={ onInputChangeHandler } onSubmit={ onSubmitHnadler }></SearchInput>
      </div>
    </div>
  )
}

