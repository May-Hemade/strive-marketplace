import React, { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import StarRatings from "react-star-ratings"
import Review from "./Review"

export default function ProductDetails() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)

  const [rating, setRating] = useState(0)

  const getProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://marketplace-mongo.herokuapp.com/products/${productId}`,
        {
          method: "GET",
        }
      )

      setLoading(false)

      if (response.ok) {
        setProduct(await response.json())
        setError(false)
      } else {
        setError(true)
      }
    } catch (e) {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      {!isLoading && !hasError && product && (
        <Container className="p-3 text-left">
          <Row>
            <Col md={6} className="p-2">
              <h2>{product.name}</h2>
              <img src={product.image} className="w-100"/>
            </Col>
            <Col>
              <h3> Description </h3>
              <div> {product.description}</div>
            </Col>
          </Row>
          <Row className="mt-3 text-left">
            <Col md={6}>
              <h4 className="mb-3">Write a Review</h4>
              <StarRatings
                numberOfStars={5}
                rating={rating}
                changeRating={setRating}
                starDimension="25px"
                starSpacing="5px"
                starHoverColor="#ffd700"
                starRatedColor="#ffd700"
                starEmptyColor="grey"
              />
              <Form className="mt-3">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your comments..."
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <div className="mt-3">
            <h5>Reviews</h5>
            {product.reviews.map((review) => (
              <Review key={review._id} review={review} />
            ))}
          </div>
        </Container>
      )}
    </div>
  )
}
