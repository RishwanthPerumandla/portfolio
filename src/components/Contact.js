import React from 'react'
import footerlogo from '../images/footerlogo.svg'
import footerrock from '../images/footer-rock.png'
import { SocialIcon }from 'react-social-icons' 


export default function Contact(){
    return(
        <main className="bg-black-100 container px-8 bg-black overflow-hidden max-w-6xl mx-auto min-h-full mt-10 sm:mt-8 sm:px-6 md:mt-2 lg:mt-18 xl:mt-20">
        <section className="container mx-auto lg:px-4 md:px-2">
            <h1 className="mt-3 text-5xl text-gray-500 sm:mt-5 sm:text-5xl md:text-6xl sm:mx-auto md:mt-5 mb-5  ">CONTACT</h1>
            <h4 className="mt-15 text-2xl text-gray-500 sm:mt-5 sm:text-xl md:text-3xl sm:mx-auto md:mt-5">
            Wanna Work with Me or just say Hi!  Send me a Message 
            </h4>
            <div className="rounded-md shadow mt-10 mb-10">
              <a href="mailto:rishwanth.perumandla@hotmail.com" className="w-full flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
               Let's get in Touch
              </a>
            </div>
            <h1 className="text-2xl text-indigo-500 flex justify-center mt-15 sm:mt-20 sm:text-xl md:text-3xl sm:mx-auto md:mt-12">
              Reach out to me through Social Media
            </h1>
            <div className="flex justify-center py-4 px-5 mt-10" >
                    <SocialIcon url="https://www.linkedin.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:50, width:50}}/>
                    <SocialIcon url="https://www.twitter.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:50, width:50}}/>
                    <SocialIcon url="https://www.instagram.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:50, width:50}}/>
                    <SocialIcon url="https://www.youtube.com" className="mr-4" fgColor="#fff" target="_blank" style={{height:50, width:50}}/>
                </div>

                <img className="mx-auto h-30 w-auto sm:h-10 mt-10 mb-10" alt="footerlogo "src={footerlogo} />
            <img className="mx-auto w-auto sm:h-20 md:h-28 h-28" alt="footerrock "src={footerrock} />
         
            
            <h6 className="flex justify-center text-white mt-3 mb-2">&#169; Rishwanth Perumandla 2021</h6>
        </section>
    </main>
    )
}