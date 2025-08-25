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
            <span>Essa página é muito legal</span>
            <button onClick={handleNavigate} >Clique aqui!</button>
        </div>
  )
}

export default HomePage