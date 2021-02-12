import React, {useState, useEffect} from 'react'
import sanityClient from '../client.js'
import { Link } from 'react-router-dom'

export default function Post(){

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

    return (
        <main>
            <section className="container mx-auto">
                <h1 className="text-center">BLOGS</h1>
                <div className="grid md:grid-cols-2 lg:grids-cols-3 gap-8">
                 
                 {postData && postData.map((post, index) =>(
                  <article>
                    <Link to={"/post/" + post.slug.current} key={index}>
                    <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-400" key={index}>
                        <img  src={post.mainImage.asset.url} alt={post.mainImage.alt} className='w-full h-full rounded object-cover absolute' />
                        <span className="block relative h-full flex justify-end items-end pr-4 pb-2">
                            <h3 className="text-gray-800 text-lg font-blof px-3 py-4 bg-red-600 bg-opacity-75">{post.title}</h3>    
                        </span>    
                    </span>
                    </Link>
                    </article>  
                 ))}
                </div>
            </section>
        </main>
    )
}