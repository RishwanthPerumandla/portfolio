import React, {useState, useEffect} from 'react'
import sanityClient from '../client.js'
import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'

export default function Post(){

    const [postData, setPost] = useState(null)
    const [navbarOpen, setNavbarOpen] = useState(false);

  
    function handleClick() {
      setNavbarOpen(!navbarOpen);
    }
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
            <a href="#" className={`${ navbarOpen? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"font-bold text-xl text-gray-500 hover:text-white"}`}>About</a>

            <a href="#" className={`${ navbarOpen? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"font-bold text-xl text-gray-500 hover:text-white"}`}>Projects</a>

            <a href="#" className={`${ navbarOpen? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"font-bold text-xl text-gray-500 hover:text-white"}`}>SideHustle</a>

            <a href="#" className={`${ navbarOpen? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"font-bold text-xl text-gray-500 hover:text-white"}`}>Contact</a>
          </div>
        </nav>
      </div>
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