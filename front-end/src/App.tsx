import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import InstitutionDetails from "./components/InstitutionDetails/InstitutionDetails";
import InstitutionsList from "./components/InstitutionsList/InstitutionsList";
import TransferFunds from "./components/TransferFunds/TransferFunds";
import WalletConnector from "./components/WalletConnector/WalletConnector";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">🫶 Every Coin Counts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="institutions" className="nav-link active">
                Institutions
              </Link>
              <Link to="transferFunds" className="nav-link active">
                Transfer Funds
              </Link>
            </Nav>
            <WalletConnector />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" />
          <Route path="institutions" element={<InstitutionsList />} />
          <Route path="institutions/:username" element={<InstitutionDetails />} />
          <Route path="transferFunds" element={<TransferFunds />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
