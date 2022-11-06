import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import contractAbi from "../../abis/abi.json";

interface Props {
  institutionUsername: string;
}

export default function DonateToInstitutionForm(props: Props) {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleShowSuccessModal = () => setShowSuccessModal(true);

  const { status, ethereum } = useMetaMask();

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const onAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const clearForm = () => {
    setName("");
    setMessage("");
    setAmount("");
  };

  const sendTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS || "", contractAbi, provider);
    const contractWithSigner = contract.connect(signer);

    const options = { value: ethers.utils.parseEther(amount) };
    const tx = await contractWithSigner.countTheseCoins(props.institutionUsername, name, message, options);
    console.log(tx);

    handleShowSuccessModal();
    clearForm();
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    sendTransaction();
  };

  return (
    <>
      <h3>Donate</h3>
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
          <Form.Control type="text" placeholder="Amount in wei" value={amount} onChange={onAmountChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={status !== "connected"}>
          {status === "connected" ? "🫶 Donate" : "Connect MetaMask"}
        </Button>
      </Form>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thanks for your contribution!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
