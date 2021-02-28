import React, {useState, useEffect} from 'react'
import sanityClient from '../client.js'


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
        <main className="bg-black-100 container px-8 bg-black overflow-hidden max-w-6xl mx-auto min-h-full mt-8 sm:mt-8 sm:px-4  md:px-4  md:mt-2 lg:mt-18 xl:mt-20">
            <section className="container mx-auto lg:px-4 md:px-2  ">
                <h1 className="mt-3 text-4xl text-indigo-500 sm:mt-5 sm:text-2xl md:text-6xl sm:mx-auto md:mt-5">WORK I'M PROUD OF</h1>
                <h2 className="text-lg text-white mb-12">
                Top Projects
                </h2>
                <section className="max-w-5xl mt-5 sm:mt-5 md:mt-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
                   {projectData && projectData.slice(0,4).map((project, index) => (
                    <article className="relative rounded-lg shadow-xl bg-white md:p-16 p-4">
                        <h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
                            <a href={project.link} alt={project.title} target="_blank" rel="noopener noreferrer" >{project.title}</a>
                        </h3>
                    <div className="text-gray-500 text-xs spaxe-x-4">
                    {/* <img src={project.mainImage.asset.url} alt={project.title} className="w-full object-cover rounded-t"
                    style={{height:"400px"}} /> */}
                        <span>
                            <strong className="font-bold">Finished on </strong>:{" "}
                            {new Date(project.date).toLocaleDateString()}
                        </span>
                        {/* <span>
                        <strong className="font-bold"> Company</strong>:{" "}
                            {project.place}
                        </span> */}
                        <span>
                            <strong className="font-bold"> Type</strong>:{" "}
                            {project.projectType }
                        </span>
                        <p className="my-6 text-lg text-gray-700 leading-relaxed">
                            {project.description}
                        </p>
                        <a href={project.link} rel="noopener noreferrer" target="_blank" className="text-red-500 font-bold hover:underline hover:text-red" >
                        View the Project{" "}
                        {/* <span role="img" aria-label="right pointer"> --- </span> */}
                        </a>
                       
                    </div>
                    </article>
                    ))}
                </section>
            </section>
        </main>
    )
}