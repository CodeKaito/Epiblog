import React from 'react'
import { Image } from 'react-bootstrap'
import './style.css'

const User = () => {
  return (
    <div className='image-container pointer'>
        <Image src='https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg' alt='user-img' />
    </div>
  )
}

export default User