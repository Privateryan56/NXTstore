import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate()

  const userRegister = useSelector(state => state.userRegister)
  const { loading,error, userInfo} = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/";
  
    useEffect(() => {
        if(userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        Alert("Passwords do not match")

    }else{
        dispatch(register(name,email,password))
    }
  };

  return (
    <FormContainer>
      <h1> Sign Up</h1>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have An Account?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen