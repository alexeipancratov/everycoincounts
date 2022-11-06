import { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Institution from "../../models/institution";
import InstitutionsService from "../../services/institutionsService";

export default function InstitutionsList() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    const getInstitutions = async () => {
      const institutions = await InstitutionsService.getAll();
      setInstitutions(institutions);
    };

    getInstitutions();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h2>Institutions</h2>
          <p>Help the institutions by donating in crypto. Click on the image to learn more about each of them.</p>
        </Col>
        <Col className="text-end">
          <p style={{ fontSize: "0.9rem" }}>
            Institutions' trustworthiness verified by <img src="/UMA-logo.png" alt="UMA-oracle" height={20} />
          </p>
        </Col>
      </Row>
      <Row>
        {institutions.length === 0 && <Spinner animation="grow" variant="primary" />}
        {institutions.length > 0 &&
          institutions.map((inst) => (
            <Col key={inst._id}>
              <Card style={{ width: "20rem" }}>
                <Link to={inst.username}>
                  <Card.Img variant="top" src={`https://ipfs.io/ipfs/${inst.avatarKey}`} />
                </Link>
                <Card.Body>
                  <Card.Title>{inst.name}</Card.Title>
                  <Card.Text>{inst.bio}</Card.Text>
                  <i className="bi bi-heart text-danger"></i> 381 donations
                  <br />
                  <i className="bi bi-currency-bitcoin text-warning"></i> 0.001 ETH donated
                  <br />
                  <p className="mt-3">Category: {inst.category}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
