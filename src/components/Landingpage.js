import React, { useState } from 'react'
import rishiImg from '../images/rishi.jpg'
import logo from '../images/logo.svg'
import { motion } from "framer-motion"


const Landingpage = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    function handleClick() {
      setNavbarOpen(!navbarOpen);
    }
    return (
        <>
<div   data-aos="fade-down" className="relative bg-black overflow-hidden h-screen">
  <div className="max-w-7xl mx-auto">
    <div className="relative z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <svg className="hidden lg:block absolute right-0 inset-y-0 h-screen w-48 text-black transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span className="sr-only">Rishwanth</span>
                <img className="h-8 w-auto sm:h-10" src={logo} />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"  onClick={handleClick} aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        {navbarOpen && (
        <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
        )}
        {!navbarOpen && (
        <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
        )}
    </svg>

                  {/* <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg> */}
                </button>
              </div>
            </div>
          </div>
          <div className={`lg:flex ${  navbarOpen ? "block" : "hidden transition transform origin-top-right " }  md:block md:ml-20 md:pr-4 md:space-x-8`}>
            <a href="#about" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 space-y-1  hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>About</a>

            <a href="#projects" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 space-y-1 hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>Projects</a>

            <a href="#sidehustles" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 space-y-1 hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>SideHustle</a>

            <a href="#contact" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 space-y-1 hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>Contact</a>
          </div>
        </nav>
      </div>

    
      {/* <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div className="rounded-lg shadow-md bg-black ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="px-5 pt-4 flex items-center justify-between">
            <div>
              <img className="h-8 w-auto" src={logo} alt="" />
            </div>
            <div className="-mr-2">
              <button type="button"  onClick={handleClick} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Close main menu</span>
              
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</a>

            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Projects</a>

            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">SideHustle</a>

          </div>
          <a href="#" className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
            Contact
          </a>
        </div>
      </div> */}

      <main className=" px-8 mt-10 mx-auto sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div
   className="sm:text-center lg:text-left w-full">
          <h1 className="hero-title text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-7xl lg:text-9xl">
            <span className="block xl:inline">Code. <span className=" xl:inline text-indigo-400 ">Design. </span> </span>
            <span className="block text-indigo-600 xl:inline ">Science.</span>
          </h1>
          <p className="about-content mt-5 lg:mt-8 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
           I Design and Develop Full Stack Web and Mobile Applications
          </p>
          <div className="mt-5 lg:mt-8 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }} href="#" className="buttonui w-full flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get in Touch
              </motion.button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}  href="#" className="buttonui w-full flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                Know More
              </motion.button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img className="h-58 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={rishiImg} alt="" />
  </div>
</div>
        </>
    )
}

export default Landingpage
