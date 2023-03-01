import React from 'react'
import logo from './logo.png'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
        <img src={logo} alt="" className='headrimg' srcSet="" />
        <div>petopia
        <p>address: 11th cross,indra nagar,adyar-20,chennai,tamil nadu,india,600020</p></div>
    </div>
  )
}

export default Header