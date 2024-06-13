import React from 'react'
import { Outlet } from 'react-router-dom'
import HomePage from './HomePage'


export default function Layout() {
  return (
    <main>
        <Outlet/>
    </main>
  )
}
