import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function DonateToInstitutionForm() {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const { status } = useMetaMask();

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const onAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    alert("Donated!");
  };

  return (
    <>
      <h5>Donate</h5>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formDonatorName">
          <Form.Label>{`Name (optional)`}</Form.Label>
          <Form.Control type="text" placeholder="Your name" value={name} onChange={onNameChange} />
          <Form.Text className="text-muted">You can let your name to the institution you're donating to.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>{`Message (optional)`}</Form.Label>
          <Form.Control type="text" placeholder="Message" value={message} onChange={onMessageChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount in ETH</Form.Label>
          <Form.Control type="number" placeholder="Amount in wei" value={amount} onChange={onAmountChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={status !== "connected"}>
          {status === "connected" ? "🫶 Donate" : "Connect MetaMask"}
        </Button>
      </Form>
    </>
  );
}
