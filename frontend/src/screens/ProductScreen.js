import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";
function ProductScreen() {
  return (
    <>
      <Link className="btn btn-primary" to="/">
        Back to products
      </Link>
      <Row>
        <Col md={6}>
          <Image src={products.image} alt={products.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{products.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={products.rating}
                text={`${products.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${products.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : {products.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${products.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {products.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className=" btn-block" type="button">
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;
