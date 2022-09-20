import { Search } from "@mui/icons-material";
import { Input, Typography, Grid, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import WhoToFollow from "./WhoToFollow";
import { Link } from "react-router-dom";
// import { getFollowings } from "../redux/followSlice";

export default function RightSidebar() {
//   const [query, setQuery] = React.useState("");
  const { _id } = JSON.parse(localStorage.getItem("login"));
  
  return (
    <Box sx={{ height: "100%" }}>
      <Box paddingTop="10px">
        <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          position="relative"
          sx={{
            background: "#eee",
          }}
        >
          <Input
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            type="text"
            inputProps={{
              style: { padding: "10px" },
            }}
            disableUnderline
            fullWidth
            placeholder="Search"
            startAdornment={
              <Search
                sx={{
                  paddingLeft: "20px",
                  color: "#777",
                }}
              />
            }
          />
          
        </Box>
        <Box
          sx={{
            background: "#eee",
            borderRadius: "28px",
            padding: "10px 20px",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            People you may know
          </Typography>
          <Box textAlign="center" marginTop="1rem">
            
          </Box>
          
        </Box>
      </Box>
    </Box>
  );
}
