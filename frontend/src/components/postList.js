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
        onClick={() => props.deletePost(props.post._id)}
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
      try {
        const response = await fetch("https://localhost:3001/post");

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const posts = await response.json();
        console.log(posts); // Debugging line to see fetched posts
        setPosts(posts);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getPosts();
  }, []);

  // This method is to delete a post
  async function deletePost(id) {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`https://localhost:3001/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      // Filter out the deleted post from the state
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      window.alert(error.message);
    }
  }

  function postList() {
    return posts.map((post) => (
      <Post
        post={post}
        deletePost={deletePost} // Pass deletePost as a prop
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
