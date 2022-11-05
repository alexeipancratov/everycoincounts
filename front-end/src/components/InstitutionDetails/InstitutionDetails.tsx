import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Institution from "../../models/institution";
import InstitutionsService from "../../services/institutionsService";

export default function InstitutionDetails() {
  const { id } = useParams();

  const [institution, setInstitution] = useState<Institution>({} as Institution);

  useEffect(() => {
    const getInstitution = async () => {
      const institution = await InstitutionsService.getOne(id || "");
      setInstitution(institution);
    };

    getInstitution();
  }, [id]);

  if (!institution) {
    return <Spinner animation="grow" variant="primary" />;
  }

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src={`https://ipfs.io/ipfs/${institution.avatarKey}`} />
            <Card.Body>
              <Card.Title>{institution.name}</Card.Title>
              <Card.Text>{institution.bio}</Card.Text>
              <i className="bi bi-heart text-danger"></i> 381 donations
              <br />
              <i className="bi bi-currency-bitcoin text-warning"></i> 0.001 ETH donated
              <br />
              <i className="bi bi-shield-check text-success"></i> 9/10 trust index
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h5>Donate</h5>
          <Form>
            <Form.Group className="mb-3" controlId="formDonatorName">
              <Form.Label>{`Name (optional)`}</Form.Label>
              <Form.Control type="text" placeholder="Your name" />
              <Form.Text className="text-muted">You can let your name to the institution you're donating to.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>{`Message (optional)`}</Form.Label>
              <Form.Control type="text" placeholder="Message" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount in ETH</Form.Label>
              <Form.Control type="number" placeholder="Amount in wei" value={0.001} />
            </Form.Group>
            <Button variant="primary" type="submit">
              🫶 Donate
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
