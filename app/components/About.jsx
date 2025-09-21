"use client";
import React from "react";

const About = () => {
  return (
    <div name="about" className="w-full h-screen bg-[#000] text-gray-300">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-4">
          <div className="sm:text-right pb-8 pl-4">
            <p className="text-4xl font-bold inline border-b-4 border-primary">
              About Me
            </p>
          </div>
          <div></div>
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-4 px-4">
          <div>
            <p className="sm:text-right text-4xl font-bold">
              Hi, I'm Favour — thanks for stopping by.
            </p>
          </div>
          <div>
            <div className="space-y-3">
              <p>
                I am Favour Enwonwu, a Frontend Software Engineer with 3.5 years
                of experience building performant web apps in Vue 3/Nuxt 3 and
                React/Next.js. I specialize in state management (Pinia, Vuex,
                Redux Toolkit), modern styling (Tailwind CSS), and scalable UI
                architectures.
              </p>
              <p>
                I care about clean, accessible interfaces and collaborate
                closely with designers and backend engineers to ship
                business‑impacting features.
              </p>
              <p>
                My approach emphasizes reusable components, clear state
                boundaries, and thoughtful code reviews—so teams can move fast
                without breaking things. I enjoy partnering with product and
                design to turn complex requirements into intuitive user
                journeys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
