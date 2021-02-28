import React ,{ useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon }from 'react-social-icons' 
import logo from '../images/logo.svg'

export default function Navbar(){


    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
  //       <header>
  //          <div class="relative bg-black py-3">
  // <div class="max-w-7xl mx-auto px-4 sm:px-6">
  //   <div class="flex justify-between items-center  py-3 md:justify-start md:space-x-10">
  //     <div class="flex justify-start lg:w-0 lg:flex-1">
  //       <NavLink to='/' exact>
  //         <span class="sr-only">Rishwanth</span>
  //         <img class="h-8 w-auto sm:h-10" src={logo} alt="Rishwanth" />
  //       </NavLink>
  //     </div>
  //     <div class="-mr-2 -my-2 md:hidden">
  //       <button type="button" class="bg-white rounded-md p-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"    onClick={() => setNavbarOpen(!navbarOpen)}>
  //         <span class="sr-only">Open menu</span>
       
  //         <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
  //           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  //         </svg>
  //       </button>
  //     </div>
  //     <nav class={" lg:flex flex-grow items-center"+
  //             (navbarOpen ? " flex" : " hidden")}   id="example-navbar-danger">
  //       <ul className="flex flex-col lg:flex-row md:flex-row list-none lg:ml-auto  space-x-8">
  //             <li className="nav-item">
  //             <a href="#about"  class="text-base font-medium text-white hover:text-white">
  //         About
  //       </a>
  //             </li>
  //             <li className="nav-item">  <a href="#about" class="text-base font-medium text-white hover:text-white">
  //         Projects
  //       </a></li>
  //             <li className="nav-item">   <a  href="#about" class="text-base font-medium text-white hover:text-white">
  //         Sidehustle
  //       </a></li>
  //             <li className="nav-item"> <a href="#about" class="text-base font-medium text-white hover:text-white">
  //       Contact
  //       </a></li>
             
  //       </ul>
  //     </nav>
  //     <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
  //     <div className="inline-flex py-2 px-3">
  //                   <SocialIcon url="https://www.twitter.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
  //                   <SocialIcon url="https://www.instagram.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
  //                   <SocialIcon url="https://www.linkedin.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
  //                   <SocialIcon url="https://www.youtube.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
  //               </div>
  //     </div>
  //   </div>
  // </div>

 
  //       </div>
  //       </header>
  <header>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span className="sr-only">Rishwanth</span>
                <img className="h-8 w-auto sm:h-10" src={logo} />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
               
                  {/* <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg> */}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-20 md:pr-4 md:space-x-8">
            <a href="#" className="font-bold text-xl text-gray-500 hover:text-white">About</a>

            <a href="#" className="font-bold text-xl text-gray-500 hover:text-white">Projects</a>

            <a href="#" className="font-bold text-xl text-gray-500 hover:text-white">SideHustle</a>

            <a href="#" className=" font-bold text-xl text-indigo-600 hover:text-indigo-500">Contact</a>
          </div>
        </nav>
      </div>

    
      <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div className="rounded-lg shadow-md bg-black ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="px-5 pt-4 flex items-center justify-between">
            <div>
              <img className="h-8 w-auto" src={logo} alt="" />
            </div>
            <div className="-mr-2">
              <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Close main menu</span>
              
                {/* <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg> */}
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
      </div>
  </header>
    )
}