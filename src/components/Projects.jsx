import React from 'react'
import WorkImg from '../assets/projects/workImg.jpeg'
import RealEstate from '../assets/projects/realestate.jpg'

const Projects = () => {
  return (
    <div name='projects' className='w-full md:h-screen bg-[#000] text-[#FDE7EF]'>
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-[yellow]'>Projects</p>
                <p className='py-6'>Check out some of my projects</p>
            </div>
            {/* Container */}
            <div  
            className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>


                {/* Grid Item */}
                <div style={{backgroundImage: `url(${WorkImg})`}} className='shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div'>


                    {/* hover effects */}
                    <div className='opacity-0 group-hover:opacity-100'>
                        <span className='text-2xl font-bold tracking-wider'> ReactJs Application</span>
                        <div className='pt-8 text-center'>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Open Project
                                </button>
                            </a>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Check Code
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Grid Item */}
                <div style={{backgroundImage: `url(${RealEstate})`}} className='shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div'>


                    {/* hover effects */}
                    <div className='opacity-0 group-hover:opacity-100'>
                        <span className='text-2xl font-bold tracking-wider'> ReactJs Application</span>
                        <div className='pt-8 text-center'>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Open Project
                                </button>
                            </a>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Check Code
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{backgroundImage: `url(${WorkImg})`}} className='shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div'>


                    {/* hover effects */}
                    <div className='opacity-0 group-hover:opacity-100'>
                        <span className='text-2xl font-bold tracking-wider'> ReactJs Application</span>
                        <div className='pt-8 text-center'>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Open Project
                                </button>
                            </a>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Check Code
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{backgroundImage: `url(${RealEstate})`}} className='shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div'>


                    {/* hover effects */}
                    <div className='opacity-0 group-hover:opacity-100'>
                        <span className='text-2xl font-bold tracking-wider'> ReactJs Application</span>
                        <div className='pt-8 text-center'>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Open Project
                                </button>
                            </a>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Check Code
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{backgroundImage: `url(${WorkImg})`}} className='shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div'>


                    {/* hover effects */}
                    <div className='opacity-0 group-hover:opacity-100'>
                        <span className='text-2xl font-bold tracking-wider'> ReactJs Application</span>
                        <div className='pt-8 text-center'>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Open Project
                                </button>
                            </a>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Check Code
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{backgroundImage: `url(${RealEstate})`}} className='shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div'>


                    {/* hover effects */}
                    <div className='opacity-0 group-hover:opacity-100'>
                        <span className='text-2xl font-bold tracking-wider'> ReactJs Application</span>
                        <div className='pt-8 text-center'>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Open Project
                                </button>
                            </a>
                            <a href="/">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg'>
                                    Check Code
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Projects