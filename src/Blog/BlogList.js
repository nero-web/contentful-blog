// import React, { useEffect, useState } from 'react'
// import { createClient } from "contentful"
// import { Link } from 'react-router-dom'


// const BlogList = () => {
//   const [blogPosts, setBlogPosts] = useState([])
//   const client = createClient({ space: 'e9dwau7vjbs6', accessToken: 'nyFSVFSq-tfSwF3_r_mhkFEjQUfbxDDVNg-4ITIEJqE' })


//   useEffect(() => {
//     const getAllEntries = async () => {
//       try {
//         await client.getEntries().then((entries) => {
//           setBlogPosts(entries)
//         })
//       } catch (error) {
//         console.log(`Error fetching authors ${error}`);
//       }
//     };
//     getAllEntries()
//   }, [client])



//   return (
//     <div id="layout" className="pure-g">
//       <div className="content pure-u-1 pure-u-md-3-4">
//         <div>
//           <div className="posts">
//             <h1 className="content-subhead">Web Dev Blog</h1>

//             {blogPosts?.items?.map((post) => (
//               <section className="post" key={post.sys.id}>
//                 <header className="post-header">
//                   <img src={post.fields.blogImage.fields.file.url} title="" alt={post.fields.title} width="578" height="291" />
//                   <h2 className="post-title pt-3">{post.fields.title}</h2>
//                   <p className="post-meta">
//                     By <a href="https://thecodeangle.com/" className="post-author">{post.fields.blogAuthor}</a> Date <span></span>
//                     <small>
//                       {new Intl.DateTimeFormat('en-GB', {
//                         month: 'long',
//                         day: '2-digit',
//                         year: 'numeric',
//                       }).format(new Date(post.fields.createDate))}
//                     </small>
//                   </p>
//                 </header>
//                 <div className="post-description">
//                   <p>{post.fields.blogSummary}
//                   </p>
//                   <Link
//                     to={`/blogDetails/${post.sys.id}`}
//                     className="button button1">
//                     Read More
//                   </Link>
//                 </div>
//               </section>
//             ))}
//           </div>


//           <div className="footer">
//             <div className="pure-menu pure-menu-horizontal">
//               <div className="pure-menu-item">
//                 <a href="http://twitter.com/thecodeangle" className="pure-menu-link">Twitter</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BlogList

import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const client = createClient({ space: 'e9dwau7vjbs6', accessToken: 'nyFSVFSq-tfSwF3_r_mhkFEjQUfbxDDVNg-4ITIEJqE' });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const response = await client.getEntries({ content_type: 'blog' });
        setBlogPosts(response.items);
      } catch (error) {
        console.log(`Error fetching blog posts: ${error.message}`);
      }
    };

    getAllEntries();
  }, [client]);

  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <div>
          <div className="posts">
            <h1 className="content-subhead">Web Dev Blog</h1>

            {blogPosts.map((post) => (
              <section className="post" key={post.sys.id}>
                <header className="post-header">
                  <img src={post.fields.blogImage.fields.file.url} title="" alt={post.fields.blogTitle} width="578" height="291" />
                  <h2 className="post-title pt-3">{post.fields.blogTitle}</h2>
                  <p className="post-meta">
                    By <a href="https://thecodeangle.com/" className="post-author">{post.fields.blogAuthor}</a> Date <span></span>
                    <small>
                      {new Intl.DateTimeFormat('en-GB', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                      }).format(new Date(post.fields.createdDate))}
                    </small>
                  </p>
                </header>
                <div className="post-description">
                  <p>{post.fields.blogSummary}</p>
                  <Link to={`/blogDetails/${post.sys.id}`} className="button button1">
                    Read More
                  </Link>
                </div>
              </section>
            ))}
          </div>

          <div className="footer">
            <div className="pure-menu pure-menu-horizontal">
              <div className="pure-menu-item">
                <a href="http://twitter.com/thecodeangle" className="pure-menu-link">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
