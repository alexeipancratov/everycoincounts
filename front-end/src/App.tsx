import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import CreatorDetails from "./components/CreatorDetails/CreatorDetails";
import CreatorsList from "./components/CreatorsList/CreatorsList";

function App() {
  return (
    <Container>
      <Nav className="bg-light">
        <Nav.Item>
          <Link to="creators">Creators</Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/" />
        <Route path="creators" element={<CreatorsList />} />
        <Route path="creators/:id" element={<CreatorDetails />} />
      </Routes>
    </Container>
  );
}

export default App;
