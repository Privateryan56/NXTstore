import React from "react";
import { Link} from "react-router-dom";
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
import { useEffect} from "react";
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
const match = useParams();
const dispatch = useDispatch();
const productDetails = useSelector(state => state.productDetails)
const {product, loading, error} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(String(match.id)))
  }, [dispatch,match]);
  return (
    <>
      <Link className="btn btn-primary" to="/">
        Back to products
      </Link>
      {loading ? <h1>Loading...</h1> : error ? <h2>{error}</h2> : (
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description : {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
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
      )}
     </>
  );
}

export default ProductScreen;
