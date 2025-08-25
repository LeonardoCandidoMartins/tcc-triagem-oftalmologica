import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        // navigate(-1)
        navigate('/')
    }
  return (
    <>
        <div>NotFound</div>
        <button onClick={handleNavigate}> Ir para inicio </button>
    </>
  )
}

export default NotFoundPage