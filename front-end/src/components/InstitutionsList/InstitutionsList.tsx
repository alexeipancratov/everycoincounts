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
      <h3>Institutions</h3>
      <p>Help the institutions by donating in crypto. Click on the image to learn more about each of them.</p>
      <Row>
        {institutions.length === 0 && <Spinner animation="grow" variant="primary" />}
        {institutions.length > 0 &&
          institutions.map((inst) => (
            <Col key={inst._id}>
              <Card style={{ width: "20rem" }}>
                <Link to={inst._id}>
                  <Card.Img variant="top" src={`https://ipfs.io/ipfs/${inst.avatarKey}`} />
                </Link>
                <Card.Body>
                  <Card.Title>{inst.name}</Card.Title>
                  <Card.Text>{inst.bio}</Card.Text>
                  <i className="bi bi-heart text-danger"></i> 381 donations
                  <br />
                  <i className="bi bi-currency-bitcoin text-warning"></i> 0.001 ETH donated
                  <br />
                  <i className="bi bi-shield-check text-success"></i> 9/10 trust index
                  <p className="mt-3">Category: {inst.category}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
