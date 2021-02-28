import React ,{useEffect}from 'react'
import About from './About'
import Project from "./Project";
import Contact from "./Contact";
import SideHustle from './SideHustle'
import Landingpage from './Landingpage';
import AOS from 'aos';
import 'aos/dist/aos.css'


export default function Home(){

     useEffect(() => {
       AOS.init({duration: 2000})
     }, [])
    return (
      <>
        <Landingpage/>
        <About  />
        <Project />
        <SideHustle />
        <Contact />
      </>

      
      
       
    )
}