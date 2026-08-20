"use client";
import React, { useState } from "react";
import JavaScript from "../assets/javascript.png";
import Tailwind from "../assets/tailwind.png";
import MUI from "../assets/mui.png";
import ReactJs from "../assets/react.png";
import NuxtJs from "../assets/nuxt.png";
import VueJs from "../assets/vue.png";
import NextJs from "../assets/next.png";
import Pinia from "../assets/pinia.png";
import Redux from "../assets/redux.png";
import TypeScript from "../assets/typescript.png";
import Image from "next/image";
import {
  SiExpress,
  SiFirebase,
  SiJsonwebtokens,
  SiMongodb,
  SiNodedotjs,
} from "react-icons/si";

const INITIAL_VISIBLE_COUNT = 8;

const skills = [
  {
    name: "JavaScript",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={JavaScript}
        alt="javascript icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "TypeScript",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={TypeScript}
        alt="typescript icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Vue 2/3",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={VueJs}
        alt="vue icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Nuxt 2/3",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={NuxtJs}
        alt="nuxt icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Tailwind CSS",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={Tailwind}
        alt="tailwind icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Material UI",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={MUI}
        alt="mui icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "React",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={ReactJs}
        alt="react icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Next.js",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={NextJs}
        alt="next icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Pinia",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={Pinia}
        alt="pinia icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Redux Toolkit",
    render: () => (
      <Image
        className="w-20 h-20 object-contain"
        src={Redux}
        alt="redux icon"
        width={80}
        height={80}
      />
    ),
  },
  {
    name: "Node.js",
    render: () => (
      <SiNodedotjs className="w-20 h-20 text-[#339933]" aria-hidden="true" />
    ),
  },
  {
    name: "Express",
    render: () => (
      <SiExpress className="w-20 h-20 text-[#FDE7EF]" aria-hidden="true" />
    ),
  },
  {
    name: "MongoDB",
    render: () => (
      <SiMongodb className="w-20 h-20 text-[#47A248]" aria-hidden="true" />
    ),
  },
  {
    name: "JWT",
    render: () => (
      <SiJsonwebtokens className="w-20 h-20 text-[#FDE7EF]" aria-hidden="true" />
    ),
  },
  {
    name: "Firebase",
    render: () => (
      <SiFirebase className="w-20 h-20 text-[#FFCA28]" aria-hidden="true" />
    ),
  },
  {
    name: "Zustand",
    render: () => (
      <span className="text-6xl leading-none" aria-hidden="true">
        🐻
      </span>
    ),
  },
];

const Skills = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? skills : skills.slice(0, INITIAL_VISIBLE_COUNT);
  const hiddenCount = skills.length - INITIAL_VISIBLE_COUNT;

  return (
    <div
      name="skills"
      className="w-full min-h-screen py-16 md:py-20 bg-[#000] text-[#FDE7EF] flex justify-center items-center"
    >
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full">
        <div>
          <p className="text-4xl font-bold inline border-b-4 border-primary">
            My Skills
          </p>
          <p className="py-4">My skills include but are not limited to -</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8">
          {visibleSkills.map((skill) => (
            <div
              key={skill.name}
              className="shadow-sm shadow-[#23231f] hover:scale-110 duration-500 p-6 h-40 flex flex-col items-center justify-center gap-4"
            >
              {skill.render()}
              <p>{skill.name}</p>
            </div>
          ))}
        </div>

        {hiddenCount > 0 ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-black px-6 py-2 rounded-3xl transition-colors duration-300"
              aria-expanded={showAll}
            >
              {showAll ? "See less" : `See more (+${hiddenCount})`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Skills;
