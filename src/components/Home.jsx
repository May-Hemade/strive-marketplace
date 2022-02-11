import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Product from "./Product"

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://may-marketplace.herokuapp.com/products", {
        method: "GET",
      })

      setLoading(false)

      if (response.ok) {
        let result = await response.json()
        setProducts(result.data)
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
    getProducts()
  }, [])

  return (
    <Container>
      <Row>
        {!isLoading &&
          !hasError &&
          products &&
          products.map((product) => (
            <Col key={product._id} md={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  )
}
