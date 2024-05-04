import { isAxiosError } from "axios";
import { useState } from "react";

interface useError {
  error: string[] | null
  handleErrorEdit: (error:unknown) => void
  clearError: () => void
}

export function useError(): useError {
  const [error, setError] = useState<string[] | null>(null)

  const handleErrorEdit = (error: unknown) => {
     if (isAxiosError(error) ) {
        const { errors } = error.response?.data
        setError(errors[0])
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    error,
    handleErrorEdit,
    clearError
  }


}