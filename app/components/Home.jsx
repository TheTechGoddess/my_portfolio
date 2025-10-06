"use client";
import React, { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-scroll";

const Home = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <div name="home" className="w-full h-screen bg-[#000] text-[#FDE7EF] ">
      {/* container */}
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <p className="text-primary">My name is</p>
        <h1 className="text-4xl sm:text-7xl font-bold">Favour Enwonwu</h1>
        <h2 className="text-4xl sm:text-7xl font-bold text-secondary">
          Frontend Software Engineer
        </h2>
        <p className="text-accent py-4 max-w-[700px]">
          Frontend Engineer with 4 years of experience building performant web
          apps in Vue 3/Nuxt 3 and React/Next.js. I specialize in state
          management (Pinia, Vuex, Zustand. Tanstack Query, Redux Toolkit),
          modern styling (Tailwind CSS, Vuetify), and scalable UI architectures.
          I ship clean, accessible interfaces with a strong focus on user goals.
        </p>
        <div>
          <button className="text-white border-2 px-6 py-3 my-2 flex items-center group hover:bg-secondary rounded-3xl hover:border-[#889]">
            <Link
              onClick={handleClick}
              to="projects"
              smooth={true}
              duration={500}
            >
              Projects
            </Link>
            <span className="group-hover:rotate-90 duration-300">
              <HiArrowNarrowRight className="ml-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
