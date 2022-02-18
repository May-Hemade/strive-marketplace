import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Product({ product }) {
  return (
    <Card className="mt-2">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <div>{product.description}</div>
        {/* <div>{product.category}</div>
        <div>{product.price}</div> */}
      </Card.Body>
    </Card>
  )
}
