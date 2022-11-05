import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function InstitutionDetails() {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Link to="1">
              <Card.Img
                variant="top"
                src="https://cdn.buymeacoffee.com/uploads/profile_pictures/2020/11/348df2c9ac273b642918f634ac2d2086.jpg@300w_0e.jpg"
              />
            </Link>
            <Card.Body>
              <Card.Title>Creator Name</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
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
