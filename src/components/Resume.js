import React from 'react'
import resume from '../images/Resume.pdf'
import {NavLink} from 'react-router-dom'

function Resume() {
    return (
        <div className="relative bg-black overflow-hidden h-screen">
             <object data={resume} type="application/pdf"  width="100%"
      height="700">
              <p>Resume - Click to view<a href={resume}>to the PDF!</a></p>
             </object>

             <NavLink to="/" className="buttonui w-full flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">Go to Back Rishwanth's Portfolio</NavLink>
        </div>
    )
}

export default Resume
