import React, { useEffect, useState } from "react";
import "../App.css";

const Post = (props) => (
  <tr>
    <td>{props.post.user}</td>
    <td>{props.post.content}</td>
    <td>
      {props.post.image && (
        <img
          src={`data:image/jpeg;base64,${props.post.image}`}
          alt="Post Image"
          style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover" }}
        />
      )}
    </td>
    <td>
      <button
        className="btn btn-link"
        onClick={() => {
          props.deletePost(props.post._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("https://localhost:3001/post");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const posts = await response.json();
      console.log(posts); // Debugging line to see fetched posts
      setPosts(posts);
    }

    getPosts();
  }, []);

  function postList() {
    return posts.map((post) => (
      <Post
        post={post}
        deletePost={() => deletePost(post._id)}
        key={post._id}
      />
    ));
  }

  return (
    <div className="container">
      <h3 className="header">APDS Notice Board</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Caption</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{postList()}</tbody>
      </table>
    </div>
  );
}
