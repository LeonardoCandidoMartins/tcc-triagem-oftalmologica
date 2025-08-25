import React from 'react'
import { useNavigate } from 'react-router-dom'

const OtherPage = () => {
  const navigate = useNavigate()
    const handleNavigate = () => {
        // navigate(-1)
        navigate('/')
    }
  return (
    <div>
        <span>OtherPage</span>
        <button onClick={handleNavigate} >Voltar!</button>
    </div>
  )
}

export default OtherPage