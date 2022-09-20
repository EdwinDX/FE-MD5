import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  posts: [],
  postsProfile: [],
  postDetails: {
    userId: {
      avatar: ''
    }
  },
  commentStatus: "idle",
  comments: [],
};

const REACT_APP_API_URL = "http://localhost:4000";


export const getPosts = createAsyncThunk("post/getPosts", async (id) => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/posts/`);
  return data;
});

export const getPostsByUserId = createAsyncThunk("post/getPosts", async (id) => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/posts/` +id);
  return data;
});



export const getPostDetails = createAsyncThunk(
  "post/getPostDetails",
  async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_URL}/posts/postDetail/` + id);
    return data;
  }
);

export const getComments = createAsyncThunk("post/getComments", async (id) => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/comments/` + id);
  return data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateLike: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );
      state.posts[index].isLiked = !state.posts[index].isLiked;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
        state.status = "success";
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPostsByUserId.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPostsByUserId.fulfilled]: (state, action) => {
        state.status = "success";
      state.posts = action.payload;
    },
    [getPostsByUserId.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPostDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPostDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.postDetails = action.payload;
    },
    [getPostDetails.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getComments.pending]: (state, action) => {
      state.commentStatus = "loading";
    },
    [getComments.fulfilled]: (state, action) => {
      state.commentStatus = "success";
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.commentStatus = "failed";
    },
  },
});

export default postSlice.reducer;
export const { updateLike } = postSlice.actions;
