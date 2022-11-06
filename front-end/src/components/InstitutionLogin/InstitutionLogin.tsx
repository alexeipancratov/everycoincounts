import { useState } from "react";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SessionService from "../../services/sessionService";
import UsersService from "../../services/usersService";

export default function InstitutionLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const sendLoginDetails = async () => {
    const result = await UsersService.login({ username, password });

    if (result) {
      SessionService.storeToken(result.token);
      navigate("/institutions");
    }
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    sendLoginDetails();
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <Form onSubmit={onFormSubmit}>
          <FormGroup>
            <FormLabel>Institution ID</FormLabel>
            <FormControl type="text" value={username} onChange={onUsernameChange} />
          </FormGroup>

          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl type="password" value={password} onChange={onPasswordChange} />
          </FormGroup>
          <Button variant="primary" type="submit" className="mt-3">
            Sign In
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
