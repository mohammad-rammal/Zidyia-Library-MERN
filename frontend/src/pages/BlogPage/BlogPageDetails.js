import React, { useEffect, useState } from 'react';
import "./BlogPage.scss";
import { banner_image, search_icon } from '../../utils/images';
import Title from "../../components/Title/Title";
import BlogList from "../../components/BlogList/BlogList";
import { useBlogsContext } from '../../context/blogContext';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/FooterA/Footer';
import Header from '../../components/header/Header';


const BlogPageDetails = () => {

  const { blogs, setSearchTerm, searchTerm, fetchBlogsFromSearch } = useBlogsContext();

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchTerm = (e) => {

    e.preventDefault();

    if ((e.target.value.replace(/[^\w\s]/gi, "")).length !== 0) {
      setSearchTerm(e.target.value);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid search..");
    }
  }

  const handleSearchResult = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    fetchBlogsFromSearch(searchTerm);
  }


  return (

    <div className='main-holder bg-ligh-blue fs-14 ' >

      <Sidebar />
      <h1 className='text-uppercase header-title font-core-rhino-35-light fs-26 bg-zidyia pt-8 pb-5 ps-4'>Featured Blog</h1>
      <header className='header' style={{
        background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)),
    url(${banner_image}) center/cover no-repeat`
      }}>
        <div className='container'>
          <div className='header-content text-center flex align-center justify-center flex-column text-white-A700'>

            <div className='container'>
              <div className='header-content text-center flex align-center justify-center flex-column text-white-A700'>

                <form className='flex align-center justify-center ' onSubmit={handleSearchResult}>
                  <div className='header-input-group border flex align-stretch'>

                    <input type='text' className='form-control fs-20' placeholder="Search for your favorite.." onChange={handleSearchTerm} />

                    <span className='form-text font-core-rhino-35-light fs-14 fw-4'>{errorMsg}</span>
                    <button type="submit" className='form-btn bg-zidyia flex align-center justify-center'>
                      <img src={search_icon} alt="" />
                    </button>
                  </div>
                </form>


              </div>
            </div>
          </div>
        </div>

      </header>

      <section className='section py-7'>
        <div className='container'>
          <div className='section-content' >
            <Title title="Recent Blogs" color={"#5DD3B3"} />
            <BlogList blogs={blogs} />
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
}

export default BlogPageDetails