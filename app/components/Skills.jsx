"use client";
import React from "react";
import HTML from "../assets/html.png";
import CSS from "../assets/css.png";
import JavaScript from "../assets/javascript.png";
import Tailwind from "../assets/tailwind.png";
import MUI from "../assets/mui.png";
import Github from "../assets/github.png";
import ReactJs from "../assets/react.png";
import NuxtJs from "../assets/nuxt.png";
import VueJs from "../assets/vue.png";
import NextJs from "../assets/next.png";
import Pinia from "../assets/pinia.png";
import Redux from "../assets/redux.png";
import TypeScript from "../assets/typescript.png";
import Image from "next/image";

const Skills = () => {
  return (
    <div name="skills" className="w-full py-10 md:h-screen bg-[#000] text-[#FDE7EF]">
      {/* container */}
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="">
          <p className="text-4xl font-bold inline border-b-4 border-primary">
            My Skills
          </p>
          <p className="py-4">My skills include but are not limited to -</p>
        </div>
        {/* icons container */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8">
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={HTML}
              alt="html icon"
              width={80}
              height={80}
            />
            <p>HTML</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={CSS}
              alt="css icon"
              width={80}
              height={80}
            />
            <p>CSS</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={JavaScript}
              alt="javascript icon"
              width={80}
              height={80}
            />
            <p>JavaScript</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={ReactJs}
              alt="react icon"
              width={80}
              height={80}
            />
            <p>React</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={NextJs}
              alt="next icon"
              width={80}
              height={80}
            />
            <p>Next.js</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={Tailwind}
              alt="tailwind icon"
              width={80}
              height={80}
            />
            <p>Tailwind CSS</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={MUI}
              alt="mui icon"
              width={80}
              height={80}
            />
            <p>Material UI</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={VueJs}
              alt="vue icon"
              width={80}
              height={80}
            />
            <p>Vue 2/3</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={NuxtJs}
              alt="nuxt icon"
              width={80}
              height={80}
            />
            <p>Nuxt 2/3</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={Pinia}
              alt="pinia icon"
              width={80}
              height={80}
            />
            <p>Pinia</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={Redux}
              alt="redux icon"
              width={80}
              height={80}
            />
            <p>Redux Toolkit</p>
          </div>
          <div className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4">
            <Image
              className="w-20 h-20 object-contain"
              src={TypeScript}
              alt="typescript icon"
              width={80}
              height={80}
            />
            <p>TypeScript</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
