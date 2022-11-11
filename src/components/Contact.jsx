import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className='w-full h-screen bg-black text-[#FDE7EF] flex justify-center items-center p-4'>
        <form action="https://getform.io/f/d049b3df-f8b6-4102-84f2-a402bd614d09" method="POST" className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-[yellow]'>Contact Me</p>
                <p className='py-4 '>Submit the form below or send an email to - favourenwonwukc@gmail.com</p>
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