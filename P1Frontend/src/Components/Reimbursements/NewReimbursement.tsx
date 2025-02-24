import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { store } from "../../GlobalData/store";

export const NewReimbursement: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const storeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const storeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/reimbursement",
        {
          amount: amount,
          description: description,
          userId: store.loggedInUser.userId,
        },
        { withCredentials: true }
      );
      navigate("/reimbursement");
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data}`);
        navigate("/");
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h2>New Reimbursement</h2>
      <input
        type="number"
        className="form-control"
        placeholder="Amount"
        onChange={storeAmount}
      ></input>

      <textarea
        className="form-control"
        rows={3}
        placeholder="Description"
        onChange={storeDescription}
      ></textarea>

      <button className="btn btn-primary" onClick={handleButtonClick}>
        Submit
      </button>
    </Container>
  );
};
