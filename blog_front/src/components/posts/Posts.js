import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { API_BASE_URL } from "../../config";
import AddPost from "./AddPost";
import PostItem from "./PostItem";

export default function Posts(props) {
  //  initialize attributs
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  // Add post
  const savePost = (content) => {
    const formData = new FormData();
    formData.append("content", content);
    axios
      .post(API_BASE_URL + "/api/posts", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
      .then((res) => {
        //Succuess
        //Update posts list
        setPosts([res.data.data, ...posts]);
      })
      .catch((error) => {
        console.log(" errors : ", error); // if error return error message
      });
  };
  //Edit post
  const editPost = (id, content) => {
    //get post index
    let index = posts.findIndex((obj) => obj.id === id);
    const formData = new FormData();
    formData.append("body", content);
   
    axios
      .post(`${API_BASE_URL}/api/posts/update/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
      .then((res) => {
        //success
        console.log(res);
        // Update posts list
        const newPosts = [...posts];
        newPosts.splice(index, 1);
        setPosts(newPosts);
        setPosts([res.data.data, ...posts]);
      })
      .catch((error) => {
        console.log(" errors : ", error); // if error return error message
      });
  };
  //Delete post
  const deletePost = (id) => {
    //get post index
    let index = posts.findIndex((obj) => obj.id === id);
    //Delete post api
    axios
      .delete(`${API_BASE_URL}/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
      .then((res) => {
       
        // Update posts list
        const newPosts = [...posts];
        newPosts.splice(index, 1);
        setPosts(newPosts);
      })
      .catch((err) => console.log(err));
  };
  //Add Comment
  const saveComment = (comment, id) => {
    let index = posts.findIndex((obj) => obj.id === id);
    setComments(posts[index].comments);
   
    //getComment index
    const formData = new FormData();
    console.log(comment);
    console.log(id);
    formData.append("comment", comment);
    formData.append("user_id", localStorage.getItem("id"));
    formData.append("post_id", id);
    axios
      .post(`${API_BASE_URL}/api/comments/`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
      .then((res) => {
        //Succuess
        const newComments = [...posts[index].comments];
        //update comment list
        newComments.push(res.data.data);
        posts[index].comments = newComments;
        setComments(newComments);
   
      })
      .catch((error) => {
        console.log(" errors : ", error); // if error return error message
      });
  };
  const deleteComment = (id, idPost) => {
    console.log("id comment : ", id, " id Post : ", idPost);
    //get post index
    let index = posts.findIndex((obj) => obj.id === idPost);
    //getComment index
    let indexComment = posts[index].comments.findIndex((obj) => obj.id === id);
    //Delete post api
    axios
      .delete(`${API_BASE_URL}/api/comments/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setComments(posts[index].comments);
        const newComments = [...posts[index].comments];
        newComments.splice(indexComment, 1);
        posts[index].comments = newComments;
        //update comments list
        setComments(newComments);
      })
      .catch((err) => console.log(err));
  };
  // get all posts on mount
  useEffect(() => {  
    axios(`${API_BASE_URL}/api/posts`)
      .then((res) => res.data)
      .then(
        (result) => {
          setIsLoaded(true);
          setPosts(result.data.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return (
      <div className="container">
        <Row>
          <Col md="12" className="mt-4">
            <div>Erreur : {error.message}</div>
          </Col>
        </Row>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="container">
        <Row>
          <Col md="12" className="mt-4">
            <div>Chargement</div>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Row>
          <Col md="12" className="mt-4">
            <AddPost submit={savePost} />
            <div className="mt-4"></div>
            {posts.map((post, index) => {
              return (
                <div key={index}>
                  <PostItem
                    id={post.id}
                    userId={post.user_id}
                    createdBy={post.user.name}
                    content={post.content}
                    date={post.updated_at}
                    comments={post.comments}
                    authorComment={post.comments.comment}
                    editPost={editPost}
                    deletePost={deletePost}
                    saveComment={saveComment}
                    deleteComment={deleteComment}
                  />
                </div>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  }
}
