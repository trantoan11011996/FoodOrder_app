import React, { useState, useContext } from "react";
import { ListGroup, Modal, Button, Badge, Row, Col, Form } from "react-bootstrap";
import { AuthContext } from "./foodapp";

export default function OrderForm({ foodCart, inCreaseItem, deCreaseItem, deleteItem, postOrder }) {
    const [show, setShow] = useState(false);
    const [formOrder, setFormOrder] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const auth = useContext(AuthContext)
    console.log(auth.foodCart)

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }

    let total = 0;
    let price = 0;
    for (let food of foodCart) {
        total = total + food.amount;
        price = total * food.price
    }

   console.log(auth.foodCart)
    const showFormOrder = () => {
        setFormOrder(!formOrder)
    }
    const submit = (e) => {
        e.preventDefault()
        const userOrder = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            item: foodCart,
            price: price,
        }
        if (!foodCart) {
            alert('You have to order first')
        }
        setName('')
        setEmail('')
        setAddress('')
        setPhone('')
        const user = { ...userOrder }
        postOrder(user)
        setFormOrder(false)
    }
    return (
        <div className="oder-form">
            <Button variant="info" onClick={handleShow}>
                <span className="me-2">Your Cart</span>
                <Badge pill bg="dark">
                    {total}
                </Badge>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {foodCart.map((food) => {
                            return (
                                <ListGroup.Item>
                                    <Row className="cart-item">
                                        <Col sm={9}>
                                            <h3>{food.name}</h3>
                                            <div>
                                                <Badge bg='primary' className="me-4">${food.price}</Badge>
                                                <Badge bg='light' text="dark" className="me-4">{food.amount}</Badge>
                                            </div>
                                            <Button className="mt-2" size="sm" onClick={() => deleteItem(food.id)}>Cancel</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="primary" size="sm" className="me-2" onClick={() => deCreaseItem(food.id)}>-</Button>
                                            <Button variant="primary" size="sm" onClick={() => inCreaseItem(food.id)}>+</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                    {formOrder && (
                        <Form onSubmit={submit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control required type="text" value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button variant="success" type="submit" className="mt-2">Order now</Button>
                        </Form>
                    )}
                    <div className="order-info">
                        <b className="text-danger mt-3">Total pirce : {price}</b>
                        {!formOrder && (<Button variant="success" type="submit" onClick={showFormOrder}>Make an Order</Button>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}