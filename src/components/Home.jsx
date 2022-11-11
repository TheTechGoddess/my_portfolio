import React, {useState} from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-scroll'

const Home = () => {
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)
  return (
    <div  name='home' className='w-full h-screen bg-[#000] text-[#FDE7EF] '>
      {/* container */}
    <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
      <p className='text-[yellow]'>My name is</p>
      <h1 className='text-4xl sm:text-7xl font-bold'>Favour Enwonwu</h1>
      <h2 className='text-4xl sm:text-7xl font-bold text-[#657725]'>
        Frontend Developer
      </h2>
      <p className='text-[#889] py-4 max-w-[700px]'>I'm a Frontend Developer with 2 years experience in determining the structure of webpages and ensuring web design is optimized for smart phones, and building reuseable code</p>
      <div>
        <button className='text-white border-2 px-6 py-3 my-2 flex items-center group hover:bg-[#657725] rounded-3xl hover:border-[#889]'>
        <Link onClick={handleClick} to="projects" smooth={true} duration={500}>
          Projects
        </Link>
          <span className='group-hover:rotate-90 duration-300'>
          <HiArrowNarrowRight className='ml-4'/>
          </span>
          
        </button>
      </div>
    </div>
    </div>
  )
}

export default Home