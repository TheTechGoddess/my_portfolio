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
      <div className="max-w-[1000px] mx-auto px-8 pt-4 flex flex-col justify-center h-full">
        <p className="text-primary">My name is</p>
        <h1 className="text-4xl sm:text-7xl font-bold">Favour Enwonwu</h1>
        <h2 className="text-4xl sm:text-7xl font-bold text-secondary">
          Software Engineer
        </h2>
        <div className="text-accent py-4 max-w-[700px] space-y-3">
          <p>
            I&apos;m a Frontend Engineer with 4 years of experience building
            performant and scalable web applications with Vue 3/Nuxt 3 and
            React/Next.js. I specialize in state management with Pinia, Vuex,
            Zustand, TanStack Query, and Redux Toolkit, as well as modern
            styling with Tailwind CSS and Vuetify.
          </p>
          <p>
            I also have less than a year of hands-on backend experience with
            Node.js, building APIs, authentication, and data models through
            full-stack projects. My professional experience is primarily in
            frontend engineering, with growing practical experience across the
            backend.
          </p>
        </div>
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
