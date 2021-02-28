import React, {useState, useEffect} from 'react'
import sanityClient from '../client.js'
import { motion } from "framer-motion"


export default function Project(){

    const [projectData, setProjectData] = useState(null)

    useEffect(()=>{
        sanityClient.fetch(`*[_type == "project"]{
            title,
            date,
            place,
            mainImage{
                asset->{
                    _id,
                    url
                }    
            },
            description,
            projectType,
            link,
            tags
        }`).then((data)=> setProjectData(data))
        .catch(console.error);
        
    }, [])

    return (
        <main data-aos="fade-up" id="projects" className="projects bg-black-100 container px-8 bg-black overflow-hidden max-w-6xl mx-auto min-h-full mt-8 sm:mt-8 sm:px-4  md:px-4 sm:mb-10  md:mb-10 md:mt-2 lg:mt-18 xl:mt-20">
            <section className="container mx-auto lg:px-4 md:px-2  ">
                <h1 className="subheadings mt-3 text-5xl text-indigo-500 sm:mt-5 sm:text-2xl md:text-6xl sm:mx-auto md:mt-5">PROJECTS</h1>
                {/* <h2 className="subheadings text-2xl text-white mb-12">
                My Top Projects
                </h2> */}
                <section className="max-w-5xl mt-5 sm:mt-5 md:mt-10 sm:mb-10  md:mb-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8">
                   {projectData && projectData.slice(0,4).map((project, index) => (
                    <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }} href={project.link} className="card-project relative bg-indigo-600 rounded-lg shadow-xl bg-white md:p-16 p-4">
                        <h3 className="text-white text-3xl font-bold mb-2 hover:text-indigo-700">
                            <a href={project.link} alt={project.title} target="_blank" rel="noopener noreferrer" >{project.title}</a>
                        </h3>
                    <div className="text-gray-500 text-xs spaxe-x-4">
                    {/* <img src={project.mainImage.asset.url} alt={project.title} className="w-full object-cover rounded-t"
                    style={{height:"400px"}} /> */}
                        {/* <span  className="font-bold text-white">
                            <strong className="font-bold text-white">Finished on </strong>:{" "}
                            {new Date(project.date).toLocaleDateString()}
                        </span> */}
                        {/* <span>
                        <strong className="font-bold"> Company</strong>:{" "}
                            {project.place}
                        </span> */}
                        <span  className="font-bold text-white">
                            {/* <strong className="font-bold text-white"> Type</strong>:{" "} */}
                            {project.projectType }
                        </span>
                        <p className="my-6 text-lg text-white leading-relaxed">
                            {project.description}
                        </p>
                        <a href={project.link} rel="noopener noreferrer" target="_blank" className="text-red-500 font-bold hover:underline hover:text-red" >
                        View the Project{" "}
                        {/* <span role="img" aria-label="right pointer"> --- </span> */}
                        </a>
                       
                    </div>
                  
                    </motion.a>
                    ))}
                </section>
            </section>
        </main>
    )
}