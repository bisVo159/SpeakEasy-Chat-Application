import React from 'react'
import AppLayout from '../components/layout/AppLayout'

function Home() {
  return (
    <div className='bg-gray-100 h-full '>
      <h1 className='p-8 text-center'>Select a friend to chat</h1>
    </div>
  )
}

export default AppLayout()(Home)