import "./globals.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
