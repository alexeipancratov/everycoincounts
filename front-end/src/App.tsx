import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import InstitutionDetails from "./components/InstitutionDetails/InstitutionDetails";
import InstitutionsList from "./components/InstitutionsList/InstitutionsList";

function App() {
  return (
    <Container>
      <Nav className="bg-light">
        <Nav.Item>
          <Link to="institions">Institutions</Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/" />
        <Route path="institions" element={<InstitutionsList />} />
        <Route path="institions/:id" element={<InstitutionDetails />} />
      </Routes>
    </Container>
  );
}

export default App;
