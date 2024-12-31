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
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.token); // Assuming a token is returned
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="5" md="6">
        <div className="mb-4">
            <h2>AGAGigs</h2>
          </div>
          <div className="mb-4">
            <h3>Discover work that works for you.</h3>
          </div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid small-img"
            alt="Illustration of a phone"
          />
        </MDBCol>

        <MDBCol
          col="4"
          md="6"
          className="d-flex flex-column align-items-center"
        >
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: "bold", color: "#333" }}>LOGIN</h2>
          </div>
          <form onSubmit={handleLogin}>
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
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" type="submit">
              Sign in
            </MDBBtn>
          </form>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <div className="text-center">
            <p>Don't have an account?</p>
            <MDBBtn onClick={() => navigate("/register")}>Register</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
