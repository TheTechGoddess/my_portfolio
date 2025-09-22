"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full  bg-black text-[#FDE7EF] flex justify-center items-center p-4"
    >
      <form
        action="https://getform.io/f/d049b3df-f8b6-4102-84f2-a402bd614d09"
        method="POST"
        className="flex flex-col max-w-[600px] w-full"
      >
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-primary">
            Contact Me
          </p>
          <div className="lg:hidden">
            <ul className="flex justify-between my-8">
              <li className="w-[60px] h-[60px] flex duration-300 bg-blue-600 rounded-3xl">
                <a
                  className="flex justify-between items-center w-full text-[#F8EFF1]"
                  href="https://www.linkedin.com/in/favour-enwonwu-kc/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={30} />
                </a>
              </li>

              <li className="w-[60px] h-[60px] flex duration-300 bg-[#333] rounded-3xl">
                <a
                  className="flex justify-between items-center w-full text-[#F8EFF1]"
                  href="https://github.com/TheTechGoddess"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={30} />
                </a>
              </li>

              <li className="w-[60px] h-[60px] flex duration-300 bg-secondary rounded-3xl">
                <a
                  className="flex justify-between items-center w-full text-[#F8EFF1]"
                  href="mailto:favourenwonwukc@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HiOutlineMail size={30} />
                </a>
              </li>

              <li className="w-[60px] h-[60px] flex duration-300 bg-[#565f65] rounded-3xl">
                <a
                  className="flex justify-between items-center w-full text-[#F8EFF1]"
                  href="https://drive.google.com/file/d/1Nr55bZdWDN0N9i7eC8p8qJg0YwU80QB9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsFillPersonLinesFill size={30} />
                </a>
              </li>
            </ul>
          </div>
          <p className="py-4 ">
            Submit the form below or email{" "}
            <a className="underline" href="mailto:favourenwonwukc@gmail.com">
              favourenwonwukc@gmail.com
            </a>{" "}
            to reach me for roles, collaborations, and gigs.
          </p>
        </div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="p-2 bg-secondary rounded-lg text-black placeholder:text-black"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="my-4 p-2 bg-secondary rounded-lg text-black placeholder:text-black"
        />
        <textarea
          name="message"
          placeholder="Type your message here"
          id="message"
          rows="6"
          className="bg-secondary p-2 rounded-lg text-black placeholder:text-black"
        ></textarea>

        <button className="border-2 bg-secondary hover:bg-secondary hover:text-black px-4 py-3 my-8 mx-auto flex items-center rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
