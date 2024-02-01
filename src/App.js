import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  //create a useEffect about fetching the data
  useEffect(() => {
    fetchUserData();
    fetchPostData();
    fetchCommentData();
  }, []);
  //fetching users data
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  //fetching post data
  const fetchPostData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const postData = await response.json();
      setPosts(postData);
      //and here i made a function where we set the number of how many posts for user do we want
      //but since task was taking all the post of all users im going to comment that function
      // const limitedPosts = {};
      // postData.forEach(post => {
      //   if (!limitedPosts[post.userId] || limitedPosts[post.userId].length < 10) {
      //     if (!limitedPosts[post.userId]) {
      //       limitedPosts[post.userId] = [];
      //     }
      //     limitedPosts[post.userId].push(post);
      //   }
      // });
      // setPosts(Object.values(limitedPosts).flat());
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };
  //fetching comment data
  const fetchCommentData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const commentData = await response.json();
      // grouping the comments by post id
      const groupedComments = {};
      commentData.forEach(comment => {
        const postId = comment.postId;
        if (!groupedComments[postId]) {
          groupedComments[postId] = [];
        }
        groupedComments[postId].push(comment);
      });
      setComments(groupedComments);
    } catch (error) {
      console.error('Error fetching comment data:', error);
    }
  };
  //posting the data we fetched visualising them to the users too see
  return (
    <div className="App">
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>

      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <ul>
              {comments[post.id] && comments[post.id].map((comment, index) => (
                <li key={index}>{comment.body}</li>
              ))}
            </ul>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
