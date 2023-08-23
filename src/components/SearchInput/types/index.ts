import { ChangeEvent, FormEvent } from "react"

export type inputValue = string | number

export interface SearchInputProps{
  value: inputValue
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent) => void
}