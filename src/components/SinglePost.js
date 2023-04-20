import React, {useState, useEffect} from 'react'
import sanityClient from '../client.js'
import { useParams } from 'react-router-dom'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import logo from '../images/logo.svg'
import {motion} from 'framer-motion'
import footerlogo from '../images/footerlogo.svg'
import footerrock from '../images/footer-rock.png'
import {NavLink } from 'react-router-dom'


const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
    return builder.image(source)
}

export default function SinglePost(){

    const [singlePost, setSinglePost]= useState(null);
    const { slug }= useParams();
    const [navbarOpen, setNavbarOpen] = useState(false);

  
    function handleClick() {
      setNavbarOpen(!navbarOpen);
    }

    useEffect(()=>{
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image
        }`).then((data)=>setSinglePost(data[0]))
    }, [slug]);

    if(!singlePost) return <div>Loading....</div>

    return (
        <main className="bg-black min-h-screen">
              <div className=" max-w-7xl mx-auto relative pt-6 bg-black px-4 sm:px-6 lg:px-8">
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
            <NavLink to="/#about" href="#" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>About</NavLink>

            <NavLink to="/#projects" href="#" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>Projects</NavLink>

            <NavLink to="/#sidehustles" href="#" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>SideHustle</NavLink>

            <NavLink to="/#contact" href="#" className={`${ navbarOpen? "navlinks block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" :"navlinks font-bold text-xl text-gray-500 hover:text-white"}`}>Contact</NavLink>
          </div>
        </nav>
      </div>
            <article className="container shadow-lg mx-auto bg-white rounded-lg">
                <header className="relative">
                    <div className="absolute h-full w-full flex items-center justify-center p-8">
                        <div className="bg-white bg-opacity-75 rounded p-6">
                            <h1 className="text-3xl lg:text-6xl mb-4">
                            {singlePost.title}
                            </h1>
                            <div className="flex justify-center text-gray-800">
                                <img src={urlFor(singlePost.authorImage).url()} 
                                alt={singlePost.name}
                                className="w-8 h-8 rounded-full"
                                />
                            </div>
                            {/* <p className="cursive flex items-center pl-2 text-2xl">
                                {singlePost.name}

                            </p> */}
                        </div>
                    </div>
                    <img src={singlePost.mainImage.asset.url} alt={singlePost.title} className="w-full object-cover rounded-t"
                    style={{height:"400px"}} />
                </header>
                <div className="px-8 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full"><BlockContent blocks={singlePost.body} projectId="qrbr5g6o" dataset="production" /> </div>
            </article>
            <div>
            <img className="mx-auto h-30 w-auto sm:h-10 mt-10 mb-10" alt="footerlogo "src={footerlogo} />
                <motion.div
    drag
    dragConstraints={{
      top: -50,
      left: -50,
      right: 50,
      bottom: 50,
    }}>
                     <img className="mx-auto w-auto sm:h-20 md:h-28 h-28" alt="footerrock "src={footerrock} />
                </motion.div>
         
         
            
            <h6 className="flex justify-center text-white mt-3 mb-2">&#169; Rishwanth Perumandla 2023</h6>
            </div>
        </main>
    )
}