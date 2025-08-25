import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/other-page")
    }

    return (
        <div>
            <span>HomePage</span>
            <button onClick={handleNavigate} >Clique aqui!</button>
        </div>
  )
}

export default HomePage