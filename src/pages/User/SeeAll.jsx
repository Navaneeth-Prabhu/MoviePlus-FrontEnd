import React from 'react'
import Navbar from '../../components/User/Navbar'
import ShowMore from '../../components/User/SeeAll/SeeAll'

function SeeAll() {
  return (
    <div>

        <Navbar/>
        <div className='w-full justify-center items-center bg-[#181818]'>
    <div className='max-w-[1240px] m-auto'>
        <ShowMore/>
    </div>

        </div>
    </div>
  )
}

export default SeeAll