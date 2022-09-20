// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";






// export default function Home() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleExitBtn = () => {
//     dispatch(logout())
//     navigate('/')

//   }
//     return (
//       <>
//          <div>Home</div>
//         <button onClick={() => handleExitBtn()}>Logout</button>
//       </>
       
//     )
// }



import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "../components/AddPost";
import { getPosts } from "../redux/slices/postSlice";
import Post from "../components/Post";

export default function Home() {
  const dispatch = useDispatch();
  const { status, posts } = useSelector((state) => state.post);
  const { _id } = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    dispatch(getPosts(_id));
  }, [dispatch]);
  

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        <AddPost />
        <Box textAlign="center" marginTop="1rem">
          {status === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {status === "success" &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </Box>
    </Box>
  );
}
