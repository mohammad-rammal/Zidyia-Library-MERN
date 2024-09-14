import React, { useEffect } from 'react';
import "./SingleBlogPage.scss";
import Title from '../../components/Title/Title';
import SingleBlog from "../../components/SingleBlog/SingleBlog";
import { useBlogsContext } from "../../context/blogContext";
import { useParams } from "react-router-dom";
import { banner_image } from '../../utils/images';
import { useUserContext } from '../../context/usesrContext';
import { useCommentContext } from "../../context/commentContext"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/FooterA/Footer';


const SingleBlogPage = () => {

  const { fetchSignleBlog, singleBlog } = useBlogsContext();
  const { fetchSingleUser, singleUser } = useUserContext();
  const { fetchCommentsByPost, commentsByPost } = useCommentContext();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchSignleBlog(id);
    if (singleBlog.userId) fetchSingleUser(singleBlog.userId);
    if (singleBlog.id) fetchCommentsByPost(singleBlog.id);
  }, [singleBlog.userId, singleBlog.id, id]);




  return (
    <div className='main-holder bg-light-blue fs-14 bg-zidyia'>
      <Navbar />
      <Sidebar />
      <header className='header ' style={{
        background: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.2)),url(${banner_image}) center/cover no-repeat`
      }}>
        <div className='container '>
          <div className='header-content text-center flex align-center justify-center flex-column text-white-A700'>
            <Title title="Post Details" color={"rgb(93, 211, 179)"} />
          </div>
        </div>
      </header>

      <section className='section py-7 '>
        <div className='container'>
          <div className='section-content bg-white'>
            <SingleBlog blog={singleBlog} user={singleUser} comments={commentsByPost} />

          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
}

export default SingleBlogPage;