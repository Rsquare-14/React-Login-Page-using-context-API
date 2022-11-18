import React, { useCallback, useContext, useRef, useState } from 'react';
import { AuthContext } from '../authentication/Auth-context';
import { UseBlogSearch } from "./UseBlogSearch"
import "./HomePage.css"

const HomePage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const {
        blogs,
        loading,
        hasMore,
        error
    } = UseBlogSearch(pageNumber);

    const { logout } = useContext(AuthContext);

    const observer = useRef();
    const lastBlogElementRef = useCallback((node) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber+1)
            }
        })
        if(node) observer.current.observe(node);
    },[loading, hasMore]);


    const onLogout = (e) => {
        e.preventDefault();
        logout();
    }

    window.onscroll = () => { 
        let homePageNavbar = document.getElementById("homePage-navbar");
        let positionofNavbar = homePageNavbar.offsetTop;
        if(window.pageYOffset >= positionofNavbar){
            homePageNavbar.classList.add("sticky");
        }else{
            homePageNavbar.classList.remove("sticky");
        }
    }

    return (
        <div className="row">
            <div id="homePage-navbar" className='homePage-bar'>
            <div className="welcome-msg">
                <span>Hello Admin, welcome to DataBeat News</span>
            </div>
            <div className="logout" onClick={e => onLogout(e)}>
                <button>Logout</button>
            </div>
            </div>
            {blogs.map((blog, index) => {
                if (blogs.length === index + 1) {
                    return (
                        <div ref={lastBlogElementRef} key={index} className="blog">
                            <img src={blog.urlToImage} alt="ElonMusk" className='blog-image'></img>
                            <div className='blog-data'>
                                <span className='blog-title'>{blog.title}</span>
                                <span className='blog-author'>Author : {blog.author}</span>
                                <span className='blog-description'>Description : {blog.description}</span>
                                <span className='blog-content'>{blog.content}</span>
                            </div>
                        </div>
                    )
                }else{
                    return (
                        <div key={index} className="blog">
                            <img src={blog.urlToImage} alt="ElonMusk" className='blog-image'></img>
                            <div className='blog-data'>
                                <span className='blog-title'>{blog.title}</span>
                                <span className='blog-author'><b>Author : </b>{blog.author}</span>
                                <span className='blog-description'><b>Description : </b>{blog.description}</span>
                                <span className='blog-content'>{blog.content}</span>
                            </div>
                        </div>
                    )
                }
            })}
            <div> {loading && "Loading..."} </div>
            <div> {error && "Error..."} </div>
        </div>
    );
}

export default HomePage;