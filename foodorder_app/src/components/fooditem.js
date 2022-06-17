import React, { useState } from "react";
import { Container, Row, Col, Badge, FormControl, Button, Alert } from "react-bootstrap";


export default function FoodItem({food,id,image,name,description,price,addtocart}) {
  const [amount ,setAmount] = useState('')

    const hanldeAmount = (e)=>{
        setAmount(Number(e.target.value))
    }
    const handleAddtocart = ()=>{
        addtocart(amount,food)
    }
    return (
        <Container className="food-item">
            <Row>
                <Col md={3}>
                    <img src={image} className="w-100 image-food"></img>
                   
                </Col>
                <Col md={4}>
                    <h3>{name}</h3>
                    <div className="food-info">
                        <span className="text-muted">{description}</span>
                        <Badge bg="primary" className="badge-item mt-1">${price}</Badge>
                    </div>
                </Col>
                <Col md={5} className="cart">
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <span className="me-2">Amount</span>
                        <FormControl type="number" min={0} onChange={hanldeAmount}></FormControl>
                    </div>
                    <Button className="ml-2" variant="primary" onClick={handleAddtocart}>Add</Button>
                </Col>
            </Row>
        </Container>
    )
}