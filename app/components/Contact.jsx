"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import {
  PUBLIC_EVENT_TYPES,
  trackPortfolioEvent,
} from "../../services/analyticsService";

const tipText = (
  <>
    I hid this because I wasn&apos;t sure you&apos;d care, but I built this little
    corner of the internet myself. <span className="text-primary">🫣✨</span>
    <br />
    It&apos;s powered by{" "}
    <span className="text-secondary font-semibold">Next.js</span>,
    <span className="text-primary font-semibold"> React</span>,
    <span className="text-secondary font-semibold"> Tailwind CSS</span>, and
    <span className="text-primary font-semibold"> Firebase</span>, with a sprinkle
    of <span className="text-secondary font-semibold">JavaScript</span> magic
    behind the scenes.
    <br />
    Basically, yes, I did spend an{" "}
    <span className="text-primary font-semibold">unreasonable amount of time</span>{" "}
    making a website to tell you that I make websites{" "}
    <span className="text-secondary">
      (web apps, dashboards, weird little experiments, the occasional overengineered
      portfolio… you know, the usual)
    </span>
    . <span className="text-secondary">😂</span>
    <br />
    And between the soft pinks, playful blues, and just a little too much sparkle…
    yeah, a <span className="text-primary font-semibold">girl</span> built this.
    Unapologetically. <span className="text-primary">💅✨</span>
  </>
);

const Contact = () => {
  const [isTipOpen, setIsTipOpen] = useState(false);
  const tipRef = useRef(null);

  const trackLinkClick = (eventType, source) => {
    trackPortfolioEvent(eventType, { source });
  };

  useEffect(() => {
    if (!isTipOpen) return undefined;

    const handlePointerDown = (event) => {
      if (tipRef.current && !tipRef.current.contains(event.target)) {
        setIsTipOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isTipOpen]);

  return (
    <div
      name="contact"
      className="w-full md:min-h-screen py-16 md:py-20 bg-black text-[#FDE7EF] flex flex-col justify-center items-center p-4"
    >
      <form
        action="https://getform.io/f/d049b3df-f8b6-4102-84f2-a402bd614d09"
        method="POST"
        onSubmit={() =>
          trackPortfolioEvent(PUBLIC_EVENT_TYPES.CONTACT_CLICK, {
            source: "contact_form_submit",
          })
        }
        className="flex flex-col max-w-[600px] w-full"
      >
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-primary">
            Contact Me
          </p>
          <div className="lg:hidden">
            <ul className="flex flex-wrap justify-center gap-3 my-8">
              <li className="w-[60px] h-[60px] flex duration-300 bg-blue-600 rounded-3xl">
                <a
                  className="flex justify-center items-center w-full text-[#F8EFF1]"
                  href="https://www.linkedin.com/in/favour-enwonwu-kc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onClick={() =>
                    trackLinkClick(
                      PUBLIC_EVENT_TYPES.LINKEDIN_CLICK,
                      "contact_section",
                    )
                  }
                >
                  <FaLinkedin size={30} />
                </a>
              </li>

              <li className="w-[60px] h-[60px] flex duration-300 bg-[#333] rounded-3xl">
                <a
                  className="flex justify-center items-center w-full text-[#F8EFF1]"
                  href="https://github.com/TheTechGoddess"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={() =>
                    trackLinkClick(
                      PUBLIC_EVENT_TYPES.GITHUB_CLICK,
                      "contact_section",
                    )
                  }
                >
                  <FaGithub size={30} />
                </a>
              </li>

              <li className="w-[60px] h-[60px] flex duration-300 bg-secondary rounded-3xl">
                <a
                  className="flex justify-center items-center w-full text-[#F8EFF1]"
                  href="mailto:favourenwonwukc@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <HiOutlineMail size={30} />
                </a>
              </li>

              <li className="w-[72px] h-[60px] flex duration-300 bg-[#565f65] rounded-3xl">
                <a
                  className="flex flex-col justify-center items-center w-full text-[#F8EFF1] text-[10px] leading-tight"
                  href="https://drive.google.com/file/d/1ypeaeDeBkwjWpjmT5oLmHWdF8xT1mdFj/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Frontend resume"
                >
                  <BsFillPersonLinesFill size={22} />
                  <span>FE CV</span>
                </a>
              </li>

              <li className="w-[72px] h-[60px] flex duration-300 bg-[#3d4449] rounded-3xl">
                <a
                  className="flex flex-col justify-center items-center w-full text-[#F8EFF1] text-[10px] leading-tight"
                  href="https://drive.google.com/file/d/1Tb4cF31q1BAGRYu_X2txkVlVYavSjIGP/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Backend resume"
                >
                  <BsFillPersonLinesFill size={22} />
                  <span>BE CV</span>
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

        <button
          type="submit"
          className="border-2 bg-secondary hover:bg-secondary hover:text-black px-4 py-3 my-8 mx-auto flex items-center rounded-lg"
        >
          Submit
        </button>
      </form>

      <div className="max-w-[600px] w-full" ref={tipRef}>
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="More about this portfolio"
            aria-expanded={isTipOpen}
            aria-controls="contact-tip-panel"
            onClick={() => setIsTipOpen((prev) => !prev)}
            className="w-11 h-11 rounded-full border-2 border-primary text-[#FDE7EF] bg-gradient-to-br from-primary to-secondary active:scale-95 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(252,69,138,0.75)] font-bold"
          >
            i
          </button>
        </div>

        {isTipOpen ? (
          <div
            id="contact-tip-panel"
            role="note"
            className="mt-3 w-full rounded-xl border-2 border-primary/50 bg-gradient-to-br from-[#14111a] via-[#0b0b0b] to-[#0d1625] text-accent p-4 sm:p-5 text-sm leading-relaxed shadow-[0_0_28px_rgba(69,153,252,0.25)]"
          >
            {tipText}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Contact;
