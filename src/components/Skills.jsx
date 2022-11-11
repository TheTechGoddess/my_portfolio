import React from 'react'
import  HTML from '../assets/html.png'
import CSS from '../assets/css.png'
import JavaScript from '../assets/javascript.png'
import ReactJs from '../assets/react.png'
import Tailwind from '../assets/tailwind.png'
import MUI from '../assets/mui.png'
import Github from '../assets/github.png'


const Skills = () => {
  return (
    <div name='skills' className='w-full h-screen bg-[#000] text-[#FDE7EF]'>
        {/* container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className=''>
            <p className='text-4xl font-bold inline border-b-4 border-[yellow]'>My Skills</p>
            <p className='py-4'>My skills include but are not limited to -</p>
        </div>
        {/* icons container */}
        <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
          <div className='shadow-sm shadow-[#23231f] hover:scale-110 duration-500'>
            <img className='w-20 mx-auto' src={HTML} alt="html icon" />
            <p className='my-4'>HTML</p>
          </div>
          <div className='shadow-sm shadow-[#23231f] hover:scale-110 duration-500'>
            <img className='w-20 mx-auto' src={CSS} alt="html icon" />
            <p className='my-4'>CSS</p>
          </div>
          <div className='shadow-sm shadow-[#23231f] hover:scale-110 duration-500'>
            <img className='w-20 mx-auto' src={JavaScript} alt="html icon" />
            <p className='my-4'>JavaScript</p>
          </div>
          <div className='shadow-sm shadow-[#23231f] hover:scale-110 duration-500'>
            <img className='w-20 mx-auto' src={ReactJs} alt="html icon" />
            <p className='my-4'>React</p>
          </div>
          <div className='shadow-sm shadow-[#23231f] hover:scale-110 duration-500'>
            <img className='w-20 mx-auto' src={Tailwind} alt="html icon" />
            <p className='my-4'>Tailwind CSS</p>
          </div>
          <div className='shadow-sm shadow-[#23231f] hover:scale-110 duration-500'>
            <img className='w-20 mx-auto' src={MUI} alt="html icon" />
            <p className='my-4'>Material UI</p>
          </div>
          <div className='shadow-sm shadow-[#23231f] hover:scale-110 duration-500'>
            <img className='w-20 mx-auto' src={Github} alt="html icon" />
            <p className='my-4'>Github</p>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default Skills