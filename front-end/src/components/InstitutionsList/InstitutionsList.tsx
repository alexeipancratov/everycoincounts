import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function InstitutionsList() {
  return (
    <>
      <h3>Institutions</h3>
      <p>Help the institutions by donating in crypto. Click on the image to learn more about each of them.</p>
      <Row>
        <Col>
          <Card style={{ width: "20rem" }}>
            <Link to="1">
              <Card.Img
                variant="top"
                src="https://cdn.buymeacoffee.com/uploads/profile_pictures/2020/11/348df2c9ac273b642918f634ac2d2086.jpg@300w_0e.jpg"
              />
            </Link>
            <Card.Body>
              <Card.Title>Institution Name</Card.Title>
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
          <Card style={{ width: "20rem" }}>
            <Link to="2">
              <Card.Img
                variant="top"
                src="https://cdn.buymeacoffee.com/uploads/profile_pictures/2020/11/348df2c9ac273b642918f634ac2d2086.jpg@300w_0e.jpg"
              />
            </Link>
            <Card.Body>
              <Card.Title>Institution Name</Card.Title>
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
          <Card style={{ width: "20rem" }}>
            <Link to="3">
              <Card.Img
                variant="top"
                src="https://cdn.buymeacoffee.com/uploads/profile_pictures/2020/11/348df2c9ac273b642918f634ac2d2086.jpg@300w_0e.jpg"
              />
            </Link>
            <Card.Body>
              <Card.Title>Institution Name</Card.Title>
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
      </Row>
    </>
  );
}
