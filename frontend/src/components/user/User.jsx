import React from 'react'
import { Image } from 'react-bootstrap'
import './style.css'

const User = () => {
  return (
    <div className='image-container pointer'>
        <Image src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600' alt='user-img' />
    </div>
  )
}

export default User