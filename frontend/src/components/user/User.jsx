import React from 'react'
import { Image } from 'react-bootstrap'
import './style.css'

const User = () => {
  return (
    <div className='image-container pointer'>
        <Image src='https://avatars.githubusercontent.com/u/57111980?v=4' alt='user-img' />
    </div>
  )
}

export default User