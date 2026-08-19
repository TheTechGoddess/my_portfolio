"use client";
import React from "react";

const About = () => {
  return (
    <div name="about" className="w-full md:min-h-screen md:py-20 bg-[#000] text-gray-300">
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
              Hi, I&apos;m Favour. Thanks for stopping by.
            </p>
          </div>
          <div>
            <div className="space-y-3">
              <p>
                I&apos;m a Frontend Software Engineer with 4 years of experience
                building performant and scalable web applications with Vue
                3/Nuxt 3 and React/Next.js. Frontend engineering is where I have
                the most professional experience, with a focus on state
                management, reusable component architecture, modern styling, and
                building intuitive, accessible user interfaces.
              </p>
              <p>
                My frontend experience includes Pinia, Vuex, Zustand, TanStack
                Query, Redux Toolkit, Tailwind CSS, and Vuetify. I care about
                writing maintainable code, establishing clear state boundaries,
                and building interfaces that solve real user and business needs.
              </p>
              <p>
                Alongside my frontend experience, I have less than a year of
                hands-on backend experience with Node.js. I&apos;ve built APIs,
                authentication systems, and data models as part of full-stack
                projects, giving me practical experience working across the
                application stack and understanding how frontend and backend
                systems integrate.
              </p>
              <p>
                I enjoy collaborating with designers, backend engineers, and
                product teams to turn complex requirements into reliable,
                user-focused products. My approach emphasizes reusable
                solutions, thoughtful architecture, and maintainable code that
                teams can confidently build on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
