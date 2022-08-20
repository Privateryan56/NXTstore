import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { getUserDetails, userUpdateProfile } from "../actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  console.log (userLogin)
  console.log (userDetails)
  
  useEffect(() => {
    if(!userInfo){
        history('/login')
    }else{
        if(!user){
            dispatch(getUserDetails('profile'))
        }else {
            setName(user.name)
            setEmail(user.email)
        }
    } 
  }, [dispatch, history, userInfo, user])

  const redirect = location.search ? location.search.split("=")[1] : "/";
  
    useEffect(() => {
        if(!userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        Alert("Passwords do not match")

    }else{
        dispatch(userUpdateProfile({id:user._id, name, email, password}))
        
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
       <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen