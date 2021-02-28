import React, {useState, useEffect} from 'react'
import sanityClient from '../client.js'
import { Link } from 'react-router-dom'


export default function SideHustle(){
    const [postData, setPost] = useState(null)
   
    useEffect(()=>{
        sanityClient.fetch(`*[_type == "post"]{
            title,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`).then((data)=> setPost(data))
        .catch(console.error);
        
    }, [])

    return(
               <main className="bg-black-100 container px-8 bg-black overflow-hidden max-w-6xl mx-auto min-h-full mt-8 sm:mt-8 sm:px-4  md:px-4  md:mt-2 lg:mt-18 xl:mt-20">
            <section className="container mx-auto lg:px-4 md:px-2">
                <h1 className="mt-3 text-4xl text-indigo-500 sm:mt-5 sm:text-4xl md:text-6xl sm:mx-auto md:mt-5">SIDEHUSTLE</h1>
              
                <section className="p-1 mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                   {postData && postData.slice(0,3).map((post, index) => (
                        <Link to={"/post/" + post.slug.current} key={index}>
                        <div class="rounded overflow-hidden shadow-lg">
                        <img class="w-full h-60" src={post.mainImage.asset.url} alt={post.mainImage.alt}  />
                        <div class="px-6 py-4">
                          <div class="font-bold md:text-base lg:text-xl  mb-2 text-white">{post.title}</div>
                          {/* <p class="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                          </p> */}
                        </div>
                        
                      </div>
                    <div className="rounded-md shadow">
                         <a href="#" className="w-full flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-4">
                           View
                         </a>
                       </div>
                      </Link>
                    
                   ))}
                </section>
            </section>
        </main>
    )
}   