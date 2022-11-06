import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Modal, Row } from "react-bootstrap";
import contractAbi from "../../abis/abi.json";
import SessionService from "../../services/sessionService";

export default function TransferFunds() {
  const { ethereum } = useMetaMask();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [balance, setBalance] = useState("");

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleShowSuccessModal = () => setShowSuccessModal(true);

  const onRecipientChange = (e: any) => {
    setRecipientAddress(e.target.value);
  };

  const onAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const clearForm = () => {
    setRecipientAddress("");
    setAmount("");
    setAmount("");
  };

  const sendTransaction = async () => {
    handleShowSuccessModal();
    clearForm();
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    sendTransaction();
  };

  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS || "", contractAbi, provider);
      const contractWithSigner = contract.connect(signer);

      const result = await contractWithSigner.institutions(SessionService.getUsername());
      setBalance(ethers.utils.formatUnits(result.totalBalance, 18));
    };

    if (ethereum) {
      getBalance();
    }
  }, [ethereum]);

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <p>{`Here you can transfer your money to any address on the blockchain (subject to approval).`}</p>
        <p className="text-center">{`Your balance is: ${balance} ETH`}</p>
        <Form onSubmit={onFormSubmit}>
          <FormGroup>
            <FormLabel>Recipient Address</FormLabel>
            <FormControl
              type="text"
              value={recipientAddress}
              onChange={onRecipientChange}
              placeholder="0x0000000000000000000000000000000000000000"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Amount</FormLabel>
            <FormControl type="text" value={amount} onChange={onAmountChange} />
          </FormGroup>
          <Button variant="primary" type="submit" className="mt-3">
            Transfer
          </Button>
        </Form>
      </Col>

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
    </Row>
  );
}
