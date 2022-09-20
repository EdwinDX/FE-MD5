import { TextField, Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };
  const handleOnChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(loginData);
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          onChange={(e) => handleOnChange(e)}
          sx={{
            width: "100%",
            margin: "1rem 0",
            bgcolor: "#fff",
          }}
          variant="outlined"
          label="Enter Username"
          type="text"
          required
          name="username"
        ></TextField>
        <TextField
          onChange={(e) => handleOnChange(e)}
          sx={{
            width: "100%",
            margin: "1rem 0",
            bgcolor: "#fff",
          }}
          variant="outlined"
          label="Enter Password"
          type="password"
          required
          name="password"
        ></TextField>
        <Button
          disabled={
            loginData.username.trimStart().length === 0 ||
            loginData.password.trimStart().length === 0
          }
          sx={{
            width: "100%",
            margin: "1.5rem 0",
            padding: "12px 0",
            borderRadius: "28px",
          }}
          variant="contained"
          color="primary"
          type="submit"
        >
          {status === "loading" ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <Button
        sx={{
          width: "100%",
          margin: ".5rem 0 1rem 0.5rem",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="outlined"
        color="primary"
      >
        Login as guest
      </Button>
    </>
  );
}