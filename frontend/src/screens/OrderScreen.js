import React, { useState, useEffect, useParams } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";

function OrderScreen() {
  const match = useParams();
  const orderId = match.id;
  const dispatch = useDispatch();
  const history = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [success]);

  return (
    <div>
      <h2>Order {order._id}</h2>
      <div>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {order.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                        <Col md={4}>
                          <Card>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                                <h2>Order Summary</h2>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col>Items</Col>
                                  <Col>${order.itemsPrice}</Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col>Shipping</Col>
                                  <Col>${order.shippingPrice}</Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col>Tax</Col>
                                  <Col>${order.taxPrice}</Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col>Total</Col>
                                  <Col>${order.totalPrice}</Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col>Shipping</Col>
                                  <Col>${order.shippingPrice}</Col>
                                </Row>
                              </ListGroup.Item>
                            </ListGroup>
                          </Card>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default OrderScreen;
