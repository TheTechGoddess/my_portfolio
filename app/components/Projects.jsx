"use client";
import React from "react";
import metabnb from "../assets/projects/meta_bnb.png";
import nasa_pictures from "../assets/projects/nasa_pictures.png";
import workImg from "../assets/projects/workImg.jpeg";
import realestate from "../assets/projects/realestate.jpg";
import madesoftacademy from "../assets/projects/madesoft-academy.png";
import amnid from "../assets/projects/amnid.png";
import hrx from "../assets/projects/hrx.png";
import youverify from "../assets/projects/youverify.png";
import fitxn from "../assets/projects/fitxn.png";
import gowa from "../assets/projects/gowa.png";
import aprotime from "../assets/projects/aprotime.png";
import loiz from "../assets/projects/loiz.png";
import compass from "../assets/projects/83compass.png";

const Projects = () => {
  return (
    <div
      name="projects"
      className="w-full md:min-h-screen py-40 bg-[#000] text-[#FDE7EF]"
    >
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-primary">
            Projects
          </p>
          <p className="py-6">Check out some of my projects</p>
        </div>

        {/* Client / Company Projects */}
        <p className="text-xl font-semibold mt-10 mb-4">
          Client & Company Projects
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Sigma Transaction Monitoring */}
          {/* <div
            style={{ backgroundImage: `url(${workImg.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          > */}
          {/* hover effects */}
          {/* <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                Sigma Transaction Monitoring
              </span>
              <div className="pt-8 text-center">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Case Study
                  </button>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div> */}
          {/* </div> */}
          {/* Ignite */}
          {/* <div
            style={{ backgroundImage: `url(${realestate.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          > */}
          {/* hover effects */}
          {/* <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">Ignite</span>
              <div className="pt-8 text-center">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div> */}
          {/* </div> */}

          {/* Madesoft Academy */}
          <div
            style={{ backgroundImage: `url(${madesoftacademy.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                Madesoft Academy
              </span>
              <div className="pt-8 text-center">
                <a
                  href="https://madesoftacademy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/*83 Compass */}
          <div
            style={{ backgroundImage: `url(${compass.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                83 Compass
              </span>
              <div className="pt-8 text-center">
                <a
                  href="https://www.83compass.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Fitxn */}
          <div
            style={{ backgroundImage: `url(${fitxn.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">Fitxn</span>
              <div className="pt-8 text-center">
                <a
                  href="https://www.fitxn.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* AMNID */}
          <div
            style={{ backgroundImage: `url(${amnid.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">AMNID</span>
              <div className="pt-8 text-center">
                <a
                  href="https://amnid.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Youverify OS */}
          <div
            style={{ backgroundImage: `url(${youverify.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                Youverify OS
              </span>
              <div className="pt-8 text-center">
                <a
                  href="https://youverify.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Gowa */}
          <div
            style={{ backgroundImage: `url(${gowa.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">Gowa</span>
              <div className="pt-8 text-center">
                <a
                  href="https://gowa-frontend.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* LoizTours */}
          <div
            style={{ backgroundImage: `url(${loiz.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                LoizTours
              </span>
              <div className="pt-8 text-center">
                <a
                  href="https://loiztravels.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Aprotime */}
          <div
            style={{ backgroundImage: `url(${aprotime.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                Aprotime
              </span>
              <div className="pt-8 text-center">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Visit
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Projects */}
        <p className="text-xl font-semibold mt-16 mb-4">Personal Projects</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Meta Bnb */}
          {/* <div
            style={{ backgroundImage: `url(${metabnb.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          > */}
          {/* hover effects */}
          {/* <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                {" "}
                Meta Bnb
              </span>
              <div className="pt-8 text-center">
                <a
                  href="https://thetechgoddess.github.io/meta_bnb/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Open Project
                  </button>
                </a>
                <a
                  href="https://github.com/TheTechGoddess/meta_bnb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Check Code
                  </button>
                </a>
              </div>
            </div> */}
          {/* </div> */}

          {/* Nasa Pictures */}
          {/* <div
            style={{ backgroundImage: `url(${nasa_pictures.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          > */}
          {/* hover effects */}
          {/* <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">
                Nasa Pictures
              </span>
              <div className="pt-8 text-center">
                <a
                  href="https://thetechgoddess.github.io/NASA-API-project/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Open Project
                  </button>
                </a>
                <a
                  href="https://github.com/TheTechGoddess/NASA-API-project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Check Code
                  </button>
                </a>
              </div>
            </div> */}
          {/* </div> */}

          {/* HRX */}
          <div
            style={{ backgroundImage: `url(${hrx.src})` }}
            className="shadow-lg shadow-[#23231f] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effects */}
            <div className="opacity-0 group-hover:opacity-100 text-center">
              <span className="text-2xl font-bold tracking-wider">HRX</span>
              <div className="pt-8 text-center">
                <a
                  href="https://hr-x.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Open Project
                  </button>
                </a>
                <a
                  href="https://github.com/TheTechGoddess/HrX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-black font-bold text-lg">
                    Check Code
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
