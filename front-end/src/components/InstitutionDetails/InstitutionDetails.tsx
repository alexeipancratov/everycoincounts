import { Card, Col, FormGroup, Row } from "react-bootstrap";
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
              <i className="bi bi-heart"></i> 381 supporters
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h5>Donate</h5>
          <form>
            <FormGroup>
              <input type="number" placeholder="Slices" />
            </FormGroup>
          </form>
        </Col>
      </Row>
    </>
  );
}
