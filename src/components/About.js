import React from 'react'

export default function About(){
    return (
        <div data-aos="fade-up" id="about" className="about bg-black-100 container px-8 bg-black overflow-hidden max-w-6xl mx-auto min-h-full mt-8 sm:mt-8 sm:px-1 md:px-4 md:mt-2 lg:mt-18 xl:mt-20">
            <div className="mt-6 mx-auto lg:px-4 md:px-2 sm:mt-8 md:mt-2 lg:mt-16 xl:mt-18">
                <h1 className="subheadings mt-3 text-4xl text-indigo-500 sm:mt-5 sm:text-5xl md:text-6xl sm:mx-auto md:mt-5">WHO AM I?</h1>
                <div className="about-content mt-10 sm:mt-10 md:mt-12">
                <p className="mt-3 text-gray-500 sm:mt-5 md:mt-5 sm:text-2xl md:text-4xl ">
                  I’m Rishwanth Perumandla, a Product Designer based in Bangalore, India.   
                    As a Product Designer, I’ve designed multiple web & mobile experiences for small and medium-sized companies. I previously worked for one of India’s largest Ed-Tech startups, Unacademy.

                 </p>
                  <p className="mt-3 text-gray-500 sm:mt-5 md:mt-5 sm:text-2xl md:text-4xl ">

                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                     <p className="mt-3 text-gray-500 sm:mt-5  md:mt-5 sm:text-2xl md:text-4xl ">
                     It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. 
                        </p>
                </div>
               
            </div>
        </div>
    )
}