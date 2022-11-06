import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import InstitutionDetails from "./components/InstitutionDetails/InstitutionDetails";
import InstitutionLogin from "./components/InstitutionLogin/InstitutionLogin";
import InstitutionsList from "./components/InstitutionsList/InstitutionsList";
import TransferFunds from "./components/TransferFunds/TransferFunds";
import WalletConnector from "./components/WalletConnector/WalletConnector";
import SessionService from "./services/sessionService";

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
              {SessionService.isAuthenticated() && (
                <Link to="transferFunds" className="nav-link">
                  Transfer Funds
                </Link>
              )}
            </Nav>
            <div className="d-flex">
              {!SessionService.isAuthenticated() && (
                <Link to="login" className="btn btn-outline-secondary text-white">
                  Sign In as Institution
                </Link>
              )}
              <WalletConnector />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" />
          <Route path="institutions" element={<InstitutionsList />} />
          <Route path="institutions/:username" element={<InstitutionDetails />} />
          <Route path="transferFunds" element={<TransferFunds />} />
          <Route path="login" element={<InstitutionLogin />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
