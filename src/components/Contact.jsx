import React from 'react'
import {FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { BsFillPersonLinesFill } from 'react-icons/bs'

const Contact = () => {
  return (
    <div name='contact' className='w-full  bg-black text-[#FDE7EF] flex justify-center items-center p-4'>
        <form action="https://getform.io/f/d049b3df-f8b6-4102-84f2-a402bd614d09" method="POST" className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-[yellow]'>Contact Me</p>
                <div className='lg:hidden'>
            <ul className='flex justify-between my-8'>
                <li className='w-[60px] h-[60px] flex duration-300 bg-blue-600 rounded-3xl'>
                    <a className='flex justify-between items-center w-full text-[#F8EFF1]' href="https://www.linkedin.com/in/favour-enwonwu-kc/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30}/>
                        </a>
                </li>
                
                <li className='w-[60px] h-[60px] flex duration-300 bg-[#333] rounded-3xl'>
                    <a className='flex justify-between items-center w-full text-[#F8EFF1]' href="https://github.com/TheTechGoddess" target="_blank" rel="noopener noreferrer"><FaGithub size={30}/>
                        </a>
                </li>

                <li className='w-[60px] h-[60px] flex duration-300 bg-[#657725] rounded-3xl'>
                    <a className='flex justify-between items-center w-full text-[#F8EFF1]' href="/" target="_blank" rel="noopener noreferrer"><HiOutlineMail size={30}/>
                        </a>
                </li>

                <li className='w-[60px] h-[60px] flex duration-300 bg-[#565f65] rounded-3xl'>
                    <a className='flex justify-between items-center w-full text-[#F8EFF1]' href="https://docs.google.com/document/d/e/2PACX-1vSxs1FZqhzG4OtXMBTRHQu_KMLqtwG-CoKNT6bE0GgHk-wJPgnr4qVTQc6bs1fw4odcKkUyELtttd_X/pub" download target="_blank" rel="noopener noreferrer"><BsFillPersonLinesFill size={30}/>
                        </a>
                </li>

                <li className='w-[60px] h-[60px] flex duration-300 bg-[#fff] rounded-3xl'>
                    <a className='flex justify-between items-center w-full text-[#1DA1F2]' href="https://twitter.com/Tech__Goddess?t=OQ9_Ywu9MShqvLcxRs41dw&s=09" target="_blank" rel="noopener noreferrer"><FaTwitter size={30}/>
                        </a>
                </li>
            </ul>

        </div>
                <p className='py-4 '>Submit the form below or send an email to - favourenwonwukc@gmail.com -- to reach out to me for collaborations and gigs...</p>
            </div>
            <input type="text" placeholder='Name' name='name' className='p-2 bg-[#657725] rounded-lg'/>
            <input type="email" placeholder='Email' name='email' className='my-4 p-2 bg-[#657725] rounded-lg' />
            <textarea name="message" placeholder='Type your message here' id="message" rows="6" className='bg-[#657725] p-2 rounded-lg'></textarea>

            <button className= 'border-2 bg-[#657725] hover:bg-[#657725] hover:text-black px-4 py-3 my-8 mx-auto flex items-center rounded-lg'>Submit</button>
        </form>
    </div>
  )
}

export default Contact