import { useDispatch } from "react-redux";
import { Button, Grid, Input } from "@mui/material";

import React, { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { getPosts } from "../redux/slices/postSlice";
import { addPost } from "../api";
import {storage} from '../firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'


export default function AddPost() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [postText, setPostText] = useState("");
  const [url, setUrl] = useState(null)
  const [image, setImage] = useState(null);
  const { _id } = JSON.parse(localStorage.getItem("login"));
  const handleAddPost = async () => {
    await handlePostImage()
    const data = await addPost({ text: postText, image: url });
    if (data) {
      dispatch(getPosts(_id));
      setPostText("");
    }
  };
  const handlePostImage = () => {
    const imageRef = ref(storage,"image");
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setUrl(url)
      }).catch((error) => {
        console.log(error.message, 'error getting image url');
      })
      setImage(null)
    })
    .catch((error) => {
      console.log(error.message);
    })
  }
  const handleImageChange = (e) => {
    if (e.target.file[0]) {
      setImage(e.target.file[0])
    }
  }
  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src="/logo192.png" alt="lgogo" width="50px" />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="What's happening?"
              sx={{ width: "100%" }}
            />
            <input type="file" onChange={handleImageChange}/>
          </Box>
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <Button
              onClick={handleAddPost}
              disabled={postText.trimStart().length === 0}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
              }}
            >
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );




}