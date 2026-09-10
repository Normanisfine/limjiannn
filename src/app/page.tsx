import Hero from '@/components/sections/Hero';
import SelectedWork from '@/components/sections/SelectedWork';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Research from '@/components/sections/Research';
import Internship from '@/components/sections/Internship';
import Projects from '@/components/sections/Projects';
import Broadway from '@/components/sections/Broadway';
import Contact from '@/components/sections/Contact';
export default function Home() {
 return <><main id="main"><div className="intro-scene"><Hero/><SelectedWork/></div><About/><Education/><Internship/><Research/><Projects/><Broadway/></main><Contact/></>;
}
