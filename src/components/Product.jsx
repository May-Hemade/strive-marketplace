import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Product({ product }) {
  return (
    <Card className="mt-2">
      <Link to={`/product/${product.productId}`}>
        <Card.Img variant="top" src={product.imageUrl} />
      </Link>
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <div>{product.productDescription}</div>
        {/* <div>{product.category}</div>
        <div>{product.price}</div> */}
      </Card.Body>
    </Card>
  )
}
