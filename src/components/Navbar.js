import React from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon }from 'react-social-icons' 

export default function Navbar(){
    return (
        <header className="bg-blue-200">
            <div className="container mx-auto flex justify-between">
                <nav className="flex">
                    <NavLink to="/" exact activeClassName="text-white" className="inline-flex py-3 px-3 mr-4">
                    Rishi
                    </NavLink>
                    <NavLink to="/about" activeClassName="text-white" className="inline-flex py-3 px-3 mr-4">
                        About
                    </NavLink>
                    <NavLink to="/Project" activeClassName="text-white" className="inline-flex py-3 px-3 mr-4">
                        Project
                    </NavLink>
                    <NavLink to="/post" activeClassName="text-white" className="inline-flex py-3 px-3 mr-4">
                        Blogs
                    </NavLink>
                  
                </nav>
                <div className="inline-flex py-3 px-3">
                    <SocialIcon url="https://www.twitter.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
                    <SocialIcon url="https://www.instagram.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
                    <SocialIcon url="https://www.linkedin.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
                    <SocialIcon url="https://www.youtube.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:35, width:35}}/>
                </div>
            </div>
        </header>
    )
}