import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home";
import SignIn from "./screens/SiginIn";
import Verify from "./screens/Verify";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Navbar />
        <Box sx={{ marginBottom: 15 }} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<SignIn />} />
          <Route path="/verify" exact element={<Verify />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
