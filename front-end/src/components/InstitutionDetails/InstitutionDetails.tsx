import { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Institution from "../../models/institution";
import InstitutionsService from "../../services/institutionsService";
import DonateToInstitutionForm from "../DonateToInstitutionForm/DonateToInstitutionForm";

export default function InstitutionDetails() {
  const { username } = useParams();
  const [institution, setInstitution] = useState<Institution>({} as Institution);

  useEffect(() => {
    const getInstitution = async () => {
      const institution = await InstitutionsService.getOne(username || "");
      setInstitution(institution);
    };

    getInstitution();
  }, [username]);

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
              <i className="bi bi-shield-check text-success"></i> Verified by UMA oracle
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <DonateToInstitutionForm institutionUsername={username || ""} />
        </Col>
      </Row>
    </>
  );
}
