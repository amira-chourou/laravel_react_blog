import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  Button,
  Form,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
} from "reactstrap";
export default function Register() {
  //Intialise attributes
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const validEmailRegex = RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    //test if form is valid
    if (validEmailRegex.test(email) && password) {
      // send data to login api
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append('password_confirmation',passwordConfirmation);
      axios
        .post(API_BASE_URL + "/api/register", formData)
        .then((res) => {
          //result from api
         //Success
          localStorage.setItem("token", res.data.user.api_token); // save token in localStorage
          localStorage.setItem("id",res.data.user.id);
          localStorage.setItem("username",res.data.user.name);
          history.replace("/"); // redirect to homepage
          window.location.href='/';
        })
        .catch((error) => {
           // if error return error message
         
          if (error.response.data.errors.email.toString() === "The email has already been taken.") {
            setError("The email has already been taken.");
           
          }
         
        });
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <Container>
        <Row>
          <div className="justify-content-center row ">
            <Card className="col-md-6 mt-5">
              <CardBody>
                <CardTitle tag="h5">Register</CardTitle>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {submitted && !name && (
                      <span className="invalid-feedback error">Required</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {submitted && !validEmailRegex.test(email) && (
                      <span className="invalid-feedback error">
                        Required or format incorrect
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {submitted && !password && (
                      <span className="invalid-feedback error">Required</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password confirmation</Label>
                    <Input
                      type="password"
                      name="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    {submitted && passwordConfirmation !== password && (
                      <span className="invalid-feedback error">
                        Password don't match
                      </span>
                    )}
                  </FormGroup>
                  {error !== "" && (
                    <span className="invalid-feedback error">{error} </span>
                  )}
                  <FormGroup>
                    <Button color="primary" type="submit" block>
                      Register
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
}
