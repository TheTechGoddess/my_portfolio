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
        <div className="max-w-[1000px] w-full px-4 mt-8 flex sm:justify-end">
          <div className="relative group inline-block">
            <button
              type="button"
              aria-label="More about this portfolio"
              className="w-11 h-11 rounded-full border-2 border-primary text-[#FDE7EF] bg-gradient-to-br from-primary to-secondary hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(252,69,138,0.75)] font-bold"
            >
              i
            </button>
            <div className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[440px] sm:left-auto sm:translate-x-0 sm:right-0 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-[#14111a] via-[#0b0b0b] to-[#0d1625] text-accent p-4 sm:p-5 text-sm leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 shadow-[0_0_28px_rgba(69,153,252,0.25)]">
              I hid this because I wasn&apos;t sure you&apos;d care, but I built this
              little corner of the internet myself. <span className="text-primary">🫣✨</span>
              <br />
              It&apos;s powered by <span className="text-secondary font-semibold">Next.js</span>,
              <span className="text-primary font-semibold"> React</span>,
              <span className="text-secondary font-semibold"> Tailwind CSS</span>, and
              <span className="text-primary font-semibold"> Firebase</span>, with a
              sprinkle of <span className="text-secondary font-semibold">JavaScript</span>{" "}
              magic behind the scenes.
              <br />
              Basically, yes, I did spend an{" "}
              <span className="text-primary font-semibold">unreasonable amount of time</span>{" "}
              making a website to tell you that I make websites.{" "}
              <span className="text-secondary">😂</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
