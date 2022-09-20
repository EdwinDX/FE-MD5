import axios from 'axios';

const REACT_APP_API_URL = "http://localhost:4000";


export const addPost = async (postData) => {
  try {
    const { data } = await axios.post(`${REACT_APP_API_URL}/posts`, postData);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(`${REACT_APP_API_URL}/posts/`+id);
    return data;
  } catch (error) {
    console.log('Delete', error);
  }
};

export const addComment = async (commentData) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_API_URL}/comments`,
      commentData
    );
    return data;
  } catch (error) {
    console.log('addComment', error);
  }
};



export const followAccount = async (follow) => {
    try {
      const { data } = await axios.post("/api/followers", follow);
      return data;
    } catch (error) {
      console.log('Follower', error);
    }
  };
  
  export const followingAccount = async (follow) => {
    try {
      const { data } = await axios.post("/api/followings", follow);
      return data;
    } catch (error) {
      console.log('followings', error);
    }
  };
  
  export const unfollowAccount = async (follow) => {
    try {
      const { data } = await axios.delete(
        "/api/followers/" + follow.id + "?userId=" + follow.userId
      );
      return data;
    } catch (error) {
      console.log('unfollow', error);
    }
  };
  
  export const unfollowingAccount = async (follow) => {
    try {
      const { data } = await axios.delete(
        "/api/followings?followingId=" + follow.id + "&userId=" + follow.userId
      );
      return data;
    } catch (error) {
      console.log('unfollowAccount', error);
    }
  };

  
  
  export const likeOrDislikePost = async (postData) => {
    try {
      const { data } = await axios.post("/api/posts/likes", postData);
      return data;
    } catch (error) {
      console.log('likeOrDislike', error);
    }
  };
  
