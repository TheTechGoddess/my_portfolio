import React from 'react'

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#000] text-gray-300'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='max-w-[1000px] w-full grid grid-cols-2 gap-4'>
                <div className='sm:text-right pb-8 pl-4'>
                    <p className='text-4xl font-bold inline border-b-4 border-[yellow]'>About Me</p>
                </div>
            <div></div>
            </div>
            <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-4 px-4'>
                <div >
                    <p className='sm:text-right text-4xl font-bold'>Hi, I'm Favour. Nice to meet you. Please take a look around.</p>
                </div>
                <div>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta vero eos, iure, nobis vel quisquam velit aliquam et nam, architecto vitae unde! Molestiae, atque voluptate magnam quae distinctio accusamus aut! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, velit eius omnis quidem eaque possimus excepturi aspernatur, maxime aliquid eos iusto assumenda. Iusto hic qui porro sit soluta facilis excepturi?</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About