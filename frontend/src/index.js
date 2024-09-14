import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import BlogPageDetails from "./pages/BlogPage/BlogPageDetails";
import SingleBlog from "./pages/SingleBlogPage/SingleBlogPage";
import { SidebarProvider } from './context/sidebarContext';
import { BlogsProvider } from './context/blogContext';
import { UserProvider } from './context/usesrContext';
import { CommentProvider } from './context/commentContext';
import { ThemeProvider } from './utils/themeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Redux Stuff
import store from "./redux/store";
import { Provider } from "react-redux";
export { BlogPageDetails, SingleBlog };



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <UserProvider>
      <SidebarProvider>
        <BlogsProvider >
          <CommentProvider>
            <ThemeProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastContainerClassName="toast-container"
                // You can adjust the z-index as needed
                style={{ zIndex: 99999999999 }}
              />

              <App />
            </ThemeProvider>

          </CommentProvider>
        </BlogsProvider>
      </SidebarProvider>
    </UserProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
