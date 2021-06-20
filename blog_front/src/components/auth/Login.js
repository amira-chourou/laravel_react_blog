import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
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
import axios from "axios";
export default function Login() {
  //Intialise attributes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      formData.append("email", email);
      formData.append("password", password);
      axios
        .post(API_BASE_URL + "/api/login", formData)
        .then((res) => {
          //result from api
            //success
            localStorage.setItem("token", res.data.user.api_token); // save token in localStorage
            console.log("id",res.data.user.api_token)
            localStorage.setItem("id",res.data.user.id)
            localStorage.setItem("username",res.data.user.name);
           console.log('login : ',  localStorage.getItem("token"))
            history.replace("/"); // redirect to homepage
            window.location.href='/';
          
        })
        .catch((error) => {
          if (error.response.data.message === "The given data was invalid.") {
            setError("Invalid Credentials");
           
          }
          console.log(" errors : ", error.response.data);
        });
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <Container>
        <Row>
          <div className="justify-content-center row">
            <Card className="col-md-6 mt-5">
              <CardBody>
                <CardTitle tag="h5">Login</CardTitle>
                <Form onSubmit={handleSubmit}>
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
                  {error !== "" && (
                    <span className="invalid-feedback error">{error}</span>
                  )}
                  <FormGroup>
                  
                    <Button color="primary" block type="submit">
                      Login
                    </Button> 
                 <Row>
                   <div className="col-md-12 mt-4 center" > Not a member? <Link to="/register"> Register</Link></div>
                 </Row>
                     
                   
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
