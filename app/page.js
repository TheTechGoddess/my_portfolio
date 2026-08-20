import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import FeedbackSection from "../components/feedback/FeedbackSection";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <FeedbackSection />
    </main>
  );
}
