import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import './Header.css'
import Clock from '../Clock/Clock'

function Header() {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  return (
    <>
      <Nav className='navbar'>
        <NavItem>
          <h1 className='greeting'>Welcome, {storedUser.username}</h1>
        </NavItem>
        <NavItem>
          <Clock />
        </NavItem>
      </Nav>
    </>
  )
}

export default Header