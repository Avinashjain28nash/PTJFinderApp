import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/register", {
        name,
        email,
        mobile,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="5" md="6" className="text-center">
          <div className="mb-6">
            <h3>Unlock part-time possibilities</h3>
          </div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid "
            alt="Illustration of a phone"
            style={{ maxWidth: "70%" }} // Adjust image size as per your needs
          />
        </MDBCol>

        <MDBCol
          col="6"
          md="4"
          className="d-flex flex-column align-items-center"
        >
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: "bold", color: "#333" }}>REGISTER</h2>
          </div>

          <form onSubmit={handleRegister} className="w-100">
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="formControlLg"
              type="text"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Mobile"
              id="formControlLg"
              type="text"
              size="lg"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <MDBBtn className="mb-4 w-100" size="lg" type="submit">
              Register
            </MDBBtn>
          </form>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <div className="text-center">
            <p>Already have an account?</p>
            <MDBBtn onClick={() => navigate("/login")}>Login</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
