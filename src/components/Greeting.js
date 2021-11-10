import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Greeting() {
  const handleClick = (e) => {};

  return (
    <div style={{ margin: "150px" }}>
      <h1>WELLCUM TO MUSON </h1>
      <Button
        component={Link}
        to="/login"
        style={{ margin: "20px" }}
        variant="contained"
        size="large"
        onClick={handleClick}
      >
        Login
      </Button>
      <Button
        component={Link}
        to="/registration"
        style={{ margin: "20px", width: "150px" }}
        variant="contained"
        size="large"
        onClick={handleClick}
      >
        Registration
      </Button>
    </div>
  );
}
