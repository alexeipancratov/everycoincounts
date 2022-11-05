import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CreatorsList() {
  return (
    <>
      <h3>Creators</h3>
      <Row>
        <Col>
          <Card style={{ width: "200px" }}>
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
          <Card style={{ width: "200px" }}>
            <Link to="2">
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
              <i className="bi bi-heart"></i> 101 supporters
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "200px" }}>
            <Link to="3">
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
              <i className="bi bi-heart"></i> 45 supporters
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
