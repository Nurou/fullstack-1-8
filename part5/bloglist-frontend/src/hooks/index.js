import { useState } from 'react'

export const useField = (type, placeholder) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const excludeReset = {
    type,
    placeholder,
    value,
    onChange,
  }

  return {
    type,
    placeholder,
    value,
    onChange,
    reset,
    excludeReset,
  }
}
